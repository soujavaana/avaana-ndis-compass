
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CloseActivity {
  id: string;
  type: string;
  date_created: string;
  date_updated: string;
  user_id: string;
  user_name: string;
  user_email: string;
  contact_id?: string;
  to?: string[];
  from?: string;
  subject?: string;
  body_text?: string;
  body_html?: string;
  status?: string;
  direction?: string;
  phone?: string;
  note?: string;
  text?: string;
}

interface CloseUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const closeApiKey = Deno.env.get("CLOSE_API_KEY");
    if (!closeApiKey) {
      throw new Error("Close API key not configured");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get auth header and set session
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    supabaseClient.auth.setSession({
      access_token: authHeader.replace("Bearer ", ""),
      refresh_token: "",
    });

    // Get current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      throw new Error("User profile not found");
    }

    console.log("Syncing history for user:", profile.email);

    // Check if already synced recently
    const { data: syncStatus } = await supabaseClient
      .from("user_sync_status")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (syncStatus?.sync_status === 'completed') {
      console.log("User already synced recently");
      return new Response(
        JSON.stringify({ message: "Already synced", syncStatus }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Update sync status to in_progress
    await supabaseClient
      .from("user_sync_status")
      .upsert({
        user_id: user.id,
        sync_status: 'in_progress',
        updated_at: new Date().toISOString(),
      });

    // Search for user in Close CRM by email or phone
    let closeContactId = null;
    const searchParams = new URLSearchParams();
    if (profile.email) {
      searchParams.append('query', `email:"${profile.email}"`);
    } else if (profile.phone) {
      searchParams.append('query', `phone:"${profile.phone}"`);
    } else {
      throw new Error("No email or phone found in profile");
    }

    const contactSearchResponse = await fetch(`https://api.close.com/api/v1/contact/?${searchParams}`, {
      headers: {
        "Authorization": `Basic ${btoa(closeApiKey + ":")}`,
        "Content-Type": "application/json",
      },
    });

    if (!contactSearchResponse.ok) {
      throw new Error(`Contact search error: ${contactSearchResponse.statusText}`);
    }

    const contactData = await contactSearchResponse.json();
    const contacts = contactData.data || [];

    if (contacts.length === 0) {
      console.log("No matching contact found in Close CRM");
      await supabaseClient
        .from("user_sync_status")
        .upsert({
          user_id: user.id,
          sync_status: 'no_contact_found',
          updated_at: new Date().toISOString(),
        });

      return new Response(
        JSON.stringify({ message: "No matching contact found" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    closeContactId = contacts[0].id;
    console.log("Found Close contact:", closeContactId);

    // Update profile with close_contact_id
    await supabaseClient
      .from("profiles")
      .update({ close_contact_id: closeContactId })
      .eq("id", user.id);

    // Fetch Close CRM users for staff mapping
    const usersResponse = await fetch("https://api.close.com/api/v1/user/", {
      headers: {
        "Authorization": `Basic ${btoa(closeApiKey + ":")}`,
        "Content-Type": "application/json",
      },
    });

    const usersData = await usersResponse.json();
    const closeUsers: { [key: string]: CloseUser } = {};
    
    if (usersData.data) {
      usersData.data.forEach((user: CloseUser) => {
        closeUsers[user.id] = user;
      });
    }

    // Fetch activities for this contact
    const activitiesResponse = await fetch(`https://api.close.com/api/v1/activity/?contact_id=${closeContactId}&_limit=200`, {
      headers: {
        "Authorization": `Basic ${btoa(closeApiKey + ":")}`,
        "Content-Type": "application/json",
      },
    });

    if (!activitiesResponse.ok) {
      throw new Error(`Activities fetch error: ${activitiesResponse.statusText}`);
    }

    const activitiesData = await activitiesResponse.json();
    const activities: CloseActivity[] = activitiesData.data || [];

    console.log(`Found ${activities.length} activities for contact`);

    // Process activities (emails and SMS)
    let importedCount = 0;
    const staffContactsMap = new Map();

    for (const activity of activities) {
      if (activity.type !== 'email' && activity.type !== 'sms') {
        continue;
      }

      // Skip if already imported
      const { data: existingMessage } = await supabaseClient
        .from("messages")
        .select("id")
        .eq("close_activity_id", activity.id)
        .single();

      if (existingMessage) {
        continue;
      }

      const staffUser = closeUsers[activity.user_id];
      const staffName = staffUser ? staffUser.display_name || `${staffUser.first_name} ${staffUser.last_name}` : 'Unknown Staff';
      const staffEmail = staffUser?.email || null;

      // Find or create staff contact
      let staffContactId = staffContactsMap.get(activity.user_id);
      
      if (!staffContactId && staffUser) {
        const { data: existingStaffContact } = await supabaseClient
          .from("close_crm_contacts")
          .select("id")
          .eq("close_contact_id", activity.user_id)
          .single();

        if (existingStaffContact) {
          staffContactId = existingStaffContact.id;
        } else {
          const { data: newStaffContact } = await supabaseClient
            .from("close_crm_contacts")
            .insert({
              close_contact_id: activity.user_id,
              name: staffName,
              email: staffEmail,
              is_staff: true,
              role: 'Staff Member',
            })
            .select()
            .single();

          if (newStaffContact) {
            staffContactId = newStaffContact.id;
          }
        }
        
        if (staffContactId) {
          staffContactsMap.set(activity.user_id, staffContactId);
        }
      }

      // Find or create conversation thread
      let threadId = null;
      if (staffContactId) {
        const { data: existingThread } = await supabaseClient
          .from("conversation_threads")
          .select("id")
          .eq("user_id", user.id)
          .eq("staff_contact_id", staffContactId)
          .single();

        if (existingThread) {
          threadId = existingThread.id;
        } else {
          const subject = activity.type === 'email' ? 
            (activity.subject || 'Email Conversation') : 
            'SMS Conversation';

          const { data: newThread } = await supabaseClient
            .from("conversation_threads")
            .insert({
              user_id: user.id,
              staff_contact_id: staffContactId,
              subject,
              last_message_at: activity.date_created,
            })
            .select()
            .single();

          if (newThread) {
            threadId = newThread.id;
          }
        }
      }

      if (!threadId) {
        console.log("Could not create/find thread for activity:", activity.id);
        continue;
      }

      // Determine message content and sender
      let content = '';
      let senderType = 'staff';

      if (activity.type === 'email') {
        content = activity.body_text || activity.body_html || activity.subject || '';
        // Check if this was sent by the user (from user's email)
        if (activity.from && profile.email && activity.from.includes(profile.email)) {
          senderType = 'user';
        }
      } else if (activity.type === 'sms') {
        content = activity.text || activity.note || '';
        // For SMS, check direction
        if (activity.direction === 'inbound') {
          senderType = 'user';
        }
      }

      // Import message
      const { error: messageError } = await supabaseClient
        .from("messages")
        .insert({
          thread_id: threadId,
          close_activity_id: activity.id,
          sender_type: senderType,
          content,
          message_type: activity.type,
          sent_at: activity.date_created,
          is_historical: true,
          staff_name: staffName,
          staff_email: staffEmail,
        });

      if (messageError) {
        console.error("Error importing message:", messageError);
      } else {
        importedCount++;
      }
    }

    // Update sync status to completed
    await supabaseClient
      .from("user_sync_status")
      .upsert({
        user_id: user.id,
        sync_status: 'completed',
        last_synced_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    console.log(`Successfully imported ${importedCount} historical messages`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        importedCount,
        closeContactId,
        message: `Imported ${importedCount} historical messages`
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in close-crm-sync-user-history function:", error);
    
    // Update sync status to error
    try {
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? ""
      );

      const authHeader = req.headers.get("authorization");
      if (authHeader) {
        supabaseClient.auth.setSession({
          access_token: authHeader.replace("Bearer ", ""),
          refresh_token: "",
        });

        const { data: { user } } = await supabaseClient.auth.getUser();
        if (user) {
          await supabaseClient
            .from("user_sync_status")
            .upsert({
              user_id: user.id,
              sync_status: 'error',
              updated_at: new Date().toISOString(),
            });
        }
      }
    } catch (syncError) {
      console.error("Error updating sync status:", syncError);
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);


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
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get auth header and extract token
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Verify the JWT token and get user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !user) {
      console.error("Auth error:", userError);
      throw new Error("User not authenticated");
    }

    console.log("🔍 Authenticated user:", user.email);

    // Get user profile
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.error("❌ Profile error:", profileError);
      throw new Error("User profile not found");
    }

    console.log("📋 User profile found:", {
      email: profile.email || user.email,
      phone: profile.phone,
      business_email: profile.business_email,
      business_phone: profile.business_phone
    });

    // Check sync status but allow forcing a refresh if requested
    const { data: syncStatusRecords } = await supabaseClient
      .from("user_sync_status")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(1);

    const syncStatus = syncStatusRecords?.[0];
    console.log("📊 Current sync status:", syncStatus);

    // Check if we should force a refresh (for testing purposes)
    const requestBody = await req.text();
    let forceSync = false;
    
    if (requestBody) {
      try {
        const body = JSON.parse(requestBody);
        forceSync = body.forceSync === true;
      } catch (e) {
        // Ignore JSON parse errors, body might be empty
      }
    }

    if (syncStatus?.sync_status === 'completed' && !forceSync) {
      console.log("✅ User already synced recently - returning existing status");
      return new Response(
        JSON.stringify({ 
          message: "Already synced", 
          syncStatus,
          hint: "Add 'forceSync: true' to request body to force a refresh"
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Update sync status to in_progress
    console.log("🔄 Setting sync status to in_progress");
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
    const userEmail = profile.email || user.email;
    
    if (userEmail) {
      searchParams.append('query', `email:"${userEmail}"`);
      console.log("🔍 Searching Close CRM by email:", userEmail);
    } else if (profile.phone) {
      searchParams.append('query', `phone:"${profile.phone}"`);
      console.log("🔍 Searching Close CRM by phone:", profile.phone);
    } else {
      throw new Error("No email or phone found in profile for Close CRM search");
    }

    const contactSearchResponse = await fetch(`https://api.close.com/api/v1/contact/?${searchParams}`, {
      headers: {
        "Authorization": `Basic ${btoa(closeApiKey + ":")}`,
        "Content-Type": "application/json",
      },
    });

    if (!contactSearchResponse.ok) {
      const errorText = await contactSearchResponse.text();
      console.error("❌ Contact search error response:", errorText);
      throw new Error(`Contact search error: ${contactSearchResponse.statusText} - ${errorText}`);
    }

    const contactData = await contactSearchResponse.json();
    const contacts = contactData.data || [];
    console.log("📞 Close CRM search results:", {
      totalFound: contacts.length,
      contacts: contacts.map((c: any) => ({ id: c.id, name: c.name, emails: c.emails }))
    });

    if (contacts.length === 0) {
      console.log("❌ No matching contact found in Close CRM");
      await supabaseClient
        .from("user_sync_status")
        .upsert({
          user_id: user.id,
          sync_status: 'no_contact_found',
          updated_at: new Date().toISOString(),
        });

      return new Response(
        JSON.stringify({ 
          message: "No matching contact found in Close CRM",
          searchCriteria: userEmail ? `email: ${userEmail}` : `phone: ${profile.phone}`,
          suggestion: "Ensure your email/phone matches what's in Close CRM"
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    closeContactId = contacts[0].id;
    console.log("✅ Found Close contact:", closeContactId);

    // Update profile with close_contact_id
    await supabaseClient
      .from("profiles")
      .update({ close_contact_id: closeContactId })
      .eq("id", user.id);

    // Fetch Close CRM users for staff mapping
    console.log("👥 Fetching Close CRM users...");
    const usersResponse = await fetch("https://api.close.com/api/v1/user/", {
      headers: {
        "Authorization": `Basic ${btoa(closeApiKey + ":")}`,
        "Content-Type": "application/json",
      },
    });

    if (!usersResponse.ok) {
      const errorText = await usersResponse.text();
      console.error("❌ Users fetch error response:", errorText);
      throw new Error(`Users fetch error: ${usersResponse.statusText} - ${errorText}`);
    }

    const usersData = await usersResponse.json();
    const closeUsers: { [key: string]: CloseUser } = {};
    
    if (usersData.data) {
      usersData.data.forEach((user: CloseUser) => {
        closeUsers[user.id] = user;
      });
    }

    console.log(`👥 Found ${Object.keys(closeUsers).length} Close CRM users`);

    // Fetch activities for this contact with multiple approaches
    console.log("📨 Fetching activities for contact:", closeContactId);
    
    let activitiesResponse;
    let activitiesUrl = `https://api.close.com/api/v1/activity/?contact_id=${closeContactId}&_limit=100`;
    console.log("🔗 Trying activities URL:", activitiesUrl);
    
    activitiesResponse = await fetch(activitiesUrl, {
      headers: {
        "Authorization": `Basic ${btoa(closeApiKey + ":")}`,
        "Content-Type": "application/json",
      },
    });

    if (!activitiesResponse.ok) {
      // Try alternative approach
      activitiesUrl = `https://api.close.com/api/v1/activity/?contact=${closeContactId}&_limit=100`;
      console.log("🔗 First attempt failed, trying alternative URL:", activitiesUrl);
      
      activitiesResponse = await fetch(activitiesUrl, {
        headers: {
          "Authorization": `Basic ${btoa(closeApiKey + ":")}`,
          "Content-Type": "application/json",
        },
      });
    }

    if (!activitiesResponse.ok) {
      // Try general activities endpoint and filter
      console.log("🔗 Both attempts failed, trying general activities endpoint");
      activitiesUrl = `https://api.close.com/api/v1/activity/?_limit=100`;
      
      activitiesResponse = await fetch(activitiesUrl, {
        headers: {
          "Authorization": `Basic ${btoa(closeApiKey + ":")}`,
          "Content-Type": "application/json",
        },
      });
    }

    if (!activitiesResponse.ok) {
      const errorText = await activitiesResponse.text();
      console.error("❌ Activities fetch error response:", errorText);
      console.error("❌ Final URL attempted:", activitiesUrl);
      console.error("❌ Response status:", activitiesResponse.status);
      throw new Error(`Activities fetch error: ${activitiesResponse.statusText} - ${errorText}`);
    }

    const activitiesData = await activitiesResponse.json();
    let activities: CloseActivity[] = activitiesData.data || [];

    // If we got all activities, filter by contact_id
    if (activitiesUrl.includes('activity/?_limit=100')) {
      const beforeFilter = activities.length;
      activities = activities.filter(activity => activity.contact_id === closeContactId);
      console.log(`🔍 Filtered activities: ${beforeFilter} -> ${activities.length} for contact ${closeContactId}`);
    }

    console.log(`📨 Found ${activities.length} activities for contact`);

    // Log activity types and sample activities for debugging
    const activityTypeCounts: { [key: string]: number } = {};
    activities.forEach(activity => {
      activityTypeCounts[activity.type] = (activityTypeCounts[activity.type] || 0) + 1;
    });
    console.log("📊 Activity types found:", activityTypeCounts);

    // Log first few activities for debugging
    if (activities.length > 0) {
      console.log("📋 Sample activities:", activities.slice(0, 3).map(a => ({
        id: a.id,
        type: a.type,
        date: a.date_created,
        subject: a.subject,
        hasContent: !!(a.body_text || a.body_html || a.text || a.note)
      })));
    }

    // Process activities with detailed logging
    let importedCount = 0;
    let skippedCount = 0;
    const staffContactsMap = new Map();
    const processingLog: string[] = [];

    for (const activity of activities) {
      console.log(`🔄 Processing activity ${activity.id} of type ${activity.type}`);
      
      // Enhanced activity type filtering and content extraction
      let content = '';
      let messageType = activity.type;
      
      if (activity.type === 'email') {
        content = activity.body_text || activity.body_html || activity.subject || '';
        if (!content.trim()) {
          processingLog.push(`⏭️ Skipped email ${activity.id}: no content`);
          skippedCount++;
          continue;
        }
      } else if (activity.type === 'sms') {
        content = activity.text || activity.note || activity.body_text || '';
        if (!content.trim()) {
          processingLog.push(`⏭️ Skipped SMS ${activity.id}: no content`);
          skippedCount++;
          continue;
        }
      } else if (activity.type === 'call') {
        content = activity.note || activity.text || `Call activity - ${activity.direction || 'unknown direction'}`;
        messageType = 'call';
      } else {
        processingLog.push(`⏭️ Skipped ${activity.id}: unsupported type ${activity.type}`);
        skippedCount++;
        continue;
      }

      // Skip if already imported
      const { data: existingMessage } = await supabaseClient
        .from("messages")
        .select("id")
        .eq("close_activity_id", activity.id)
        .single();

      if (existingMessage) {
        processingLog.push(`⏭️ Skipped ${activity.id}: already imported`);
        skippedCount++;
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
          const { data: newStaffContact, error: staffContactError } = await supabaseClient
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

          if (staffContactError) {
            console.error(`❌ Error creating staff contact for ${staffName}:`, staffContactError);
            skippedCount++;
            continue;
          }

          if (newStaffContact) {
            staffContactId = newStaffContact.id;
          }
        }
        
        if (staffContactId) {
          staffContactsMap.set(activity.user_id, staffContactId);
        }
      }

      if (!staffContactId) {
        processingLog.push(`⏭️ Skipped ${activity.id}: no staff contact available`);
        skippedCount++;
        continue;
      }

      // Find or create conversation thread
      let threadId = null;
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
          activity.type === 'sms' ? 'SMS Conversation' :
          'Call Activity';

        const { data: newThread, error: threadError } = await supabaseClient
          .from("conversation_threads")
          .insert({
            user_id: user.id,
            staff_contact_id: staffContactId,
            subject,
            last_message_at: activity.date_created,
          })
          .select()
          .single();

        if (threadError) {
          console.error(`❌ Error creating thread for activity ${activity.id}:`, threadError);
          skippedCount++;
          continue;
        }

        if (newThread) {
          threadId = newThread.id;
        }
      }

      if (!threadId) {
        processingLog.push(`⏭️ Skipped ${activity.id}: could not create/find thread`);
        skippedCount++;
        continue;
      }

      // Determine sender type
      let senderType = 'staff';
      if (activity.type === 'email') {
        if (activity.from && userEmail && activity.from.includes(userEmail)) {
          senderType = 'user';
        }
      } else if (activity.type === 'sms') {
        if (activity.direction === 'inbound') {
          senderType = 'user';
        }
      } else if (activity.type === 'call') {
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
          message_type: messageType,
          sent_at: activity.date_created,
          is_historical: true,
          staff_name: staffName,
          staff_email: staffEmail,
        });

      if (messageError) {
        console.error(`❌ Error importing message for activity ${activity.id}:`, messageError);
        skippedCount++;
      } else {
        importedCount++;
        processingLog.push(`✅ Imported ${activity.id} as ${messageType} from ${senderType}`);
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

    console.log(`✅ Sync completed. Imported: ${importedCount}, Skipped: ${skippedCount}, Total activities: ${activities.length}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        importedCount,
        skippedCount,
        totalActivities: activities.length,
        closeContactId,
        activityTypeCounts,
        processingLog: processingLog.slice(0, 10), // Include first 10 log entries
        message: `Imported ${importedCount} messages, skipped ${skippedCount} activities`
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("❌ Error in close-crm-sync-user-history function:", error);
    
    // Update sync status to error
    try {
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      const authHeader = req.headers.get("authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const { data: { user } } = await supabaseClient.auth.getUser(token);
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
      console.error("❌ Error updating sync status:", syncError);
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

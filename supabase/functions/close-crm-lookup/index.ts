
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const closeApiKey = Deno.env.get("CLOSE_API_KEY");
    if (!closeApiKey) {
      throw new Error("Close API key not configured");
    }

    const { email } = await req.json();
    if (!email) {
      throw new Error("Email is required");
    }

    console.log(`🔍 Looking up contact for email: ${email}`);

    // Search for contact by email with more specific query
    const searchParams = new URLSearchParams();
    searchParams.append('query', `email:${email}`);
    
    console.log(`🔍 Searching Close CRM with query: email:${email}`);

    const contactResponse = await fetch(`https://api.close.com/api/v1/contact/?${searchParams}`, {
      headers: {
        'Authorization': 'Basic ' + btoa(closeApiKey + ':'),
        'Content-Type': 'application/json',
      },
    });

    console.log(`📞 Contact search response status: ${contactResponse.status}`);

    if (!contactResponse.ok) {
      const errorText = await contactResponse.text();
      console.error(`❌ Contact search error: ${errorText}`);
      throw new Error(`Contact search failed: ${contactResponse.status} - ${errorText}`);
    }

    const contactResult = await contactResponse.json();
    console.log(`📞 Found ${contactResult.data?.length || 0} contacts`);

    if (!contactResult.data || contactResult.data.length === 0) {
      return new Response(
        JSON.stringify({ 
          contact: null,
          activities: [],
          users: {},
          message: "No contact found with that email address"
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Find the exact email match
    let contact = null;
    for (const contactCandidate of contactResult.data) {
      if (contactCandidate.emails) {
        for (const emailObj of contactCandidate.emails) {
          if (emailObj.email && emailObj.email.toLowerCase() === email.toLowerCase()) {
            contact = contactCandidate;
            break;
          }
        }
      }
      if (contact) break;
    }

    if (!contact) {
      console.log(`❌ No exact email match found for ${email}`);
      return new Response(
        JSON.stringify({ 
          contact: null,
          activities: [],
          users: {},
          message: `No contact found with exact email match: ${email}`
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`✅ Contact found: ${contact.name} (ID: ${contact.id}, Lead ID: ${contact.lead_id})`);

    // Fetch Close CRM users for staff mapping
    console.log("👥 Fetching Close CRM users...");
    const usersResponse = await fetch("https://api.close.com/api/v1/user/", {
      headers: {
        'Authorization': 'Basic ' + btoa(closeApiKey + ':'),
        'Content-Type': 'application/json',
      },
    });

    let users = {};
    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      if (usersData.data) {
        usersData.data.forEach((user: any) => {
          users[user.id] = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            display_name: user.display_name,
          };
        });
        console.log(`👥 Found ${Object.keys(users).length} Close CRM users`);
      }
    } else {
      console.log(`⚠️ Users fetch failed: ${usersResponse.status}`);
    }

    // Fetch activities using multiple approaches
    console.log('📨 Fetching activities for contact...');
    
    let activities = [];
    
    // Approach 1: Try with contact_id directly
    console.log(`🔗 Trying activities with contact_id: ${contact.id}`);
    let activitiesResponse = await fetch(`https://api.close.com/api/v1/activity/?contact_id=${contact.id}&_limit=100`, {
      headers: {
        'Authorization': 'Basic ' + btoa(closeApiKey + ':'),
        'Content-Type': 'application/json',
      },
    });

    console.log(`📨 Activities response status (contact_id): ${activitiesResponse.status}`);

    if (activitiesResponse.ok) {
      const activitiesResult = await activitiesResponse.json();
      activities = activitiesResult.data || [];
      console.log(`📨 Found ${activities.length} activities using contact_id`);
    } else {
      // Approach 2: Try with lead_id if contact_id fails
      if (contact.lead_id) {
        console.log(`🔗 Trying activities with lead_id: ${contact.lead_id}`);
        activitiesResponse = await fetch(`https://api.close.com/api/v1/activity/?lead_id=${contact.lead_id}&_limit=100`, {
          headers: {
            'Authorization': 'Basic ' + btoa(closeApiKey + ':'),
            'Content-Type': 'application/json',
          },
        });

        console.log(`📨 Activities response status (lead_id): ${activitiesResponse.status}`);

        if (activitiesResponse.ok) {
          const activitiesResult = await activitiesResponse.json();
          let leadActivities = activitiesResult.data || [];
          
          // Filter activities to only those related to this specific contact
          activities = leadActivities.filter((activity: any) => {
            return activity.contact_id === contact.id || 
                   (activity.to && activity.to.some((toEmail: string) => toEmail.toLowerCase().includes(email.toLowerCase()))) ||
                   (activity.from && activity.from.toLowerCase().includes(email.toLowerCase()));
          });
          
          console.log(`📨 Found ${activities.length} activities for contact after filtering from ${leadActivities.length} lead activities`);
        } else {
          const errorText = await activitiesResponse.text();
          console.log(`⚠️ Activities fetch error (lead_id): ${errorText}`);
        }
      }
    }

    if (activities.length === 0) {
      // Approach 3: Search all recent activities and filter by email
      console.log(`🔗 Trying general activities search and filtering by email`);
      activitiesResponse = await fetch(`https://api.close.com/api/v1/activity/?_limit=200&date_created__gte=${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()}`, {
        headers: {
          'Authorization': 'Basic ' + btoa(closeApiKey + ':'),
          'Content-Type': 'application/json',
        },
      });

      if (activitiesResponse.ok) {
        const activitiesResult = await activitiesResponse.json();
        let allActivities = activitiesResult.data || [];
        
        // Filter activities by email or contact_id
        activities = allActivities.filter((activity: any) => {
          if (activity.contact_id === contact.id) return true;
          if (activity.to && activity.to.some((toEmail: string) => toEmail.toLowerCase().includes(email.toLowerCase()))) return true;
          if (activity.from && activity.from.toLowerCase().includes(email.toLowerCase())) return true;
          return false;
        });
        
        console.log(`📨 Found ${activities.length} activities after filtering ${allActivities.length} recent activities`);
      }
    }

    // Log activity types and sample activities for debugging
    const activityTypes = activities.reduce((acc: any, activity: any) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1;
      return acc;
    }, {});
    console.log(`📊 Activity types: ${JSON.stringify(activityTypes)}`);

    // Log sample activities for debugging
    if (activities.length > 0) {
      console.log(`📋 Sample activities:`, activities.slice(0, 3).map((a: any) => ({
        id: a.id,
        type: a.type,
        date: a.date_created,
        user_id: a.user_id,
        user_name: users[a.user_id]?.display_name || 'Unknown',
        subject: a.subject,
        contact_id: a.contact_id,
        to: a.to,
        from: a.from,
        hasContent: !!(a.body_text || a.body_html || a.text || a.note)
      })));
    }

    return new Response(
      JSON.stringify({ 
        contact,
        activities,
        users,
        message: `Found contact ${contact.name} with ${activities.length} activities`
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("❌ Error in close-crm-lookup function:", error);
    
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

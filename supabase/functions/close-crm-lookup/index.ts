
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
    searchParams.append('query', `email:"${email}"`);
    
    console.log(`🔍 Searching Close CRM with query: email:"${email}"`);

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

    // Fetch activities using multiple comprehensive strategies
    console.log('📨 Fetching activities for lead and contact...');
    
    let allActivities = [];
    const activityIds = new Set(); // To avoid duplicates
    
    // Strategy 1: Fetch activities by lead_id with pagination
    if (contact.lead_id) {
      console.log(`🔗 Fetching activities for lead_id: ${contact.lead_id}`);
      
      let offset = 0;
      const limit = 100; // Max allowed by Close API
      let hasMore = true;
      
      while (hasMore) {
        const activitiesResponse = await fetch(
          `https://api.close.com/api/v1/activity/?lead_id=${contact.lead_id}&_limit=${limit}&_offset=${offset}`,
          {
            headers: {
              'Authorization': 'Basic ' + btoa(closeApiKey + ':'),
              'Content-Type': 'application/json',
            },
          }
        );

        console.log(`📨 Activities response status (offset ${offset}): ${activitiesResponse.status}`);

        if (activitiesResponse.ok) {
          const activitiesResult = await activitiesResponse.json();
          const activities = activitiesResult.data || [];
          
          console.log(`📨 Found ${activities.length} activities at offset ${offset}`);
          
          // Add unique activities
          activities.forEach((activity: any) => {
            if (!activityIds.has(activity.id)) {
              activityIds.add(activity.id);
              allActivities.push(activity);
            }
          });
          
          // Check if we got the full limit, indicating there might be more
          hasMore = activities.length === limit;
          offset += limit;
        } else {
          const errorText = await activitiesResponse.text();
          console.log(`⚠️ Activities fetch error at offset ${offset}: ${errorText}`);
          hasMore = false;
        }
      }
    }

    // Strategy 2: Fetch activities by contact_id if we have fewer than expected
    if (allActivities.length < 10) {
      console.log(`🔗 Trying contact_id search: ${contact.id}`);
      
      const contactActivitiesResponse = await fetch(
        `https://api.close.com/api/v1/activity/?contact_id=${contact.id}&_limit=100`,
        {
          headers: {
            'Authorization': 'Basic ' + btoa(closeApiKey + ':'),
            'Content-Type': 'application/json',
          },
        }
      );

      if (contactActivitiesResponse.ok) {
        const contactActivitiesResult = await contactActivitiesResponse.json();
        const activities = contactActivitiesResult.data || [];
        
        activities.forEach((activity: any) => {
          if (!activityIds.has(activity.id)) {
            activityIds.add(activity.id);
            allActivities.push(activity);
          }
        });
        
        console.log(`📨 Found ${activities.length} additional activities via contact_id`);
      }
    }

    // Strategy 3: Try broader activity search with different parameters
    if (allActivities.length < 10) {
      console.log(`🔗 Trying broader activity search`);
      
      // Try searching by email in activity content
      const emailSearchResponse = await fetch(
        `https://api.close.com/api/v1/activity/?query=${encodeURIComponent(email)}&_limit=100`,
        {
          headers: {
            'Authorization': 'Basic ' + btoa(closeApiKey + ':'),
            'Content-Type': 'application/json',
          },
        }
      );

      if (emailSearchResponse.ok) {
        const emailSearchResult = await emailSearchResponse.json();
        const activities = emailSearchResult.data || [];
        
        // Filter activities that are related to our contact or lead
        const relevantActivities = activities.filter((activity: any) => 
          activity.contact_id === contact.id || 
          activity.lead_id === contact.lead_id ||
          (activity.to && activity.to.includes(email)) ||
          (activity.from === email)
        );
        
        relevantActivities.forEach((activity: any) => {
          if (!activityIds.has(activity.id)) {
            activityIds.add(activity.id);
            allActivities.push(activity);
          }
        });
        
        console.log(`📨 Found ${relevantActivities.length} relevant activities via email search`);
      }
    }

    // Strategy 4: Try searching by phone number if available
    if (allActivities.length < 10 && contact.phones && contact.phones.length > 0) {
      for (const phoneObj of contact.phones) {
        const phone = phoneObj.phone;
        console.log(`🔗 Trying phone search: ${phone}`);
        
        const phoneSearchResponse = await fetch(
          `https://api.close.com/api/v1/activity/?query=${encodeURIComponent(phone)}&_limit=100`,
          {
            headers: {
              'Authorization': 'Basic ' + btoa(closeApiKey + ':'),
              'Content-Type': 'application/json',
            },
          }
        );

        if (phoneSearchResponse.ok) {
          const phoneSearchResult = await phoneSearchResponse.json();
          const activities = phoneSearchResult.data || [];
          
          // Filter activities that are related to our contact or lead
          const relevantActivities = activities.filter((activity: any) => 
            activity.contact_id === contact.id || 
            activity.lead_id === contact.lead_id ||
            (activity.phone && activity.phone.includes(phone.replace(/\D/g, '')))
          );
          
          relevantActivities.forEach((activity: any) => {
            if (!activityIds.has(activity.id)) {
              activityIds.add(activity.id);
              allActivities.push(activity);
            }
          });
          
          console.log(`📨 Found ${relevantActivities.length} relevant activities via phone search`);
        }
      }
    }

    // Process and normalize all activities
    const processedActivities = allActivities.map((activity: any) => {
      return {
        id: activity.id,
        type: activity._type || activity.type || 'unknown',
        date_created: activity.date_created,
        user_id: activity.user_id,
        contact_id: activity.contact_id,
        lead_id: activity.lead_id,
        subject: activity.subject,
        body_text: activity.body_text,
        body_html: activity.body_html,
        text: activity.text,
        note: activity.note,
        body: activity.body,
        direction: activity.direction,
        status: activity.status,
        duration: activity.duration,
        phone: activity.phone,
        to: activity.to,
        from: activity.from,
        // Include all raw data for debugging
        raw_data: activity
      };
    });

    // Sort activities by date (newest first)
    processedActivities.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());

    // Log activity types and sample activities for debugging
    const activityTypes = processedActivities.reduce((acc: any, activity: any) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1;
      return acc;
    }, {});
    console.log(`📊 Activity types: ${JSON.stringify(activityTypes)}`);

    // Log sample activities for debugging
    if (processedActivities.length > 0) {
      console.log(`📋 Sample activities:`, processedActivities.slice(0, 5).map((a: any) => ({
        id: a.id,
        type: a.type,
        date: a.date_created,
        user_id: a.user_id,
        user_name: users[a.user_id]?.display_name || 'Unknown',
        subject: a.subject,
        contact_id: a.contact_id,
        to: a.to,
        from: a.from,
        hasContent: !!(a.body_text || a.body_html || a.text || a.note || a.body)
      })));
    }

    console.log(`✅ Total activities found: ${processedActivities.length}`);

    return new Response(
      JSON.stringify({ 
        contact,
        activities: processedActivities,
        users,
        message: `Found contact ${contact.name} with ${processedActivities.length} activities`
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

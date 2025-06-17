
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

    // Search for contact by email
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
          message: "No contact found with that email address"
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const contact = contactResult.data[0];
    console.log(`✅ Contact found: ${contact.name} (ID: ${contact.id})`);

    // Fetch activities for this contact
    console.log('📨 Fetching activities for contact...');
    
    const activitiesResponse = await fetch(`https://api.close.com/api/v1/activity/?contact_id=${contact.id}&_limit=20`, {
      headers: {
        'Authorization': 'Basic ' + btoa(closeApiKey + ':'),
        'Content-Type': 'application/json',
      },
    });

    console.log(`📨 Activities response status: ${activitiesResponse.status}`);

    let activities = [];
    if (activitiesResponse.ok) {
      const activitiesResult = await activitiesResponse.json();
      activities = activitiesResult.data || [];
      console.log(`📨 Found ${activities.length} activities`);
      
      // Log activity types
      const activityTypes = activities.reduce((acc: any, activity: any) => {
        acc[activity.type] = (acc[activity.type] || 0) + 1;
        return acc;
      }, {});
      console.log(`📊 Activity types: ${JSON.stringify(activityTypes)}`);
    } else {
      const errorText = await activitiesResponse.text();
      console.log(`⚠️ Activities fetch error: ${errorText}`);
    }

    return new Response(
      JSON.stringify({ 
        contact,
        activities,
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


import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CloseContact {
  id: string;
  name: string;
  emails?: Array<{ email: string }>;
  phones?: Array<{ phone: string }>;
  custom?: { [key: string]: any };
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

    // Fetch contacts from Close CRM
    const closeResponse = await fetch("https://api.close.com/api/v1/contact/", {
      headers: {
        "Authorization": `Basic ${btoa(closeApiKey + ":")}`,
        "Content-Type": "application/json",
      },
    });

    if (!closeResponse.ok) {
      throw new Error(`Close API error: ${closeResponse.statusText}`);
    }

    const closeData = await closeResponse.json();
    const contacts = closeData.data || [];

    // Update our local contacts table
    for (const contact of contacts) {
      const email = contact.emails?.[0]?.email || null;
      const phone = contact.phones?.[0]?.phone || null;
      
      const { error } = await supabaseClient
        .from("close_crm_contacts")
        .upsert({
          close_contact_id: contact.id,
          name: contact.name,
          email,
          phone,
          role: contact.custom?.role || null,
          is_staff: contact.custom?.is_staff || false,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "close_contact_id"
        });

      if (error) {
        console.error("Error upserting contact:", error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, contacts }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in close-crm-contacts function:", error);
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

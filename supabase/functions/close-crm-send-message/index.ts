
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendMessageRequest {
  content: string;
  recipientEmail: string;
  subject?: string;
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

    const { content, recipientEmail, subject }: SendMessageRequest = await req.json();

    console.log("Sending message via Close CRM:", { recipientEmail, subject });

    // First, we need to find the lead_id for the recipient
    const contactResponse = await fetch(`https://api.close.com/api/v1/contact/?query=email:"${recipientEmail}"`, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${btoa(closeApiKey + ":")}`,
        "Content-Type": "application/json",
      },
    });

    if (!contactResponse.ok) {
      throw new Error(`Failed to find contact: ${contactResponse.statusText}`);
    }

    const contactData = await contactResponse.json();
    console.log("Contact search result:", contactData);

    if (!contactData.data || contactData.data.length === 0) {
      throw new Error(`No contact found for email: ${recipientEmail}`);
    }

    const contact = contactData.data[0];
    const leadId = contact.lead_id;

    if (!leadId) {
      throw new Error("No lead_id found for contact");
    }

    console.log("Found lead_id:", leadId);

    // Send email via Close CRM with the lead_id
    const emailData = {
      to: [recipientEmail],
      subject: subject || "Message from Avaana Dashboard",
      body_text: content,
      status: "sent",
      lead_id: leadId,
      direction: "incoming", // This makes it appear as an incoming message to the staff
    };

    console.log("Sending email with data:", emailData);

    const closeResponse = await fetch("https://api.close.com/api/v1/activity/email/", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(closeApiKey + ":")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!closeResponse.ok) {
      const errorText = await closeResponse.text();
      console.error("Close API error:", closeResponse.status, errorText);
      throw new Error(`Close API error: ${closeResponse.statusText}`);
    }

    const emailResult = await closeResponse.json();
    console.log("Email sent successfully via Close CRM:", emailResult.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        closeResult: emailResult 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in close-crm-send-message function:", error);
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

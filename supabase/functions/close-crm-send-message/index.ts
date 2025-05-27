
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendMessageRequest {
  threadId: string;
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

    const { threadId, content, recipientEmail, subject }: SendMessageRequest = await req.json();

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get auth header from request
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Set auth for supabase client
    supabaseClient.auth.setSession({
      access_token: authHeader.replace("Bearer ", ""),
      refresh_token: "",
    });

    // Send email via Close CRM
    const emailData = {
      to: [recipientEmail],
      subject: subject || "Message from Avaana Dashboard",
      body_text: content,
      status: "sent",
    };

    const closeResponse = await fetch("https://api.close.com/api/v1/activity/email/", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(closeApiKey + ":")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!closeResponse.ok) {
      throw new Error(`Close API error: ${closeResponse.statusText}`);
    }

    const emailResult = await closeResponse.json();

    // Store message in our database
    const { data: messageData, error: messageError } = await supabaseClient
      .from("messages")
      .insert({
        thread_id: threadId,
        close_message_id: emailResult.id,
        sender_type: "user",
        content,
        message_type: "email",
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (messageError) {
      console.error("Error storing message:", messageError);
      throw messageError;
    }

    // Update thread's last message time
    const { error: threadError } = await supabaseClient
      .from("conversation_threads")
      .update({
        last_message_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", threadId);

    if (threadError) {
      console.error("Error updating thread:", threadError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: messageData,
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

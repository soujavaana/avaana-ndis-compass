
import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Create a Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Handle CORS preflight requests
const handleCors = (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  return null;
};

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Only accept POST requests for actual webhook data
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse the webhook payload from Typeform
    const payload = await req.json();
    console.log("Received webhook from Typeform:", payload);

    // Extract form response data
    const { form_response } = payload;
    if (!form_response) {
      return new Response(JSON.stringify({ error: "Invalid payload format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Extract the email from hidden fields (if available)
    let email = null;
    if (form_response.hidden && form_response.hidden.email) {
      email = form_response.hidden.email;
    }

    // Process answers from the form
    const answers = form_response.answers;
    
    // Initialize profile data object
    const profileData: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    // Map answers to profile fields based on question reference or field IDs
    answers.forEach((answer: any) => {
      const questionRef = answer.field.ref;
      const questionType = answer.type;
      let answerValue = null;

      // Extract the answer based on its type
      switch (questionType) {
        case "text":
        case "email":
          answerValue = answer[questionType];
          break;
        case "phone_number":
          answerValue = answer.phone_number;
          break;
        case "choice":
          answerValue = answer.choice.label;
          break;
        case "choices":
          answerValue = answer.choices.labels.join(", ");
          break;
        default:
          answerValue = JSON.stringify(answer);
      }

      // Map fields based on question reference
      // You'll need to customize this mapping based on your Typeform questions
      if (questionRef.includes("first_name")) {
        profileData.first_name = answerValue;
      } else if (questionRef.includes("last_name")) {
        profileData.last_name = answerValue;
      } else if (questionRef.includes("phone")) {
        profileData.phone = answerValue;
      } else if (questionRef.includes("business_name")) {
        profileData.business_name = answerValue;
      } else if (questionRef.includes("abn")) {
        profileData.abn = answerValue;
      } else if (questionType === "email" && !email) {
        // If email wasn't in hidden fields but is in the form
        email = answerValue;
      }
    });

    // Try to find a user with the provided email
    let userId = null;
    if (email) {
      const { data: userData, error: userError } = await supabase
        .from("auth")
        .select("id")
        .eq("email", email)
        .single();
        
      if (!userError && userData) {
        userId = userData.id;
      } else {
        console.log("Could not find user with email:", email);
        console.log("Error:", userError);
      }
    }

    // If we have a user ID, update the profile
    let result;
    if (userId) {
      // Update existing profile
      result = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", userId);
    } else {
      // No user ID, just log the data for now
      console.log("No user ID found for email:", email);
      console.log("Form data:", profileData);
      result = { error: "No user ID found" };
    }

    // Return response
    return new Response(JSON.stringify({
      success: !result.error,
      message: result.error ? result.error.message : "Profile updated successfully",
      data: profileData
    }), {
      status: result.error ? 500 : 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

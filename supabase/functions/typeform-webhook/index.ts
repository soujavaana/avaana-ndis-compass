
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

    // Extract user ID and email from hidden fields
    let userId = null;
    let email = null;

    if (form_response.hidden) {
      userId = form_response.hidden.userId;
      email = form_response.hidden.email;
    }

    console.log("Extracted hidden fields - userId:", userId, "email:", email);

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

    console.log("Extracted profile data:", profileData);

    // Try to find the user
    let result;
    
    // If we have a user ID directly, use it first (most reliable)
    if (userId) {
      console.log("Using provided userId to update profile:", userId);
      result = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", userId)
        .select();
      
      if (result.error) {
        console.error("Error updating profile with userId:", result.error);
      } else {
        console.log("Successfully updated profile with userId");
      }
    } 
    // If no userId but we have email, try to find by querying profiles
    else if (email) {
      // We don't attempt to query auth.users directly anymore
      console.log("No userId provided. Email cannot be used to find the user directly.");
      result = { error: "No user ID provided in hidden fields" };
    } else {
      // No way to identify the user
      console.log("No user identification provided");
      result = { error: "No user identification provided" };
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

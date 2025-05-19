
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
    console.log("Received webhook from Typeform:", JSON.stringify(payload));

    // Extract form response data
    const { form_response } = payload;
    if (!form_response) {
      return new Response(JSON.stringify({ error: "Invalid payload format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Determine if this is a partial response or complete submission
    const isPartialResponse = payload.event_type === "form_response_partial";
    console.log(`Processing ${isPartialResponse ? "partial" : "complete"} form response`);

    // Extract user ID and email from hidden fields
    let userId = null;
    let email = null;

    if (form_response.hidden) {
      userId = form_response.hidden.userId;
      email = form_response.hidden.email;
      
      // Log all hidden fields for debugging
      console.log("All hidden fields:", JSON.stringify(form_response.hidden));
    }

    console.log("Extracted hidden fields - userId:", userId, "email:", email);

    // Process answers from the form
    const answers = form_response.answers || [];
    
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
        // If email wasn't in hidden fields but is in the form answers
        email = answerValue;
      }
      
      // Log mapped field for debugging
      console.log(`Mapped field ${questionRef} (${questionType}) to value: ${answerValue}`);
    });

    console.log("Extracted profile data:", profileData);

    // If this is a partial response and we don't have enough data, just acknowledge receipt
    if (isPartialResponse && Object.keys(profileData).length <= 1) { // Only has updated_at
      console.log("Partial response with minimal data, acknowledging without database update");
      return new Response(JSON.stringify({
        success: true,
        message: "Partial response acknowledged",
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Try to find the user
    let result;
    let foundUserId = userId;
    
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
        console.log("Successfully updated profile with userId:", userId);
      }
    } 
    // If no userId but we have email, try to find by querying auth users
    else if (email) {
      console.log("Attempting to find user by email:", email);
      
      // First, try to find in profiles table by matching on profile data
      const { data: profileMatches, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .limit(1);
        
      if (profileError) {
        console.error("Error querying profiles by email:", profileError);
      } else if (profileMatches && profileMatches.length > 0) {
        foundUserId = profileMatches[0].id;
        console.log("Found user by email in profiles table:", foundUserId);
        
        // Update the profile
        result = await supabase
          .from("profiles")
          .update(profileData)
          .eq("id", foundUserId)
          .select();
      } else {
        console.log("No matching profile found by email. This might be a new user or partial submission.");
        
        // For partial responses without a user ID, we'll just store it temporarily
        // Or you could create a pending_submissions table to store this data until the user completes the form
        result = { error: null, data: null };
      }
    } else {
      // No way to identify the user
      console.log("No user identification provided (no userId or email)");
      result = { error: "No user identification provided" };
    }

    // Return response
    return new Response(JSON.stringify({
      success: !result.error,
      message: result.error ? result.error.message : "Profile updated successfully",
      data: profileData,
      userId: foundUserId,
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

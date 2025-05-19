
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

// Function to log detailed information for debugging
const logDetails = (message: string, data: any) => {
  console.log(`[${new Date().toISOString()}] ${message}`, JSON.stringify(data));
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
    logDetails("Received webhook from Typeform:", payload);

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
    logDetails(`Processing ${isPartialResponse ? "partial" : "complete"} form response`, { event_type: payload.event_type });

    // Extract user ID and email from hidden fields
    let userId = null;
    let email = null;

    if (form_response.hidden) {
      // Check for both camelCase and lowercase versions of userId
      userId = form_response.hidden.userId || form_response.hidden.userid;
      email = form_response.hidden.email;
      
      // Log all hidden fields for debugging
      logDetails("All hidden fields:", form_response.hidden);
    }

    logDetails("Extracted hidden fields", { userId, email });

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
        profileData.email = answerValue; // Store email in the profile table
      }
      
      // Log mapped field for debugging
      logDetails(`Mapped field ${questionRef} (${questionType})`, { field: questionRef, type: questionType, value: answerValue });
    });

    logDetails("Extracted profile data", profileData);

    // Always ensure email is included in profile data if available
    if (email && !profileData.email) {
      profileData.email = email;
    }

    // ------------ UPDATED LOGIC FOR HANDLING PARTIAL SUBMISSIONS ------------

    let result;
    let foundUserId = userId;
    let userIdentified = false;
    
    // If we have a user ID directly, use it first (most reliable) - ALWAYS SAVE DATA FOR PARTIAL SUBMISSIONS IF WE HAVE USERID
    if (userId) {
      logDetails("Using provided userId to update profile", { userId });
      
      // For partial responses with userId, always ensure we at least store the email
      if (isPartialResponse && email && !profileData.email) {
        profileData.email = email;
      }
      
      // Always update the profile if we have a userId, even for partial submissions
      result = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", userId)
        .select();
      
      if (result.error) {
        logDetails("Error updating profile with userId", { error: result.error });
        
        // If update fails because the profile doesn't exist yet, attempt to create it
        if (result.error.code === "23505" || result.error.message?.includes("does not exist")) {
          logDetails("Profile doesn't exist yet, trying to create it", { userId });
          
          result = await supabase
            .from("profiles")
            .insert({
              id: userId,
              ...profileData
            })
            .select();
          
          if (result.error) {
            logDetails("Error creating profile with userId", { error: result.error });
          } else {
            logDetails("Successfully created profile with userId", { userId });
            userIdentified = true;
          }
        }
      } else {
        logDetails("Successfully updated profile with userId", { userId, updatedCount: result.data?.length });
        userIdentified = true;
      }
    } 
    // If no userId but we have email, try to find by querying auth users
    else if (email) {
      logDetails("Attempting to find user by email", { email });
      
      // First, try to find in profiles table by matching on profile data
      const { data: profileMatches, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .limit(1);
        
      if (profileError) {
        logDetails("Error querying profiles by email", { error: profileError });
      } else if (profileMatches && profileMatches.length > 0) {
        foundUserId = profileMatches[0].id;
        logDetails("Found user by email in profiles table", { userId: foundUserId });
        
        // Update the profile
        result = await supabase
          .from("profiles")
          .update(profileData)
          .eq("id", foundUserId)
          .select();
          
        userIdentified = true;
      } else {
        // If we don't find by email in profiles, try to find user by email in auth.users table
        // Since we can't query auth.users directly, we'll use an alternative approach
        
        logDetails("No matching profile found by email in profiles table. Attempting to create/update record", { email });
        
        // If we have an email but no matching profile, we'll create a temporary/pending record
        // This helps track partial submissions until we get a user ID
        // Check if a temp record with this email exists
        const { data: existingRecords, error: tempLookupError } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", email)
          .limit(1);
          
        if (tempLookupError) {
          logDetails("Error looking up potential temporary email record", { error: tempLookupError });
        } else if (existingRecords && existingRecords.length > 0) {
          // Update the existing record
          foundUserId = existingRecords[0].id;
          logDetails("Found existing record with this email", { existingId: foundUserId });
          
          result = await supabase
            .from("profiles")
            .update(profileData)
            .eq("id", foundUserId)
            .select();
            
          userIdentified = true;
        } else if (!isPartialResponse) {
          // For complete submissions with no existing profile, we need to create a new record
          logDetails("No existing profile found, but we have a complete form submission", { email });
          
          // This approach requires that email is added to the profiles table structure
          // We'll add a random UUID for the id field as a placeholder
          const randomId = crypto.randomUUID();
          
          result = await supabase
            .from("profiles")
            .insert({
              ...profileData,
              id: randomId,
              email: email
            })
            .select();
            
          if (!result.error) {
            foundUserId = randomId;
            userIdentified = true;
            logDetails("Created new profile record with generated ID", { generatedId: randomId });
          } else {
            logDetails("Error creating new profile record", { error: result.error });
          }
        } else {
          // For partial submissions with no existing profile, we may not want to create a record yet
          logDetails("Partial submission with no existing user record", { email });
          result = { error: null, data: null };
        }
      }
    } else {
      // No way to identify the user
      logDetails("No user identification provided (no userId or email)", {});
      result = { error: "No user identification provided" };
    }

    // Whether to acknowledge the submission without an error, even if we couldn't update a profile
    const acknowledgeSubmission = isPartialResponse || userIdentified;
    
    // Return response
    return new Response(JSON.stringify({
      success: acknowledgeSubmission,
      message: result.error ? result.error.message : (userIdentified ? "Profile updated successfully" : "Acknowledged submission"),
      data: profileData,
      userId: foundUserId,
      userIdentified,
      isPartialResponse,
    }), {
      status: result.error && !acknowledgeSubmission ? 500 : 200,
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

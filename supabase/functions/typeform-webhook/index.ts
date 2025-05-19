import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Create a Supabase client with service role key to bypass RLS
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Create a public client for operations that should respect RLS
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
const publicClient = createClient(supabaseUrl, supabaseAnonKey);

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

// Convert Typeform field title to database column name (snake_case)
const titleToColumnName = (title: string): string | null => {
  // Known field mappings - direct mapping of Typeform field titles to database column names
  const knownMappings: Record<string, string> = {
    "First name": "first_name",
    "Last name": "last_name",
    "Phone number": "phone",
    "Email": "email",
    "Company": "business_name",
    "What is your Australian Business Number (ABN) ?": "abn"
  };

  // Check if we have a direct mapping for this field title
  if (title in knownMappings) {
    return knownMappings[title];
  }

  // For any other field, convert to snake_case but return null for now
  // as we don't have a place to store them yet
  return null;
}

// Extract value from answer based on its type
const extractAnswerValue = (answer: any): any => {
  const type = answer.type;
  
  switch (type) {
    case "text":
    case "email":
      return answer[type];
    case "phone_number":
      return answer.phone_number;
    case "choice":
      return answer.choice.label;
    case "choices":
      return answer.choices.labels.join(", ");
    case "number":
      return answer.number;
    case "boolean":
      return answer.boolean;
    case "date":
      return answer.date;
    default:
      // Default case: try to return the object itself or stringify it
      try {
        return typeof answer === 'object' ? answer[type] : answer;
      } catch (e) {
        return JSON.stringify(answer);
      }
  }
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
    
    // Build a map of field titles to field references for easier lookup
    const fieldMap: Record<string, string> = {};
    
    // Check if definition and fields are available
    if (form_response.definition && form_response.definition.fields) {
      form_response.definition.fields.forEach((field: any) => {
        if (field.title && field.ref) {
          fieldMap[field.ref] = field.title;
        }
      });
      logDetails("Created field mapping from title to ref", fieldMap);
    }
    
    // Initialize profile data object
    const profileData: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    // An array to keep track of successfully mapped fields
    const mappedFields: { title: string, column: string, value: any }[] = [];
    // An array to keep track of fields that couldn't be mapped
    const unmappedFields: { title: string, value: any }[] = [];

    // Map answers to profile fields based on field titles
    answers.forEach((answer: any) => {
      const fieldRef = answer.field.ref;
      const fieldTitle = fieldMap[fieldRef] || `Unknown field (${fieldRef})`;
      const answerValue = extractAnswerValue(answer);
      
      // Map to database column name
      const columnName = titleToColumnName(fieldTitle);
      
      if (columnName) {
        profileData[columnName] = answerValue;
        mappedFields.push({ title: fieldTitle, column: columnName, value: answerValue });
        logDetails(`Mapped field "${fieldTitle}" to column "${columnName}"`, { value: answerValue });
      } else {
        // Field couldn't be mapped to a known column
        unmappedFields.push({ title: fieldTitle, value: answerValue });
        logDetails(`Could not map field "${fieldTitle}" to a database column`, { value: answerValue });
      }
      
      // Special handling for email fields to ensure we capture the email
      if (fieldTitle.toLowerCase().includes("email") && !email && typeof answerValue === 'string') {
        email = answerValue;
        profileData.email = answerValue; // Store email in the profile table
        logDetails("Found email field", { email });
      }
    });

    // Log summary of field mapping
    logDetails("Field mapping summary", { 
      mappedFieldsCount: mappedFields.length, 
      unmappedFieldsCount: unmappedFields.length,
      profileData
    });

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
      
      // IMPORTANT: Always update the profile if we have a userId, even for partial submissions
      // Now using service role client to bypass RLS
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
      // Use service role client to bypass RLS
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
        
        // Update the profile using service role client
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
          // Update the existing record using service role client
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
      fieldMappingSummary: {
        mapped: mappedFields,
        unmapped: unmappedFields
      },
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

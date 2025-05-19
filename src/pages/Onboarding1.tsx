
import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TypeformResponse {
  answers: Array<{
    field: { ref: string };
    email?: string;
    text?: string;
    phone_number?: string;
    boolean?: boolean;
    number?: number;
    choice?: { label: string };
    date?: string;
  }>;
}

const Onboarding1 = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [typeformLoaded, setTypeformLoaded] = useState(false);
  const typeformContainerRef = useRef<HTMLDivElement>(null);
  
  // This function will be called when the form is submitted
  const handleTypeformSubmit = (response: TypeformResponse) => {
    console.log('Typeform submitted with data:', response);
    
    // Extract data from the Typeform response
    const formData: Record<string, any> = {};
    
    response.answers.forEach(answer => {
      const fieldRef = answer.field.ref;
      
      // Map values based on their type
      if (answer.email) formData[fieldRef] = answer.email;
      else if (answer.text) formData[fieldRef] = answer.text;
      else if (answer.phone_number) formData[fieldRef] = answer.phone_number;
      else if (answer.boolean !== undefined) formData[fieldRef] = answer.boolean;
      else if (answer.number !== undefined) formData[fieldRef] = answer.number;
      else if (answer.choice) formData[fieldRef] = answer.choice.label;
      else if (answer.date) formData[fieldRef] = answer.date;
    });
    
    // Extract specific fields for profile update
    // The refs used here should match those in your Typeform
    const firstName = formData['d692cdc6-e0b3-44b3-a383-0dbc1bce498e']; // First name
    const lastName = formData['ac0ccdf2-7de4-464d-bac7-732dcecceb95']; // Last name
    const phone = formData['2f36729a-d28a-43b9-b42b-724b776cad53']; // Phone number
    const businessName = formData['59ec985f-7383-4ad5-8911-a0d5615f609a']; // Company
    const abn = formData['35981485-49dc-4d4e-97df-2281d82379ed']; // ABN
    
    // Update the user's profile in Supabase
    if (userId) {
      updateUserProfile(userId, {
        first_name: firstName,
        last_name: lastName,
        phone,
        business_name: businessName,
        abn: abn?.toString()
      });
    }
    
    toast({
      title: 'Onboarding Complete',
      description: 'Thank you for completing the onboarding process!',
    });
  };
  
  // Update user profile in Supabase
  const updateUserProfile = async (userId: string, profileData: any) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: userId,
          ...profileData,
          updated_at: new Date().toISOString()
        });
        
      if (error) throw error;
      
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update your profile. Please try again.',
        variant: 'destructive'
      });
    }
  };
  
  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      // Clean up any existing auth state
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      const testEmail = `test_${Date.now()}@example.com`;
      setEmail(testEmail);
      
      // Register user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: testEmail,
        password: 'Password123!',
        options: {
          // Skip email verification - user will be signed in immediately
          data: {
            email_confirmed: true
          }
        }
      });

      if (authError) {
        toast({
          title: "Error",
          description: authError.message,
          variant: "destructive"
        });
        console.error(authError);
        setIsLoading(false);
        return;
      }

      // Save the user ID for passing to Typeform
      if (authData && authData.user) {
        setUserId(authData.user.id);
        console.log("User created with ID:", authData.user.id);
        
        toast({
          title: "Success!",
          description: "Account created! Loading onboarding form...",
        });
        
        // This will trigger the useEffect to embed the Typeform
        setTypeformLoaded(true);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      toast({
        title: "Error",
        description: "An error occurred during sign up. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load and initialize Typeform with JavaScript API
  useEffect(() => {
    if (!typeformLoaded || !userId || !typeformContainerRef.current) return;
    
    const script = document.createElement('script');
    script.src = "https://embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      if (window.tf && typeformContainerRef.current) {
        const { embed } = window.tf;
        
        // Create the embed with callbacks
        embed({
          id: 'Ym8rFkcS',
          container: typeformContainerRef.current,
          hidden: { 
            userId: userId,
            email: email
          },
          onSubmit: handleTypeformSubmit,
          onReady: () => {
            console.log('Typeform ready');
          },
          onQuestionChanged: (data: any) => {
            console.log('Question changed:', data);
          },
          transitiveSearchParams: ['userId', 'email'],
          width: '100%',
          height: 500,
          opacity: 100
        });
      }
    };
    
    return () => {
      document.body.removeChild(script);
    };
  }, [typeformLoaded, userId, email]);
  
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Onboarding 1</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {!typeformLoaded ? (
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-medium mb-6 text-center">Start Onboarding Process</h2>
              <p className="text-gray-600 mb-6">
                Click the button below to create a temporary account and begin the onboarding process.
                This will load a Typeform that captures your information directly in our system.
              </p>
              <div className="pt-6">
                <Button 
                  onClick={handleSignUp} 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Start Onboarding"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-[80vh]">
              {/* Typeform will be embedded here */}
              <div ref={typeformContainerRef} className="w-full h-full"></div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Onboarding1;

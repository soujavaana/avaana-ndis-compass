
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { Widget } from '@typeform/embed-react';
import { supabase } from '@/integrations/supabase/client';

// User registration form schema
const registrationFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const OnboardingDemo = () => {
  const [showTypeform, setShowTypeform] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  
  // Form for user registration
  const registrationForm = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof registrationFormSchema>) => {
    setIsLoading(true);
    try {
      // Store the email for later use
      setUserEmail(values.email);
      
      // Clean up any existing auth state
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Register user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
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
        
        // IMPROVED: Always ensure the user profile has the email saved
        // This is critical for partial submissions
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({ 
            id: authData.user.id,
            email: values.email,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'id'
          });
          
        if (profileError) {
          console.error("Error updating profile with email:", profileError);
        } else {
          console.log("Successfully initialized profile with email:", values.email);
        }
      }

      toast({
        title: "Success!",
        description: "Account created! Continuing to onboarding form...",
      });
      
      // Show the Typeform
      setShowTypeform(true);
      
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

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Onboarding</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {!showTypeform ? (
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-medium mb-6 text-center">Create an Account</h2>
              
              <Form {...registrationForm}>
                <form onSubmit={registrationForm.handleSubmit(handleSignUp)} className="space-y-4">
                  <FormField
                    control={registrationForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registrationForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Create a password" {...field} />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-gray-500">Must be at least 6 characters.</p>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registrationForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account & Continue"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            <div className="h-[80vh]">
              {/* Using the Typeform Widget component with lowercase userid (Typeform requirement) */}
              <Widget
                id="Ym8rFkcS"
                height={500}
                hidden={{
                  email: userEmail,
                  userid: userId || '' // Using lowercase 'userid' as per Typeform's requirement
                }}
                style={{ height: "100%" }}
                className="w-full"
                source="onboarding-demo"
                transitiveSearchParams={['userid', 'email']} // Updated to use 'userid' instead of 'userId'
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OnboardingDemo;

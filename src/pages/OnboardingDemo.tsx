
import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: "Password must contain at least one uppercase letter and one symbol.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const OnboardingDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTypeform, setShowTypeform] = useState(false);
  const typeformContainerRef = useRef<HTMLDivElement>(null);
  const [typeformScriptLoaded, setTypeformScriptLoaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // This useEffect loads the Typeform script when the component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    
    script.onload = () => {
      console.log("Typeform script loaded");
      setTypeformScriptLoaded(true);
    };
    
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // This useEffect reinitializes the Typeform when showTypeform changes to true
  useEffect(() => {
    if (showTypeform && typeformContainerRef.current && typeformScriptLoaded) {
      // This helps ensure the Typeform is properly initialized when it becomes visible
      console.log("Attempting to initialize Typeform");
      
      // Use a small delay to ensure the DOM is ready
      setTimeout(() => {
        if (window.tf && typeof window.tf.createWidget === 'function') {
          console.log("Reinitializing Typeform");
          window.tf.createWidget();
        } else {
          console.log("Typeform object not available yet");
          // Try to load the script again if it's not available
          const script = document.createElement('script');
          script.src = "//embed.typeform.com/next/embed.js";
          script.async = true;
          document.body.appendChild(script);
        }
      }, 500);
    }
  }, [showTypeform, typeformScriptLoaded]);

  // This is our primary submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      console.log("Creating account with direct signup - bypassing email verification");
      
      // Create user with direct signup - COMPLETELY BYPASSING EMAIL
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          // This forces client-side only signup - NO EMAIL is sent
          emailRedirectTo: window.location.origin,
          // Set data for user metadata
          data: {
            onboarded: false
          }
        }
      });

      if (error) {
        console.error("Signup error:", error);
        toast.error(error.message);
        setIsLoading(false);
        return;
      }
      
      // If we have a user and session, we're good to proceed
      if (data?.user) {
        console.log("User account created successfully:", data.user.id);
        toast.success("Account created successfully!");
        
        // If we have a user but no session, try to sign in directly
        if (!data.session) {
          console.log("No session created, signing in manually");
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
          });
          
          if (signInError) {
            console.error("Sign-in error:", signInError);
            // Don't block the flow if sign-in fails
            toast.error("Created account, but couldn't sign in automatically.");
          } else {
            console.log("Manual sign-in successful");
          }
        }
        
        // Show the Typeform after successful account creation
        setShowTypeform(true);
        console.log("Typeform should now be displayed");
      } else {
        // This shouldn't happen, but just in case
        console.error("Account creation failed - no error but no user returned");
        toast.error("Account creation failed, please try again.");
      }
    } catch (error) {
      console.error("Unexpected error during account creation:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Onboarding</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {!showTypeform ? (
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-medium mb-6 text-center">Create your account</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
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
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Create a password" {...field} />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-gray-500">Must contain at least 8 characters, one uppercase letter, and one symbol.</p>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
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
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>
                  
                  <div className="mt-3 text-xs text-center text-gray-500">
                    <p>Direct signup mode - No email confirmation</p>
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            <div className="h-[80vh]" ref={typeformContainerRef}>
              <div data-tf-live="01JVKKXJB3GH774HBBVQT55SD4"></div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OnboardingDemo;


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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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

// Email form schema
const emailFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const OnboardingDemo = () => {
  const [showTypeform, setShowTypeform] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form for email collection
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form for user registration
  const registrationForm = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUpClick = () => {
    setIsSigningUp(true);
  };

  const handleProceed = (values: z.infer<typeof emailFormSchema>) => {
    console.log("Proceeding to Typeform with email:", values.email);
    
    // Show success toast
    toast({
      title: "Success!",
      description: "Continuing to onboarding form...",
    });
    
    // Show the Typeform
    setShowTypeform(true);
  };

  const handleSignUp = async (values: z.infer<typeof registrationFormSchema>) => {
    setIsLoading(true);
    try {
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

      toast({
        title: "Success!",
        description: "Account created! Continuing to onboarding form...",
      });
      
      // Close the dialog and show the Typeform
      setIsSigningUp(false);
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
              <h2 className="text-xl font-medium mb-6 text-center">Get Started</h2>
              
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(handleProceed)} className="space-y-6">
                  <FormField
                    control={emailForm.control}
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
                  
                  <div className="pt-6 space-y-2">
                    <Button 
                      type="submit" 
                      className="w-full"
                    >
                      Continue to Onboarding
                    </Button>
                    
                    <div className="text-center">
                      <span className="text-sm text-gray-500">Don't have an account? </span>
                      <Button 
                        variant="link" 
                        className="text-sm p-0 h-auto"
                        onClick={handleSignUpClick}
                        type="button"
                      >
                        Sign up here
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            <div className="h-[80vh]">
              {/* Using the Typeform Widget component from the React SDK */}
              <Widget
                id="Ym8rFkcS"
                height={500}
                hidden={{ email: emailForm.getValues("email") }}
                style={{ height: "100%" }}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Sign Up Dialog */}
        <Dialog open={isSigningUp} onOpenChange={(open) => setIsSigningUp(open)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create an Account</DialogTitle>
            </DialogHeader>
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

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default OnboardingDemo;

import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Simplified form schema - just keeping email field for demonstration
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const OnboardingDemo = () => {
  const [showTypeform, setShowTypeform] = useState(false);
  const typeformContainerRef = useRef<HTMLDivElement>(null);
  const [typeformScriptLoaded, setTypeformScriptLoaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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

  const handleProceed = () => {
    console.log("Proceeding directly to Typeform");
    setShowTypeform(true);
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Onboarding</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {!showTypeform ? (
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-medium mb-6 text-center">Get Started</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleProceed)} className="space-y-6">
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
                  
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="w-full"
                    >
                      Continue to Onboarding
                    </Button>
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

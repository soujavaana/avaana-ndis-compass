import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { PopupButton, Widget } from '@typeform/embed-react';

// Simplified form schema - just keeping email field for demonstration
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const OnboardingDemo = () => {
  const [showTypeform, setShowTypeform] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleProceed = (values: z.infer<typeof formSchema>) => {
    console.log("Proceeding to Typeform with email:", values.email);
    
    // Show success toast
    toast({
      title: "Success!",
      description: "Continuing to onboarding form...",
    });
    
    // Show the Typeform
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
            <div className="h-[80vh]">
              {/* Using the Typeform Widget component from the React SDK */}
              <Widget
                id="Ym8rFkcS"
                height={500}
                hidden={{ email: form.getValues("email") }}
                style={{ height: "100%" }}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OnboardingDemo;

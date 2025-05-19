
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(8, {
    message: "Please enter a valid phone number.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: "Password must contain at least one uppercase letter and one symbol.",
  }),
  confirmPassword: z.string(),
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  abn: z.string().optional(),
  serviceCategories: z.array(z.string()).min(1, {
    message: "Please select at least one service category.",
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms to continue.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const serviceCategories = [
  { value: "cleaning", label: "Cleaning" },
  { value: "gardening", label: "Gardening" },
  { value: "household-tasks", label: "Household tasks" },
  { value: "home-modifications", label: "Home Modifications" },
  { value: "assistive-products", label: "Assistive Products" },
  { value: "dehoarding", label: "De-hoarding / Decluttering" },
  { value: "social-advice", label: "Professional social advice" },
  { value: "personal-care", label: "Personal care" },
  { value: "housing", label: "SIL/Respite Housing" },
  { value: "therapeutic", label: "Professional Therapeutic Supports" },
  { value: "nursing", label: "Nursing" }
];

const SignUp = () => {
  const navigate = useNavigate();
  const [showTypeform, setShowTypeform] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      businessName: "",
      abn: "",
      serviceCategories: [],
      termsAccepted: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Register user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            businessName: values.businessName,
            abn: values.abn || '',
          }
        }
      });

      if (authError) {
        toast.error(authError.message);
        console.error(authError);
        setIsLoading(false);
        return;
      }

      if (authData.user) {
        // Store service categories
        const insertPromises = values.serviceCategories.map(category => {
          return supabase.from('user_services').insert({
            user_id: authData.user?.id,
            service_category_id: serviceCategories.findIndex(sc => sc.value === category) + 1 // +1 because our IDs start at 1
          });
        });

        await Promise.all(insertPromises);
        
        // Save the user data for typeform
        setUserData({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          businessName: values.businessName,
          abn: values.abn,
        });
        
        // Show typeform
        setShowTypeform(true);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error("An error occurred during sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCancelTypeform = () => {
    navigate('/');
  };

  // Generate Typeform URL with prefilled parameters
  const getTypeformUrl = () => {
    if (!userData) return null;
    
    const params = new URLSearchParams({
      'first_name': userData.firstName,
      'last_name': userData.lastName,
      'email': userData.email,
      'phone': userData.phone,
      'business_name': userData.businessName,
    });
    
    if (userData.abn) {
      params.append('abn', userData.abn);
    }
    
    return `https://form.typeform.com/to/01JVKCRM3YDVW44NKP5T5SMKSE?${params.toString()}`;
  };

  // Load Typeform script when needed
  useEffect(() => {
    if (showTypeform) {
      const script = document.createElement('script');
      script.src = '//embed.typeform.com/next/embed.js';
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showTypeform]);

  if (showTypeform) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-normal text-gray-800 mb-2">Complete Your Profile</h2>
            <p className="text-gray-600">Please fill out the following form to complete your registration.</p>
          </div>
          
          {/* Typeform embed - with URL parameters for prefilling */}
          <div className="w-full h-[600px] border rounded-lg">
            <div data-tf-live="01JVKCRM3YDVW44NKP5T5SMKSE" data-tf-hidden={JSON.stringify(userData)}></div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleCancelTypeform}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Skip & Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center py-6">
          <div>
            <span className="mr-2 text-gray-600">Already have an account?</span>
            <Button variant="link" className="text-[#F1490D] hover:underline">Log in</Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-normal text-gray-900">Create your Avaana NDIS Business account</h1>
            <p className="mt-2 text-gray-600">Join us to manage your NDIS services more effectively</p>
          </div>
          
          <div className="mx-auto max-w-3xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h2 className="text-xl font-normal text-gray-900 mb-4">Business Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your business name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="abn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ABN (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your ABN" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="mt-6">
                    <FormField
                      control={form.control}
                      name="serviceCategories"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Service Categories (select all that apply)</FormLabel>
                            <FormMessage />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {serviceCategories.map((category) => (
                              <FormField
                                key={category.value}
                                control={form.control}
                                name="serviceCategories"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={category.value}
                                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2 hover:bg-gray-50"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(category.value)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, category.value])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== category.value
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {category.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="h-4 w-4 mt-1 text-[#F1490D] focus:ring-[#F1490D] rounded"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal">
                            I agree to the <a href="#" className="text-[#F1490D]">Terms and Conditions</a> and <a href="#" className="text-[#F1490D]">Privacy Policy</a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="pt-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

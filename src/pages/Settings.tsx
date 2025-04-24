
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Bell, Globe, Lock, Mail, Shield, User, Users } from 'lucide-react';

const Settings = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Tabs defaultValue="general" className="w-full">
            <div className="flex flex-col md:flex-row gap-6">
              <TabsList className="flex flex-col items-start h-auto bg-transparent p-0 md:min-w-48 md:border-r">
                <TabsTrigger 
                  value="general" 
                  className="w-full justify-start gap-3 px-3 py-2 data-[state=active]:bg-gray-100 text-gray-700 data-[state=active]:text-gray-900"
                >
                  <Globe size={16} /> General
                </TabsTrigger>
                <TabsTrigger 
                  value="profile" 
                  className="w-full justify-start gap-3 px-3 py-2 data-[state=active]:bg-gray-100 text-gray-700 data-[state=active]:text-gray-900"
                >
                  <User size={16} /> Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="w-full justify-start gap-3 px-3 py-2 data-[state=active]:bg-gray-100 text-gray-700 data-[state=active]:text-gray-900"
                >
                  <Lock size={16} /> Security & Privacy
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="w-full justify-start gap-3 px-3 py-2 data-[state=active]:bg-gray-100 text-gray-700 data-[state=active]:text-gray-900"
                >
                  <Bell size={16} /> Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="team" 
                  className="w-full justify-start gap-3 px-3 py-2 data-[state=active]:bg-gray-100 text-gray-700 data-[state=active]:text-gray-900"
                >
                  <Users size={16} /> Team
                </TabsTrigger>
                <TabsTrigger 
                  value="compliance" 
                  className="w-full justify-start gap-3 px-3 py-2 data-[state=active]:bg-gray-100 text-gray-700 data-[state=active]:text-gray-900"
                >
                  <Shield size={16} /> Compliance
                </TabsTrigger>
                <TabsTrigger 
                  value="email" 
                  className="w-full justify-start gap-3 px-3 py-2 data-[state=active]:bg-gray-100 text-gray-700 data-[state=active]:text-gray-900"
                >
                  <Mail size={16} /> Email
                </TabsTrigger>
              </TabsList>
              
              <div className="flex-1 min-w-0">
                <TabsContent value="general" className="mt-0">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">General Settings</h2>
                    <p className="text-gray-600 mb-6">Configure your organization settings</p>
                    
                    <Card className="p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4">Organization Details</h3>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Organization Name</label>
                          <Input defaultValue="Happy Horizons NDIS" className="max-w-md" />
                        </div>
                        
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Business Type</label>
                          <Input defaultValue="Disability Services Provider" className="max-w-md" />
                        </div>
                        
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Business Number</label>
                          <Input defaultValue="ABN 12 345 678 901" className="max-w-md" />
                        </div>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Email Address</label>
                          <Input type="email" defaultValue="info@happyhorizons.com.au" className="max-w-md" />
                        </div>
                        
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Phone Number</label>
                          <Input defaultValue="+61 2 1234 5678" className="max-w-md" />
                        </div>
                        
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Website</label>
                          <Input defaultValue="https://happyhorizons.com.au" className="max-w-md" />
                        </div>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <h3 className="text-lg font-medium mb-4">Address</h3>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Street Address</label>
                          <Input defaultValue="123 Main Street" className="max-w-md" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label className="text-sm font-medium">City</label>
                            <Input defaultValue="Sydney" />
                          </div>
                          
                          <div className="grid gap-2">
                            <label className="text-sm font-medium">State</label>
                            <Input defaultValue="NSW" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label className="text-sm font-medium">Postal Code</label>
                            <Input defaultValue="2000" />
                          </div>
                          
                          <div className="grid gap-2">
                            <label className="text-sm font-medium">Country</label>
                            <Input defaultValue="Australia" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="profile">
                  <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
                  <p className="text-gray-500">Manage your user profile information.</p>
                </TabsContent>
                
                <TabsContent value="security">
                  <h2 className="text-xl font-semibold mb-4">Security & Privacy Settings</h2>
                  <p className="text-gray-500">Manage your account security and privacy preferences.</p>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
                  <p className="text-gray-500">Control how you receive notifications.</p>
                </TabsContent>
                
                <TabsContent value="team">
                  <h2 className="text-xl font-semibold mb-4">Team Settings</h2>
                  <p className="text-gray-500">Manage your team members and their access levels.</p>
                </TabsContent>
                
                <TabsContent value="compliance">
                  <h2 className="text-xl font-semibold mb-4">Compliance Settings</h2>
                  <p className="text-gray-500">Configure your compliance framework preferences.</p>
                </TabsContent>
                
                <TabsContent value="email">
                  <h2 className="text-xl font-semibold mb-4">Email Settings</h2>
                  <p className="text-gray-500">Configure your email preferences and templates.</p>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;

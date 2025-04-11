
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, GlobeIcon, BellIcon, ShieldIcon, UserIcon, LogOutIcon } from 'lucide-react';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'zh', label: 'Chinese (Simplified)' },
  { value: 'af', label: 'Afrikaans' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
];

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Tabs defaultValue="appearance">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>Customize how the dashboard looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {darkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  <div className="border-t pt-6">
                    <Label htmlFor="compact-mode">Compact View</Label>
                    <div className="flex items-center justify-between mt-2">
                      <CardDescription>
                        Reduce spacing and font size for a more compact interface
                      </CardDescription>
                      <Switch id="compact-mode" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Language & Localization</CardTitle>
                  <CardDescription>Change your language preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <GlobeIcon className="h-5 w-5" />
                      <Label htmlFor="language">Display Language</Label>
                    </div>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language" className="w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="border-t pt-6">
                    <Label htmlFor="date-format">Date Format</Label>
                    <div className="flex items-center justify-between mt-2">
                      <CardDescription>
                        Set your preferred date and time format
                      </CardDescription>
                      <Select defaultValue="mdy">
                        <SelectTrigger id="date-format" className="w-36">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="border-t pt-6 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compliance Alerts</p>
                      <p className="text-sm text-gray-500">Get notified when compliance items need attention</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="border-t pt-6 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Message Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications for new messages</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="border-t pt-6 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Document Updates</p>
                      <p className="text-sm text-gray-500">Get notified when documents are added or updated</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="border-t pt-6">
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-gray-500 mb-4">Last changed 45 days ago</p>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  <div className="border-t pt-6">
                    <p className="font-medium">Login History</p>
                    <p className="text-sm text-gray-500 mb-4">View your recent login activity</p>
                    <Button variant="outline">View Login History</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="font-medium">Account Information</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label>Email Address</Label>
                        <p className="text-gray-600 mt-1">john.smith@example.com</p>
                      </div>
                      <div>
                        <Label>Account Type</Label>
                        <p className="text-gray-600 mt-1">NDIS Provider</p>
                      </div>
                      <div>
                        <Label>Account Created</Label>
                        <p className="text-gray-600 mt-1">January 15, 2025</p>
                      </div>
                      <div>
                        <Label>Subscription</Label>
                        <p className="text-gray-600 mt-1">Business Pro</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-6">
                    <p className="font-medium">Connected Services</p>
                    <p className="text-sm text-gray-500 mb-4">Manage services connected to your account</p>
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" className="justify-start">
                        <img src="placeholder.svg" alt="Google" className="h-4 w-4 mr-2" />
                        Connect Google Calendar
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <img src="placeholder.svg" alt="Microsoft" className="h-4 w-4 mr-2" />
                        Connect Microsoft 365
                      </Button>
                    </div>
                  </div>
                  <div className="border-t pt-6">
                    <p className="font-medium">Data Export</p>
                    <p className="text-sm text-gray-500 mb-4">Download all your data from the platform</p>
                    <Button variant="outline">Export Data</Button>
                  </div>
                  <div className="border-t pt-6">
                    <p className="font-medium text-red-600">Danger Zone</p>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <p className="font-medium">Log Out from All Devices</p>
                        <p className="text-sm text-gray-500">This will log you out from all active sessions</p>
                      </div>
                      <Button variant="destructive">
                        <LogOutIcon className="h-4 w-4 mr-2" />
                        Log Out All
                      </Button>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div>
                        <p className="font-medium">Delete Account</p>
                        <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;

import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Contact, FileImage } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Profile = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium text-gray-800">Business Profile Details</h1>
        <Button>Save changes</Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">ABN details</CardTitle>
            <p className="text-sm text-gray-500">Enter your Australian Business Number and registration information.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="abn">ABN</Label>
                  <Input id="abn" value="97610520600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business name</Label>
                    <Input id="businessName" placeholder="Enter business name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entityName">Entity name</Label>
                    <Input id="entityName" placeholder="Enter entity name" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Service delivery</h3>
              <p className="text-sm text-gray-500">Select how you provide services.</p>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 h-24 flex-col border-2">
                  <span className="text-lg mb-2">In person</span>
                  <span className="text-sm text-gray-500">Clients visit your clinic</span>
                </Button>
                <Button variant="outline" className="flex-1 h-24 flex-col border-2">
                  <span className="text-lg mb-2">Mobile</span>
                  <span className="text-sm text-gray-500">You visit clients at home</span>
                </Button>
                <Button variant="outline" className="flex-1 h-24 flex-col border-2">
                  <span className="text-lg mb-2">Online</span>
                  <span className="text-sm text-gray-500">You meet clients online</span>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">About your business</h3>
              <p className="text-sm text-gray-500">Provide a brief overview of your healthcare or service practice and specialties.</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>In business since</Label>
                  <Select defaultValue="2022">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aboutBusiness">About your business</Label>
                  <textarea
                    id="aboutBusiness"
                    className="w-full min-h-[120px] p-3 rounded-md border border-gray-200"
                    placeholder="Describe your business..."
                  />
                  <Button variant="secondary" className="float-right">
                    Fill with AI
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <CardTitle className="text-lg font-medium">Business Events</CardTitle>
            </div>
            <p className="text-sm text-gray-500">Manage your business events and important dates.</p>
          </CardHeader>
          <CardContent>
            {/* Events content will go here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Contact className="h-5 w-5 text-gray-500" />
              <CardTitle className="text-lg font-medium">Contact Details</CardTitle>
            </div>
            <p className="text-sm text-gray-500">Manage your business contact information.</p>
          </CardHeader>
          <CardContent>
            {/* Contact details content will go here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileImage className="h-5 w-5 text-gray-500" />
              <CardTitle className="text-lg font-medium">Business Images</CardTitle>
            </div>
            <p className="text-sm text-gray-500">Upload and manage your business photos and images.</p>
          </CardHeader>
          <CardContent>
            {/* Business images content will go here */}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;

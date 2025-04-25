
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Building2, ImageIcon, MapPin, Phone, Shield } from 'lucide-react';

const Profile = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-800">Business Details</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your business information and settings</p>
        </div>
        <Button variant="default">Save changes</Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <div className="col-span-12 md:col-span-3">
          <div className="space-y-1">
            <Button 
              variant="default"
              className="w-full justify-start bg-[#063e3b] text-white hover:bg-[#063e3b]/90"
            >
              <Building2 className="mr-2 h-4 w-4" />
              Business information
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Phone className="mr-2 h-4 w-4" />
              Contact details
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ImageIcon className="mr-2 h-4 w-4" />
              Business images
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-9 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-lg font-medium">ABN details</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Enter your Australian Business Number and registration information.</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Validated
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="abn">ABN<span className="text-red-500">*</span></Label>
                  <div className="flex gap-2">
                    <Input id="abn" value="97610520600" className="flex-1" />
                    <Button variant="outline">Verify</Button>
                  </div>
                  <p className="text-xs text-gray-500">Validated on Apr 25, 2025 at 10:07 PM</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business name<span className="text-red-500">*</span></Label>
                    <Input id="businessName" placeholder="Enter business name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entityName">Entity name<span className="text-red-500">*</span></Label>
                    <Input id="entityName" placeholder="Enter entity name" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Delivery Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Service delivery</CardTitle>
              <p className="text-sm text-gray-500">Select how you provide services.</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex-col border-2 hover:bg-gray-50">
                  <MapPin className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">In person</span>
                  <span className="text-xs text-gray-500">Clients visit your clinic</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col border-2 hover:bg-gray-50">
                  <Shield className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">Mobile</span>
                  <span className="text-xs text-gray-500">You visit clients at home</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col border-2 hover:bg-gray-50">
                  <Calendar className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">Online</span>
                  <span className="text-xs text-gray-500">You meet clients online</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* About Business Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">About your business</CardTitle>
              <p className="text-sm text-gray-500">Provide a brief overview of your healthcare or service practice and specialties.</p>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  className="w-full min-h-[120px] p-3 rounded-md border border-gray-200 bg-transparent"
                  placeholder="Describe your business..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

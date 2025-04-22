import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ndisRegistrations = {
  title: "NDIS Registration Groups",
  registrationNumber: "ABC12345",
  status: "Approved",
  dateApplied: "January 10, 2024",
  dateApproved: "February 15, 2024",
  renewalDate: "February 15, 2027",
  categories: [
    "Assistance with Daily Life",
    "Assistance with Social & Community Participation",
    "Improved Daily Living",
    "Household Tasks"
  ]
};

const getStatusBadge = (status) => {
  switch(status) {
    case "Approved":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
    case "In Progress":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">In Progress</Badge>;
    case "Not Applied":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Not Applied</Badge>;
    default:
      return null;
  }
};

const Registrations = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">NDIS Provider Registration</h1>
      </div>

      <Tabs defaultValue="ndis">
        <TabsList className="mb-6 border-b w-full justify-start space-x-6 bg-transparent p-0">
          <TabsTrigger 
            value="ndis" 
            className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-avaana-primary data-[state=active]:border-b-2 data-[state=active]:border-avaana-primary rounded-none"
          >
            NDIS Provider
          </TabsTrigger>
          <TabsTrigger 
            value="aged-care" 
            className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-avaana-primary data-[state=active]:border-b-2 data-[state=active]:border-avaana-primary rounded-none"
          >
            <div className="flex items-center gap-2">
              My Aged Care Provider
              <AlertTriangle 
                className="h-4 w-4 text-amber-500" 
                aria-label="Registration not started" 
              />
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="dva" 
            className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-avaana-primary data-[state=active]:border-b-2 data-[state=active]:border-avaana-primary rounded-none"
          >
            <div className="flex items-center gap-2">
              DVA
              <AlertTriangle 
                className="h-4 w-4 text-amber-500" 
                aria-label="Registration not started" 
              />
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ndis">
          <Card>
            <CardHeader>
              <CardTitle>NDIS Registration Groups</CardTitle>
              <CardDescription>View and manage your NDIS provider registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-lg">{ndisRegistrations.title}</h3>
                      {getStatusBadge(ndisRegistrations.status)}
                    </div>
                    <div className="space-y-1 text-sm text-gray-500">
                      <p>Registration Number: {ndisRegistrations.registrationNumber}</p>
                      <p>Applied: {ndisRegistrations.dateApplied}</p>
                      <p>Approved: {ndisRegistrations.dateApproved}</p>
                      <p>Renewal Date: {ndisRegistrations.renewalDate}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">Registration Groups:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {ndisRegistrations.categories.map((category, index) => (
                          <li key={index} className="text-gray-600">{category}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>View Certificate</span>
                  </Button>
                </div>
                <div className="border-t pt-6">
                  <Button 
                    className="bg-[#F97316] text-white hover:bg-[#EA580C] flex items-center gap-2"
                  >
                    <span>Apply for Additional Categories</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="aged-care">
          <Card className="p-8 flex flex-col items-center text-center">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <FileText className="h-10 w-10 text-avaana-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">My Aged Care Provider Registration</h2>
            <p className="text-gray-500 max-w-lg mb-6">
              Become an approved My Aged Care provider to offer services to older Australians. Avaana can help you with the registration process.
            </p>
            <Button className="bg-avaana-primary text-white hover:bg-avaana-secondary">
              Get Registration Quote
            </Button>
          </Card>
        </TabsContent>
        
        <TabsContent value="dva">
          <Card className="p-8 flex flex-col items-center text-center">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <FileText className="h-10 w-10 text-avaana-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">DVA Provider Registration</h2>
            <p className="text-gray-500 max-w-lg mb-6">
              Register as a Department of Veterans' Affairs (DVA) provider to offer services to veterans and their families. Avaana can guide you through the process.
            </p>
            <Button className="bg-avaana-primary text-white hover:bg-avaana-secondary">
              Get Registration Quote
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Registrations;


import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle, FileText, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ndisRegistrations = [
  {
    category: "Assistance with Daily Life",
    registrationNumber: "ABC12345",
    status: "Approved",
    dateApplied: "January 10, 2024",
    dateApproved: "February 15, 2024",
    renewalDate: "February 15, 2027",
  },
  {
    category: "Assistance with Social & Community Participation",
    registrationNumber: "DEF67890",
    status: "Approved",
    dateApplied: "January 10, 2024",
    dateApproved: "February 15, 2024",
    renewalDate: "February 15, 2027",
  },
  {
    category: "Improved Daily Living",
    registrationNumber: "GHI12345",
    status: "In Progress",
    dateApplied: "March 5, 2025",
    dateApproved: null,
    renewalDate: null,
  },
  {
    category: "Household Tasks",
    registrationNumber: null,
    status: "Not Applied",
    dateApplied: null,
    dateApproved: null,
    renewalDate: null,
  }
];

const getStatusIcon = (status) => {
  switch(status) {
    case "Approved":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "In Progress":
      return <Clock className="h-5 w-5 text-amber-500" />;
    case "Not Applied":
      return <XCircle className="h-5 w-5 text-gray-400" />;
    default:
      return null;
  }
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
        <h1 className="text-3xl font-bold text-gray-900">Your Registrations</h1>
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
              <CardTitle>NDIS Registration Categories</CardTitle>
              <CardDescription>View and manage your NDIS provider registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {ndisRegistrations.map((reg, index) => (
                  <div key={index} className={`${index > 0 ? "border-t pt-6" : ""} flex justify-between items-start`}>
                    <div className="flex items-start gap-3">
                      {getStatusIcon(reg.status)}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{reg.category}</h3>
                          {getStatusBadge(reg.status)}
                        </div>
                        {reg.registrationNumber && (
                          <p className="text-sm text-gray-500">Registration Number: {reg.registrationNumber}</p>
                        )}
                        {reg.dateApplied && (
                          <p className="text-sm text-gray-500">Applied: {reg.dateApplied}</p>
                        )}
                        {reg.dateApproved && (
                          <p className="text-sm text-gray-500">Approved: {reg.dateApproved}</p>
                        )}
                        {reg.renewalDate && (
                          <p className="text-sm text-gray-500">Renewal Date: {reg.renewalDate}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      {reg.status === "Approved" && (
                        <Button variant="outline" className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>View Certificate</span>
                        </Button>
                      )}
                      {reg.status === "In Progress" && (
                        <Button variant="outline" className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>View Application</span>
                        </Button>
                      )}
                      {reg.status === "Not Applied" && (
                        <Button className="bg-avaana-primary text-white hover:bg-avaana-secondary">
                          Start Application
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="border-t pt-6">
                  <Button className="bg-avaana-primary text-white hover:bg-avaana-secondary flex items-center gap-2">
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

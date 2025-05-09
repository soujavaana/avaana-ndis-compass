import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  FileTextIcon, 
  AlertTriangleIcon, 
  CheckCircleIcon,
  BookIcon,
  UsersIcon,
  ShieldCheckIcon,
  FileSearchIcon,
} from 'lucide-react';

const Dashboard = () => {
  const quickLinks = [
    { name: 'Documents', icon: FileTextIcon, path: '/documents' },
    { name: 'Frameworks', icon: BookIcon, path: '/compliance/frameworks' },
    { name: 'People', icon: UsersIcon, path: '/people/employees' },
    { name: 'Compliance', icon: ShieldCheckIcon, path: '/compliance/controls' },
    { name: 'Audit', icon: FileSearchIcon, path: '/audit/center' },
    { name: 'Business Goals', icon: CalendarIcon, path: '/business-goals' },
  ];

  return (
    <Layout>
      <div className="bg-[#063e3b] text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Welcome back, Happy Horizons NDIS Services</h1>
        <p className="text-sm text-white">You have $350 in credits. Book a Business Goal session now.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <Progress value={75} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Documents Requiring Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileTextIcon className="mr-2 text-avaana-alert" />
              <span className="text-2xl font-bold">3</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Days Until Next Audit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 text-avaana-primary" />
              <span className="text-2xl font-bold">45</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircleIcon className="mr-2 text-avaana-secondary" />
              <span className="text-2xl font-bold">0</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertTriangleIcon className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Attention Required</AlertTitle>
          <AlertDescription className="text-yellow-700">
            Public Liability Insurance is expiring in 14 days. Please upload a renewed certificate.
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">Public Liability Insurance Renewal</p>
                  <p className="text-sm text-gray-500">Certificates</p>
                </div>
                <div className="text-avaana-alert">Apr 25, 2025</div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">Worker Screening Verification</p>
                  <p className="text-sm text-gray-500">Screening</p>
                </div>
                <div className="text-amber-500">May 10, 2025</div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">Quality Management Policy Review</p>
                  <p className="text-sm text-gray-500">Policies</p>
                </div>
                <div className="text-gray-500">Aug 15, 2025</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <link.icon className="h-6 w-6 mb-2 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{link.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

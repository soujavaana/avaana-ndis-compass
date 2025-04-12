
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  CalendarIcon, 
  FileTextIcon, 
  AlertTriangleIcon, 
  CheckCircleIcon,
  LayoutDashboard,
  User,
  ClipboardCheck,
  ShieldCheck,
  Users,
  Flag,
  Calculator,
  MessageSquare,
  BarChart,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Layout>
      <div className="bg-green-600 text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Welcome back, Happy Horizons NDIS Services</h1>
        <p className="text-sm">You have $350 in credits. Book a Business Goal session now.</p>
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
      
      {/* Menu item snapshots section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Link to="/profile" className="no-underline">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center">
                <User className="h-8 w-8 mr-3 text-avaana-primary" />
                <div>
                  <h3 className="font-medium">Profile</h3>
                  <p className="text-sm text-gray-500">Manage your business profile</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/registrations" className="no-underline">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center">
                <ClipboardCheck className="h-8 w-8 mr-3 text-avaana-primary" />
                <div>
                  <h3 className="font-medium">Registrations</h3>
                  <p className="text-sm text-gray-500">Review registration status</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/documents" className="no-underline">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center">
                <FileTextIcon className="h-8 w-8 mr-3 text-avaana-primary" />
                <div>
                  <h3 className="font-medium">Documents</h3>
                  <p className="text-sm text-gray-500">Access important files</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/compliance" className="no-underline">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center">
                <ShieldCheck className="h-8 w-8 mr-3 text-avaana-primary" />
                <div>
                  <h3 className="font-medium">Compliance</h3>
                  <p className="text-sm text-gray-500">Track compliance requirements</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/participants" className="no-underline">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center">
                <Users className="h-8 w-8 mr-3 text-avaana-primary" />
                <div>
                  <h3 className="font-medium">Participants</h3>
                  <p className="text-sm text-gray-500">Manage NDIS participants</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/business-goals" className="no-underline">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center">
                <Flag className="h-8 w-8 mr-3 text-avaana-primary" />
                <div>
                  <h3 className="font-medium">Business Goals</h3>
                  <p className="text-sm text-gray-500">Plan your business growth</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/tax-accounting" className="no-underline">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center">
                <Calculator className="h-8 w-8 mr-3 text-avaana-primary" />
                <div>
                  <h3 className="font-medium">Tax & Accounting</h3>
                  <p className="text-sm text-gray-500">Manage financial records</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/communication" className="no-underline">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center">
                <MessageSquare className="h-8 w-8 mr-3 text-avaana-primary" />
                <div>
                  <h3 className="font-medium">Messages</h3>
                  <p className="text-sm text-gray-500">View important communications</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/analytics" className="no-underline">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center">
                <BarChart className="h-8 w-8 mr-3 text-avaana-primary" />
                <div>
                  <h3 className="font-medium">Analytics</h3>
                  <p className="text-sm text-gray-500">Track business performance</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/settings" className="no-underline">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center">
                <Settings className="h-8 w-8 mr-3 text-avaana-primary" />
                <div>
                  <h3 className="font-medium">Settings</h3>
                  <p className="text-sm text-gray-500">Configure your preferences</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

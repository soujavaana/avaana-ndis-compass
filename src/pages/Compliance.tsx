
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartContainer } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Shield, CheckCircle, AlertTriangle, XCircle, ClipboardList, FileText } from 'lucide-react';

const complianceAreas = [
  { name: 'NDIS Practice Standards', value: 85 },
  { name: 'Worker Screening', value: 100 },
  { name: 'Complaints Management', value: 60 },
  { name: 'Incident Management', value: 75 },
  { name: 'Risk Management', value: 90 },
  { name: 'Quality Management', value: 65 },
];

const auditData = [
  { name: 'Core Module', completed: 18, total: 20 },
  { name: 'Provider Governance', completed: 10, total: 12 },
  { name: 'Risk Management', completed: 7, total: 8 },
  { name: 'Human Resource', completed: 12, total: 15 },
  { name: 'Participant Support', completed: 16, total: 20 },
];

const upcomingRequirements = [
  { name: 'Mid-term Audit', date: 'May 15, 2025', status: 'urgent' },
  { name: 'Worker Screening Renewal', date: 'July 8, 2025', status: 'upcoming' },
  { name: 'Policy Review', date: 'August 22, 2025', status: 'planned' },
  { name: 'Insurance Certificate Renewal', date: 'September 5, 2025', status: 'planned' },
];

const incidentManagementData = [
  { id: 'INC-2025-001', date: 'March 15, 2025', type: 'Minor', status: 'Resolved', description: 'Staff member reported missing documentation' },
  { id: 'INC-2025-002', date: 'March 22, 2025', type: 'Moderate', status: 'In Progress', description: 'Participant reported dissatisfaction with service delivery' },
  { id: 'INC-2025-003', date: 'April 3, 2025', type: 'Reportable', status: 'Reported to NDIS', description: 'Medication error requiring minor medical attention' },
  { id: 'INC-2025-004', date: 'April 8, 2025', type: 'Moderate', status: 'Under Review', description: 'Staff reported potential breach of code of conduct' },
];

const todoTasks = [
  { id: 1, title: 'Update Incident Management Policy', dueDate: 'April 20, 2025', priority: 'high', category: 'Policy' },
  { id: 2, title: 'Complete Worker Screening Renewals', dueDate: 'April 25, 2025', priority: 'high', category: 'Workforce' },
  { id: 3, title: 'Review Risk Management Plan', dueDate: 'May 5, 2025', priority: 'medium', category: 'Risk Management' },
  { id: 4, title: 'Prepare Mid-term Audit Documentation', dueDate: 'May 10, 2025', priority: 'high', category: 'Audit' },
  { id: 5, title: 'Update Complaints Register', dueDate: 'May 15, 2025', priority: 'medium', category: 'Complaints' },
  { id: 6, title: 'Conduct Monthly Staff Training', dueDate: 'April 30, 2025', priority: 'medium', category: 'Training' },
];

const statusColors = {
  urgent: 'text-red-500',
  upcoming: 'text-amber-500',
  planned: 'text-blue-500',
  completed: 'text-green-500'
};

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-blue-100 text-blue-800'
};

const Compliance = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Compliance Management</h1>
        <button className="bg-avaana-primary text-white px-4 py-2 rounded-md hover:bg-avaana-secondary transition-colors">
          Generate Compliance Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-avaana-primary" />
              Overall Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <Progress value={78} className="h-2 mt-2" />
            <p className="text-sm text-gray-500 mt-2">
              Last verified: April 5, 2025
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-avaana-primary" />
              Audit Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">63%</div>
            <Progress value={63} className="h-2 mt-2" />
            <p className="text-sm text-gray-500 mt-2">
              Mid-term audit: 35 days remaining
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Required Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-red-500">Critical: 2</span>
              <span className="text-amber-500">Important: 3</span>
              <span className="text-blue-500">Normal: 2</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="border-b w-full justify-start space-x-6 bg-transparent p-0">
          <TabsTrigger 
            value="overview" 
            className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-avaana-primary data-[state=active]:border-b-2 data-[state=active]:border-avaana-primary rounded-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="incidents" 
            className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-avaana-primary data-[state=active]:border-b-2 data-[state=active]:border-avaana-primary rounded-none"
          >
            Incident Management
          </TabsTrigger>
          <TabsTrigger 
            value="tasks" 
            className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-avaana-primary data-[state=active]:border-b-2 data-[state=active]:border-avaana-primary rounded-none"
          >
            To-Do Tasks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer 
                    config={{
                      area1: { color: '#2DCE89' },
                      area2: { color: '#1AAE6F' }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={auditData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completed" name="Completed" fill="#2DCE89" />
                        <Bar dataKey="total" name="Required" fill="#E5E7EB" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Compliance Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {upcomingRequirements.map((item, i) => (
                    <div key={i} className="py-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`mr-3 ${statusColors[item.status]}`}>
                          {item.status === 'urgent' ? <XCircle size={20} /> : 
                          item.status === 'upcoming' ? <AlertTriangle size={20} /> : 
                          <CheckCircle size={20} />}
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Due: {item.date}</p>
                        </div>
                      </div>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm transition-colors">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>NDIS Practice Standards</CardTitle>
              <CardDescription>Compliance with core modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Rights and Responsibility</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Provider Governance and Operational Management</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Provision of Supports</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Support Provision Environment</span>
                    <span className="text-sm font-medium">80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <CardTitle>Incident Management System</CardTitle>
              <CardDescription>Track and manage reportable incidents in compliance with NDIS requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Incident ID</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Description</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incidentManagementData.map((incident) => (
                      <tr key={incident.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{incident.id}</td>
                        <td className="py-3 px-4">{incident.date}</td>
                        <td className="py-3 px-4">
                          <Badge className={incident.type === 'Reportable' ? 'bg-red-100 text-red-800' : incident.type === 'Moderate' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}>
                            {incident.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={incident.status === 'Resolved' ? 'bg-green-100 text-green-800' : incident.status === 'Reported to NDIS' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'}>
                            {incident.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 max-w-xs truncate">{incident.description}</td>
                        <td className="py-3 px-4 text-right">
                          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-800">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-500">Showing 4 of 24 incidents</p>
                <button className="bg-avaana-primary text-white px-4 py-2 rounded-md hover:bg-avaana-secondary transition-colors">
                  Report New Incident
                </button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>NDIS Reportable Incidents</CardTitle>
                <CardDescription>Incidents requiring notification to the NDIS Commission</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Death of a person with disability</p>
                      <p className="text-sm text-gray-500">Must be reported within 24 hours</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Serious injury of a person with disability</p>
                      <p className="text-sm text-gray-500">Must be reported within 24 hours</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Abuse or neglect of a person with disability</p>
                      <p className="text-sm text-gray-500">Must be reported within 24 hours</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Unlawful sexual or physical contact with a person with disability</p>
                      <p className="text-sm text-gray-500">Must be reported within 24 hours</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Unauthorized use of restrictive practice</p>
                      <p className="text-sm text-gray-500">Must be reported within 5 business days</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Incident Management Resources</CardTitle>
                <CardDescription>NDIS Commission guidelines and resources</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-avaana-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Incident Management System Template</p>
                      <button className="text-sm text-avaana-primary hover:underline">Download</button>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-avaana-primary mt-0.5" />
                    <div>
                      <p className="font-medium">NDIS Commission Reportable Incidents Guide</p>
                      <button className="text-sm text-avaana-primary hover:underline">Download</button>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-avaana-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Incident Investigation Form</p>
                      <button className="text-sm text-avaana-primary hover:underline">Download</button>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-avaana-primary mt-0.5" />
                    <div>
                      <p className="font-medium">5-Step Incident Resolution Procedure</p>
                      <button className="text-sm text-avaana-primary hover:underline">Download</button>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-avaana-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Staff Incident Management Training Materials</p>
                      <button className="text-sm text-avaana-primary hover:underline">Download</button>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Compliance To-Do List</CardTitle>
              <CardDescription>Critical compliance tasks requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {todoTasks.map((task) => (
                  <div key={task.id} className="flex items-start justify-between border-b pb-4">
                    <div className="flex gap-3 items-start">
                      <ClipboardList className="h-5 w-5 text-avaana-primary mt-1" />
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={priorityColors[task.priority]}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                          </Badge>
                          <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Category: {task.category}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-800">
                        Details
                      </button>
                      <button className="px-3 py-1 bg-avaana-primary hover:bg-avaana-secondary rounded-md text-sm text-white">
                        Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Compliance Resources</CardTitle>
              <CardDescription>NDIS Practice Standards and guidance materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileText className="h-5 w-5 text-avaana-primary mr-2" />
                    NDIS Practice Standards
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Core standards and requirements for NDIS providers</p>
                  <button className="text-avaana-primary text-sm hover:underline">View Resource</button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileText className="h-5 w-5 text-avaana-primary mr-2" />
                    Worker Screening Requirements
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Guidelines for staff screening and verification</p>
                  <button className="text-avaana-primary text-sm hover:underline">View Resource</button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileText className="h-5 w-5 text-avaana-primary mr-2" />
                    Complaints Management
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Procedures for handling participant complaints</p>
                  <button className="text-avaana-primary text-sm hover:underline">View Resource</button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileText className="h-5 w-5 text-avaana-primary mr-2" />
                    Risk Management Framework
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Templates and guidelines for risk assessment</p>
                  <button className="text-avaana-primary text-sm hover:underline">View Resource</button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileText className="h-5 w-5 text-avaana-primary mr-2" />
                    Quality Management System
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Continuous improvement documentation</p>
                  <button className="text-avaana-primary text-sm hover:underline">View Resource</button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileText className="h-5 w-5 text-avaana-primary mr-2" />
                    Audit Preparation Toolkit
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Checklists for certification preparation</p>
                  <button className="text-avaana-primary text-sm hover:underline">View Resource</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Compliance;

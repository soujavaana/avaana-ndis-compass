
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Clock, FileText, Info, Search } from 'lucide-react';

const AuditCenter = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Audit Center</h1>
          <div>
            <Button className="bg-blue-600 hover:bg-blue-700">+ New Audit</Button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4 bg-gray-100 p-1 rounded-md">
              <TabsTrigger 
                value="upcoming" 
                className="px-4 py-2"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Upcoming Audits</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="inprogress" 
                className="px-4 py-2"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="px-4 py-2"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger 
                value="auditedit" 
                className="px-4 py-2"
              >
                Audit Edit
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="mb-6 flex items-center gap-2 justify-between">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <input
                    type="search"
                    placeholder="Search audits"
                    className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-[300px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="bg-white flex gap-2 items-center">
                    <Clock size={16} />
                    <span>Date</span>
                  </Button>
                  <Button variant="outline" className="bg-white">Filter</Button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-6 bg-gray-50 py-3 px-4 border-b">
                  <div className="font-medium">Audit Name</div>
                  <div className="font-medium">Framework</div>
                  <div className="font-medium">Type</div>
                  <div className="font-medium">Start Date</div>
                  <div className="font-medium">End Date</div>
                  <div className="font-medium">Status</div>
                </div>
                
                {[
                  {
                    name: "NDIS Practice Audit",
                    framework: "NDIS Practice Standards",
                    type: "External",
                    startDate: "Jul 15, 2025",
                    endDate: "Jul 30, 2025",
                    status: "Scheduled"
                  },
                  {
                    name: "Quality of Service Review",
                    framework: "ISO 9001",
                    type: "Internal",
                    startDate: "Aug 5, 2025",
                    endDate: "Aug 15, 2025",
                    status: "Not Started"
                  },
                  {
                    name: "Information Security",
                    framework: "ISO 27001",
                    type: "External",
                    startDate: "Sep 12, 2025",
                    endDate: "Sep 25, 2025",
                    status: "Scheduled"
                  }
                ].map((audit, i) => (
                  <div key={i} className="grid grid-cols-6 py-4 px-4 border-b hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium">{audit.name}</div>
                    <div>{audit.framework}</div>
                    <div>{audit.type}</div>
                    <div>{audit.startDate}</div>
                    <div>{audit.endDate}</div>
                    <div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {audit.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="inprogress">
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Info size={48} className="mx-auto mb-2 text-gray-400" />
                  <h3 className="text-lg font-medium mb-1">No audits in progress</h3>
                  <p className="text-gray-500">When you have audits in progress, they'll appear here.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-6 bg-gray-50 py-3 px-4 border-b">
                  <div className="font-medium">Audit Name</div>
                  <div className="font-medium">Framework</div>
                  <div className="font-medium">Type</div>
                  <div className="font-medium">Completed Date</div>
                  <div className="font-medium">Result</div>
                  <div className="font-medium">Report</div>
                </div>
                
                {[
                  {
                    name: "NDIS Compliance",
                    framework: "NDIS Practice Standards",
                    type: "External",
                    completedDate: "May 10, 2025",
                    result: "Passed"
                  },
                  {
                    name: "Quality Management",
                    framework: "ISO 9001",
                    type: "Internal",
                    completedDate: "Apr 15, 2025",
                    result: "Passed with Findings"
                  }
                ].map((audit, i) => (
                  <div key={i} className="grid grid-cols-6 py-4 px-4 border-b hover:bg-gray-50">
                    <div className="font-medium">{audit.name}</div>
                    <div>{audit.framework}</div>
                    <div>{audit.type}</div>
                    <div>{audit.completedDate}</div>
                    <div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        audit.result === 'Passed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {audit.result}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <FileText size={14} />
                        <span>View</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="auditedit">
              <div className="text-center py-12">
                <CheckCircle size={48} className="mx-auto mb-2 text-gray-400" />
                <h3 className="text-lg font-medium">Select an audit to edit</h3>
                <p className="text-gray-500">Choose an audit from the tabs above to make changes.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AuditCenter;

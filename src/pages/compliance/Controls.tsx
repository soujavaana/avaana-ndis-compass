
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Controls = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Controls</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-white">Filter</Button>
            <Button variant="outline" className="bg-white">Sort</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">+ New Control</Button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="mb-4">
            <Input placeholder="Search controls..." className="max-w-md" />
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger 
                value="all" 
                className="px-4 py-2 text-gray-600"
              >
                All Controls
              </TabsTrigger>
              <TabsTrigger 
                value="implemented" 
                className="px-4 py-2 text-gray-600"
              >
                Implemented
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="border rounded-md">
                <div className="grid grid-cols-7 bg-gray-50 py-2 px-4 border-b">
                  <div className="font-medium">Control ID</div>
                  <div className="font-medium">Name</div>
                  <div className="font-medium col-span-2">Description</div>
                  <div className="font-medium">Framework</div>
                  <div className="font-medium">Status</div>
                  <div className="font-medium">Actions</div>
                </div>
                
                {[
                  {
                    id: "C-001",
                    name: "Password Policy",
                    description: "Ensure password complexity requirements are enforced",
                    framework: "NDIS",
                    status: "Implemented" 
                  },
                  {
                    id: "C-002",
                    name: "Access Control",
                    description: "Implement role-based access control for all systems",
                    framework: "ISO 27001",
                    status: "Implemented"
                  },
                  {
                    id: "C-003",
                    name: "Data Backup",
                    description: "Regular automated backups of all critical data",
                    framework: "NDIS",
                    status: "Not Implemented"
                  },
                  {
                    id: "C-004",
                    name: "Incident Response",
                    description: "Documented procedure for security incidents",
                    framework: "ISO 27001",
                    status: "Partially Implemented"
                  }
                ].map((control, i) => (
                  <div key={i} className="grid grid-cols-7 py-3 px-4 border-b hover:bg-gray-50">
                    <div className="text-gray-600">{control.id}</div>
                    <div className="font-medium">{control.name}</div>
                    <div className="col-span-2 text-sm">{control.description}</div>
                    <div>{control.framework}</div>
                    <div>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        control.status === 'Implemented' ? 'bg-green-100 text-green-800' :
                        control.status === 'Not Implemented' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {control.status}
                      </span>
                    </div>
                    <div>
                      <Button variant="link" className="p-0 h-auto">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="implemented">
              <p className="text-gray-500">Showing implemented controls only.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Controls;

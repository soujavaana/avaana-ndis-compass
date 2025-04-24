
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const Policies = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Policy Management</h1>
          <div>
            <Button className="bg-blue-600 hover:bg-blue-700">+ Create Policy</Button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="mb-6 flex flex-wrap justify-between items-center">
            <Input className="max-w-md" placeholder="Search policies..." />
            <div className="flex items-center gap-2 mt-3 md:mt-0">
              <Button variant="outline" className="bg-white">
                All Categories <span className="ml-1">▼</span>
              </Button>
              <Button variant="outline" className="bg-white">
                Status <span className="ml-1">▼</span>
              </Button>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" className="bg-white rounded-md">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2H13V13H2V2Z" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="bg-white rounded-md">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2H13V3H2V2ZM2 7H13V8H2V7ZM2 12H13V13H2V12Z" fill="currentColor" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger 
                value="all" 
                className="px-4 py-2 text-gray-600"
              >
                All Policies
              </TabsTrigger>
              <TabsTrigger 
                value="published" 
                className="px-4 py-2 text-gray-600"
              >
                Published
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Information Security Policy",
                    lastUpdated: "June 15, 2025",
                    status: "Published",
                    category: "Security",
                    version: "v2.3"
                  },
                  {
                    name: "Client Privacy Policy",
                    lastUpdated: "May 20, 2025",
                    status: "Published",
                    category: "Privacy",
                    version: "v1.2"
                  },
                  {
                    name: "Access Control Policy",
                    lastUpdated: "June 1, 2025",
                    status: "Draft",
                    category: "Security",
                    version: "v3.0"
                  },
                  {
                    name: "Data Retention Policy",
                    lastUpdated: "April 12, 2025",
                    status: "Published",
                    category: "Data Management",
                    version: "v1.5"
                  },
                  {
                    name: "Incident Response Policy",
                    lastUpdated: "June 5, 2025",
                    status: "In Review",
                    category: "Security",
                    version: "v2.1"
                  },
                  {
                    name: "Acceptable Use Policy",
                    lastUpdated: "May 30, 2025",
                    status: "Published",
                    category: "HR",
                    version: "v2.0"
                  }
                ].map((policy, i) => (
                  <Card key={i} className="p-5 hover:shadow-md transition-shadow border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-base">{policy.name}</h3>
                          <p className="text-gray-500 text-xs">Updated {policy.lastUpdated}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 4C8.83 4 9.5 3.33 9.5 2.5C9.5 1.67 8.83 1 8 1C7.17 1 6.5 1.67 6.5 2.5C6.5 3.33 7.17 4 8 4Z" fill="currentColor" />
                          <path d="M8 9.5C8.83 9.5 9.5 8.83 9.5 8C9.5 7.17 8.83 6.5 8 6.5C7.17 6.5 6.5 7.17 6.5 8C6.5 8.83 7.17 9.5 8 9.5Z" fill="currentColor" />
                          <path d="M8 15C8.83 15 9.5 14.33 9.5 13.5C9.5 12.67 8.83 12 8 12C7.17 12 6.5 12.67 6.5 13.5C6.5 14.33 7.17 15 8 15Z" fill="currentColor" />
                        </svg>
                      </Button>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          policy.status === 'Published' ? 'bg-green-100 text-green-800' :
                          policy.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {policy.status}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">{policy.version}</span>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="published">
              <p className="text-gray-500">Showing published policies only.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Policies;

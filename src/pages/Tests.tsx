
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const Tests = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Tests</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-white">Status</Button>
            <Button variant="outline" className="bg-white">Filter</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">+ New Test</Button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <Tabs defaultValue="run-tests" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger 
                value="run-tests" 
                className="px-4 py-2 text-gray-600"
              >
                Run Tests
              </TabsTrigger>
              <TabsTrigger 
                value="past-runs" 
                className="px-4 py-2 text-gray-600"
              >
                Past Runs
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="run-tests">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Password Policy",
                    description: "Verifies that your password policy meets industry standards",
                    status: "Passed"
                  },
                  {
                    title: "MFA Setting",
                    description: "Checks if MFA is enabled for all user accounts",
                    status: "Passed"
                  },
                  {
                    title: "Admin Access",
                    description: "Reviews admin access permissions across your organization",
                    status: "Failed"
                  }
                ].map((test, i) => (
                  <Card key={i} className="p-4 hover:shadow-md transition-shadow border border-gray-200">
                    <h3 className="font-medium text-lg">{test.title}</h3>
                    <p className="text-gray-500 text-sm mt-2 mb-4">{test.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        test.status === 'Passed' ? 'bg-green-100 text-green-800' :
                        test.status === 'Failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {test.status}
                      </span>
                      <Button variant="ghost" size="sm">Run Test</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past-runs">
              <div className="mb-4">
                <Input placeholder="Search tests" className="max-w-sm" />
              </div>
              
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger
                    value="all"
                    className="px-3 py-1 text-sm"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="passed"
                    className="px-3 py-1 text-sm"
                  >
                    Passed
                  </TabsTrigger>
                  <TabsTrigger
                    value="failed"
                    className="px-3 py-1 text-sm"
                  >
                    Failed
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="px-3 py-1 text-sm"
                  >
                    Pending
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <div className="border rounded-md">
                    <div className="grid grid-cols-4 bg-gray-50 py-2 px-4 border-b">
                      <div className="font-medium">Test Name</div>
                      <div className="font-medium">Date Run</div>
                      <div className="font-medium">Status</div>
                      <div className="font-medium">Actions</div>
                    </div>
                    
                    {[
                      {
                        name: "Password Policy",
                        date: "Jun 10, 2025",
                        status: "Passed" 
                      },
                      {
                        name: "MFA Setting",
                        date: "Jun 8, 2025",
                        status: "Passed"
                      },
                      {
                        name: "Admin Access",
                        date: "Jun 7, 2025",
                        status: "Failed"
                      }
                    ].map((item, i) => (
                      <div key={i} className="grid grid-cols-4 py-3 px-4 border-b items-center">
                        <div>{item.name}</div>
                        <div className="text-gray-600">{item.date}</div>
                        <div>
                          <span className={`text-sm font-medium px-2 py-1 rounded ${
                            item.status === 'Passed' ? 'bg-green-100 text-green-800' :
                            item.status === 'Failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div>
                          <Button variant="link" className="p-0 h-auto">View Results</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="passed">
                  <p className="text-gray-500">Showing passed tests only.</p>
                </TabsContent>
                
                <TabsContent value="failed">
                  <p className="text-gray-500">Showing failed tests only.</p>
                </TabsContent>
                
                <TabsContent value="pending">
                  <p className="text-gray-500">Showing pending tests only.</p>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Tests;

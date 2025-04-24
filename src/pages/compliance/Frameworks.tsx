
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Frameworks = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Compliance Frameworks</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">+ Add Framework</Button>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger 
                value="active" 
                className="px-4 py-2 text-gray-600"
              >
                Active Frameworks
              </TabsTrigger>
              <TabsTrigger 
                value="archived" 
                className="px-4 py-2 text-gray-600"
              >
                Archived
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "NDIS Practice Standards",
                    description: "Core compliance framework for NDIS providers",
                    totalControls: 54,
                    implemented: 48,
                    progress: 89
                  },
                  {
                    name: "ISO 27001",
                    description: "Information security management standards",
                    totalControls: 114,
                    implemented: 92,
                    progress: 81
                  },
                  {
                    name: "ISO 9001",
                    description: "Quality management system requirements",
                    totalControls: 82,
                    implemented: 76,
                    progress: 93
                  },
                  {
                    name: "Aged Care Quality Standards",
                    description: "Standards for aged care service providers",
                    totalControls: 42,
                    implemented: 39,
                    progress: 93
                  },
                  {
                    name: "HIPAA",
                    description: "Health Insurance Portability and Accountability Act",
                    totalControls: 68,
                    implemented: 52,
                    progress: 76
                  }
                ].map((framework, i) => (
                  <Card key={i} className="p-6 hover:shadow-md transition-shadow border border-gray-200">
                    <h3 className="font-bold text-lg">{framework.name}</h3>
                    <p className="text-gray-500 text-sm mt-2 mb-4">{framework.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Implementation Progress</span>
                      <span className="font-medium">{framework.progress}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${framework.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-gray-600">Controls: </span>
                        <span className="font-medium">{framework.implemented}/{framework.totalControls}</span>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="archived">
              <div className="text-center py-12 text-gray-500">
                <p>No archived frameworks found.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Frameworks;

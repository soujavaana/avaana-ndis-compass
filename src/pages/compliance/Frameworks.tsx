
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Frameworks = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Frameworks</h1>
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm">1</span>
            </div>
            <Button className="bg-violet-600 hover:bg-violet-700">
              <span className="mr-1">+</span> Create Framework
            </Button>
          </div>
          
          <div className="mb-6">
            <TabsList className="bg-white shadow-sm w-auto">
              <TabsTrigger className="bg-black text-white hover:bg-black/90">My Frameworks</TabsTrigger>
              <TabsTrigger className="text-black hover:bg-gray-100">Frameworks Library</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
            <Input className="bg-white max-w-xs" placeholder="Search by name" />
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Sort by: Highest Compliance</span>
              <span>▼</span>
              <div className="flex gap-1 ml-2">
                <Button variant="outline" size="icon" className="bg-white">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2H13V13H2V2Z" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="bg-white">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2H13V3H2V2ZM2 7H13V8H2V7ZM2 12H13V13H2V12Z" fill="currentColor" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center h-8 w-8 bg-black text-white text-xs rounded-full font-bold">
                  ISO
                </div>
                <h3 className="ml-2 font-medium">ISO 27001:2022</h3>
              </div>
              
              <div className="flex justify-center mb-8">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0">
                    <svg viewBox="0 0 120 120" className="transform -rotate-90">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12" />
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="#f87171"
                        strokeWidth="12"
                        strokeDasharray="339.3"
                        strokeDashoffset="293"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold">13.5%</span>
                    <span className="text-sm text-gray-600">Compliant</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <div className="relative w-16 h-16 mr-4">
                    <svg viewBox="0 0 120 120" className="transform -rotate-90">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12" />
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="#f87171"
                        strokeWidth="12"
                        strokeDasharray="339.3"
                        strokeDashoffset="262"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">22.8%</div>
                    <div className="text-sm text-gray-600">Policies</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="relative w-16 h-16 mr-4">
                    <svg viewBox="0 0 120 120" className="transform -rotate-90">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12" />
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="#e6e6e6"
                        strokeWidth="12"
                        strokeDasharray="339.3"
                        strokeDashoffset="339.3"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">0%</div>
                    <div className="text-sm text-gray-600">Evidence Tasks</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="relative w-16 h-16 mr-4">
                    <svg viewBox="0 0 120 120" className="transform -rotate-90">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12" />
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="12"
                        strokeDasharray="339.3"
                        strokeDashoffset="118"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">65.3%</div>
                    <div className="text-sm text-gray-600">Automated Tests</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Help Button */}
        <div className="fixed bottom-6 right-6">
          <Button className="bg-blue-900 hover:bg-blue-800 text-white rounded-full h-10 w-10 flex items-center justify-center p-0">
            <span className="text-lg">?</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Frameworks;

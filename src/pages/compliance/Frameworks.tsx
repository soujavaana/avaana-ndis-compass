
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, LayoutGrid, LayoutList } from 'lucide-react';
import ComplianceChart from '@/components/frameworks/ComplianceChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Frameworks = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Frameworks</h1>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">1</span>
          </div>
          <Button className="bg-[#F1490D] hover:bg-[#EA580C]">
            + Create Framework
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <Tabs defaultValue="my-frameworks" className="w-full">
            <div className="px-4 pt-4">
              <TabsList className="mb-4">
                <TabsTrigger value="my-frameworks" className="px-4 py-2">
                  My Frameworks
                </TabsTrigger>
                <TabsTrigger value="library" className="px-4 py-2">
                  Frameworks Library
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="my-frameworks">
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Search by name" 
                      className="pl-9"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select>
                      <SelectTrigger className="w-[200px] bg-white border border-gray-300">
                        <SelectValue placeholder="Sort by: Highest Compliance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="highest">Sort by: Highest Compliance</SelectItem>
                        <SelectItem value="lowest">Sort by: Lowest Compliance</SelectItem>
                        <SelectItem value="name">Sort by: Name</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex border rounded-md">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className={viewMode === 'grid' ? 'bg-gray-100' : ''}
                        onClick={() => setViewMode('grid')}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className={viewMode === 'list' ? 'bg-gray-100' : ''}
                        onClick={() => setViewMode('list')}
                      >
                        <LayoutList className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-black text-white text-xs px-2 py-1 rounded">ISO</div>
                    <h3 className="text-lg font-semibold">ISO 27001:2022</h3>
                  </div>
                  <ComplianceChart 
                    totalCompliance={13.5}
                    metrics={{
                      policies: 22.8,
                      evidenceTasks: 0,
                      automatedTests: 65.3
                    }}
                  />
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="library">
              <div className="p-8 text-center text-gray-500">
                <p>Browse available frameworks from our library</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Frameworks;

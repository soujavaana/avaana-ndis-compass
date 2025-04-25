import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import ControlStats from '@/components/controls/ControlStats';
import ControlsChart from '@/components/controls/ControlsChart';
import { Search, ChevronDown } from 'lucide-react';

interface ControlItem {
  name: string;
  code: string;
  status: string;
  domain: string;
  assignee?: string;
}

const controls: ControlItem[] = [
  {
    name: 'Vulnerability & Patch Management Program (VPMP)',
    code: 'VPM-01',
    status: 'Non Compliant',
    domain: 'Vulnerability and Patch Management'
  },
  {
    name: 'Threat Intelligence Program',
    code: 'THR-01',
    status: 'Non Compliant',
    domain: 'Threat Management'
  },
  {
    name: 'Managing Changes To Third-Party Services',
    code: 'TPM-10',
    status: 'Compliant',
    domain: 'Third-Party Management',
    assignee: 'John Doe'
  },
  {
    name: 'Information Security Policy',
    code: 'ISP-01',
    status: 'Compliant',
    domain: 'Information Security',
    assignee: 'Sarah Smith'
  },
  {
    name: 'Access Control Management',
    code: 'ACM-01',
    status: 'Non Compliant',
    domain: 'Access Control',
    assignee: 'Mike Johnson'
  },
  {
    name: 'Data Encryption Standards',
    code: 'DES-01',
    status: 'Compliant',
    domain: 'Data Security',
    assignee: 'Emma Wilson'
  },
  {
    name: 'Incident Response Plan',
    code: 'IRP-01',
    status: 'Compliant',
    domain: 'Incident Management',
    assignee: 'Alex Brown'
  },
  {
    name: 'Business Continuity Plan',
    code: 'BCP-01',
    status: 'Non Compliant',
    domain: 'Business Continuity',
    assignee: 'Tom Davis'
  },
  {
    name: 'Network Security Controls',
    code: 'NSC-01',
    status: 'Compliant',
    domain: 'Network Security',
    assignee: 'Lisa Chen'
  },
  {
    name: 'Cloud Security Configuration',
    code: 'CSC-01',
    status: 'Non Compliant',
    domain: 'Cloud Security',
    assignee: 'David Kim'
  }
];

const Controls = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Controls</h1>
            <span className="px-2 py-1 text-sm bg-gray-100 rounded">209</span>
          </div>
          <Button className="bg-[#F1490D] hover:bg-[#EA580C]">
            + Create Control
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="dashboard" 
              className="px-4 py-2 rounded-md data-[state=active]:bg-transparent data-[state=active]:text-black"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              className="px-4 py-2 rounded-md data-[state=active]:bg-transparent data-[state=active]:text-black"
            >
              All Controls
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <ControlStats />
            
            <div className="grid md:grid-cols-2 gap-6">
              <ControlsChart />
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">By Framework</h3>
                  <Button variant="ghost" className="text-sm">
                    Highest <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                {/* Framework progress bars would go here */}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="all">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search by control code, name" 
                    className="pl-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {['Assignee', 'Framework', 'Entities', 'Domain', 'Function Grouping', 'Control Scope'].map((filter) => (
                    <Button key={filter} variant="outline" className="text-sm">
                      {filter} <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30px]"></TableHead>
                    <TableHead>Control Name</TableHead>
                    <TableHead>Control Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Control Domain</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {controls.map((control) => (
                    <TableRow key={control.code}>
                      <TableCell>
                        <input type="checkbox" className="rounded border-gray-300" />
                      </TableCell>
                      <TableCell className="font-medium">{control.name}</TableCell>
                      <TableCell>{control.code}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          control.status === 'Compliant' 
                            ? 'bg-green-50 text-green-600' 
                            : 'bg-red-50 text-red-600'
                        }`}>
                          {control.status}
                        </span>
                      </TableCell>
                      <TableCell>{control.assignee || '—'}</TableCell>
                      <TableCell>{control.domain}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Controls;

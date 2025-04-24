
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext } from '@/components/ui/pagination';
import { InfoIcon, ArrowUpDown } from 'lucide-react';

const Tests = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <h1 className="text-2xl font-bold">Tests</h1>
            <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm">197</span>
          </div>
          
          <div className="mb-6">
            <TabsList className="bg-white shadow-sm w-auto">
              <TabsTrigger className="bg-black text-white hover:bg-black/90 data-[state=active]:bg-black">All Tests</TabsTrigger>
              <TabsTrigger className="text-black hover:bg-gray-100">Test Library</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* OK Tests */}
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-emerald-500 font-medium mr-2">OK</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <div className="flex items-baseline">
                <h2 className="text-4xl font-bold">89</h2>
                <span className="ml-1 text-gray-600">/197</span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '45.1%' }}></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">45.1% done</div>
              </div>
            </div>
            
            {/* Needs Attention */}
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-red-500 font-medium mr-2">Needs Attention</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">108</h2>
            </div>
            
            {/* Ignored */}
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-gray-500 font-medium mr-2">Ignored</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">1</h2>
            </div>
          </div>
          
          <div className="mb-6">
            <TabsList className="bg-white shadow-sm w-auto">
              <TabsTrigger className="text-violet-800 data-[state=active]:text-violet-800 data-[state=active]:border-b-2 data-[state=active]:border-violet-800 rounded-none">All</TabsTrigger>
              <TabsTrigger className="text-gray-600">Automated Tests</TabsTrigger>
              <TabsTrigger className="text-gray-600">Policy</TabsTrigger>
              <TabsTrigger className="text-gray-600">Evidence</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <Input className="bg-white" placeholder="Search by name" />
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="bg-white flex gap-2">
                Application <span className="ml-1">▼</span>
              </Button>
              <Button variant="outline" className="bg-white flex gap-2">
                Assignee <span className="ml-1">▼</span>
              </Button>
              <Button variant="outline" className="bg-white flex gap-2">
                Framework <span className="ml-1">▼</span>
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border border-gray-300"></div>
                <span className="text-sm">Show Unmapped Tests</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableHead>
                  <TableHead>
                    TestName <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Status <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Type <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Applications <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Assignees <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Framework <ArrowUpDown size={14} />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "Security & Privacy Awareness Training Report",
                    status: "Needs Attention",
                    type: "Evidence",
                    app: "Scrut",
                    assignee: "M",
                    framework: "ISO 27001:2022"
                  },
                  {
                    name: "Contact with Special Interest Groups and Authorities",
                    status: "Needs Attention",
                    type: "Evidence",
                    app: "Scrut",
                    assignee: "-",
                    framework: "ISO 27001:2022"
                  },
                  {
                    name: "Risk Register",
                    status: "Needs Attention",
                    type: "Evidence",
                    app: "Scrut",
                    assignee: "-",
                    framework: "ISO 27001:2022"
                  },
                  {
                    name: "Onboarding - Date of Joining/Date of Hire - Evidence can be from HRMS screenshot (Tool/Email)",
                    status: "Needs Attention",
                    type: "Evidence",
                    app: "Scrut",
                    assignee: "-",
                    framework: "ISO 27001:2022"
                  },
                  {
                    name: "Production Servers within the Private Subnet",
                    status: "Needs Attention",
                    type: "Evidence",
                    app: "Scrut",
                    assignee: "-",
                    framework: "ISO 27001:2022"
                  },
                  {
                    name: "Anti-virus dashboard and regular updates",
                    status: "Needs Attention",
                    type: "Evidence",
                    app: "Scrut",
                    assignee: "-",
                    framework: "ISO 27001:2022"
                  },
                  {
                    name: "Records for HR Exit Forms for all terminated users (employees and sub-contractors) with the employee...",
                    status: "Needs Attention",
                    type: "Evidence",
                    app: "Scrut",
                    assignee: "-",
                    framework: "ISO 27001:2022"
                  },
                  {
                    name: "Fire Extinguisher with Signage",
                    status: "Needs Attention",
                    type: "Evidence",
                    app: "Scrut",
                    assignee: "-",
                    framework: "ISO 27001:2022"
                  },
                  {
                    name: "Code Requirements, Design Docs, Test plans/result, Approval, Release Notes",
                    status: "Needs Attention",
                    type: "Evidence",
                    app: "Scrut",
                    assignee: "-",
                    framework: "ISO 27001:2022"
                  },
                  {
                    name: "Review of Vendor Audit Reports",
                    status: "Needs Attention",
                    type: "Evidence",
                    app: "Scrut",
                    assignee: "-",
                    framework: "ISO 27001:2022"
                  }
                ].map((test, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell>{test.name}</TableCell>
                    <TableCell>
                      <span className="bg-red-100 text-red-500 rounded px-2 py-1 text-xs">
                        {test.status}
                      </span>
                    </TableCell>
                    <TableCell>{test.type}</TableCell>
                    <TableCell>{test.app}</TableCell>
                    <TableCell>
                      {test.assignee !== "-" ? (
                        <div className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center">
                          {test.assignee}
                        </div>
                      ) : test.assignee}
                    </TableCell>
                    <TableCell>{test.framework}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="p-4 border-t border-gray-200">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink className="bg-black text-white">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext />
                  </PaginationItem>
                  <PaginationItem className="ml-2 text-sm text-gray-500">
                    1-10/198
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
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

export default Tests;

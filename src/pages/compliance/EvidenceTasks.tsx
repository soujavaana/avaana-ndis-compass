
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext } from '@/components/ui/pagination';
import { InfoIcon, ArrowUpDown, Search } from 'lucide-react';

const EvidenceTasks = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Evidence Tasks</h1>
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm">38</span>
            </div>
            <Button className="bg-violet-600 hover:bg-violet-700">
              <span className="mr-1">+</span> Create New Evidence
            </Button>
          </div>
          
          <div className="mb-6">
            <TabsList className="bg-white shadow-sm w-auto">
              <TabsTrigger className="text-black hover:bg-gray-100">Dashboard</TabsTrigger>
              <TabsTrigger className="bg-black text-white hover:bg-black/90">All Evidences</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mb-6 flex flex-wrap gap-2">
            <Button variant="outline" className="bg-white">
              Assignee <span className="ml-1">▼</span>
            </Button>
            <Button variant="outline" className="bg-white">
              Department <span className="ml-1">▼</span>
            </Button>
            <Button variant="outline" className="bg-white">
              Framework <span className="ml-1">▼</span>
            </Button>
            <Button variant="outline" className="bg-white">
              Entities <span className="ml-1">▼</span>
            </Button>
            <Button variant="outline" className="bg-white flex items-center gap-1">
              Relevance <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span> <span>▼</span>
            </Button>
            <Button variant="outline" className="bg-white" size="icon">
              <Search size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-gray-500 font-medium mr-2">Not Uploaded</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">35</h2>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 font-medium mr-2">Draft</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">2</h2>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-red-500 font-medium mr-2">Needs Attention</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">1</h2>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-green-500 font-medium mr-2">Uploaded</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <div className="flex items-baseline">
                <h2 className="text-4xl font-bold">0</h2>
                <span className="ml-1 text-gray-600">/38</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6 flex flex-wrap justify-between items-center">
            <Input className="bg-white w-full md:w-auto max-w-md" placeholder="Search by name, entities or approver" />
            <div className="flex items-center gap-2 mt-3 md:mt-0">
              <Button variant="outline" className="bg-white">
                Filters
              </Button>
              <Button variant="outline" className="bg-white" size="icon">
                <Search size={16} />
              </Button>
              <Button variant="outline" className="bg-white flex items-center gap-1">
                Columns <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">4</span> <span>▼</span>
              </Button>
              <Button variant="outline" className="bg-white">
                Export
              </Button>
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
                    Evidence Name <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Status <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Assignee <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Department <ArrowUpDown size={14} />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "Screenshots of Backups",
                    status: "Not Uploaded",
                    assignee: "M",
                    department: "IT"
                  },
                  {
                    name: "Statement of Applicability",
                    status: "Draft",
                    assignee: "M",
                    department: "GOV"
                  },
                  {
                    name: "Security & Privacy Awareness Training Report",
                    status: "Not Uploaded",
                    assignee: "M",
                    department: "HR"
                  },
                  {
                    name: "Contact with Special interest Groups and Authorities",
                    status: "Not Uploaded",
                    assignee: "-",
                    department: "GOV"
                  },
                  {
                    name: "Risk Register",
                    status: "Not Uploaded",
                    assignee: "-",
                    department: "GOV"
                  },
                  {
                    name: "Onboarding - Date of Joining/Date of Hire - Evidence can be from HRMS screenshot (Tool/Email)",
                    status: "Not Uploaded",
                    assignee: "-",
                    department: "HR"
                  },
                  {
                    name: "Anti-virus dashboard and regular updates",
                    status: "Not Uploaded",
                    assignee: "-",
                    department: "IT"
                  },
                  {
                    name: "Records for HR Exit Forms for all terminated users (employees and sub-contractors) with the employee...",
                    status: "Not Uploaded",
                    assignee: "-",
                    department: "HR"
                  },
                  {
                    name: "Fire Extinguisher with Signage",
                    status: "Not Uploaded",
                    assignee: "-",
                    department: "ADMIN"
                  },
                  {
                    name: "Code Requirements, Design Docs, Test plans/result, Approval, Release Notes",
                    status: "Not Uploaded",
                    assignee: "-",
                    department: "IT"
                  }
                ].map((evidence, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell>{evidence.name}</TableCell>
                    <TableCell>
                      {evidence.status === "Draft" ? (
                        <span className="bg-yellow-100 text-yellow-600 rounded px-2 py-1 text-xs">
                          {evidence.status}
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 rounded px-2 py-1 text-xs">
                          {evidence.status}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {evidence.assignee !== "-" ? (
                        <div className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center">
                          {evidence.assignee}
                        </div>
                      ) : evidence.assignee}
                    </TableCell>
                    <TableCell>{evidence.department}</TableCell>
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
                    <PaginationNext />
                  </PaginationItem>
                  <PaginationItem className="ml-2 text-sm text-gray-500">
                    1-10/38
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

export default EvidenceTasks;

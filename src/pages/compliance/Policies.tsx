
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext } from '@/components/ui/pagination';
import { InfoIcon, ArrowUpDown, Search } from 'lucide-react';

const Policies = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Policies</h1>
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm">36</span>
            </div>
            <div className="flex gap-2">
              <Button className="bg-violet-600 hover:bg-violet-700">
                <span className="mr-1">+</span> New Policy
              </Button>
              <Button variant="outline" size="icon" className="bg-white">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 2C7.77614 2 8 2.22386 8 2.5V12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5V2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor" />
                  <path d="M2.5 7C2.22386 7 2 7.22386 2 7.5C2 7.77614 2.22386 8 2.5 8H12.5C12.7761 8 13 7.77614 13 7.5C13 7.22386 12.7761 7 12.5 7H2.5Z" fill="currentColor" />
                </svg>
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <TabsList className="bg-white shadow-sm w-auto">
              <TabsTrigger className="text-black hover:bg-gray-100">Dashboard</TabsTrigger>
              <TabsTrigger className="bg-black text-white hover:bg-black/90">All Policies</TabsTrigger>
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
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-gray-500 font-medium mr-2">Not Uploaded</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">0</h2>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 font-medium mr-2">Draft</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">27</h2>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-blue-400 font-medium mr-2">Approved</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">0</h2>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-red-500 font-medium mr-2">Needs Review</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">0</h2>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-green-500 font-medium mr-2">Published</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <div className="flex items-baseline">
                <h2 className="text-4xl font-bold">8</h2>
                <span className="ml-1 text-gray-600">/35</span>
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
                Columns <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">10</span> <span>▼</span>
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
                    Policy Name <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Status <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Assignee <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Approver <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Department <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Version Number <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Created By <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Created On <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Published By <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Published On <ArrowUpDown size={14} />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "Data Breach Response Plan",
                    status: "Published",
                    assignee: "-",
                    approver: "R",
                    department: "ADMIN",
                    version: "",
                    createdBy: "",
                    createdOn: "",
                    publishedBy: "",
                    publishedOn: ""
                  },
                  {
                    name: "ISMS Clause Requirements",
                    status: "Draft",
                    assignee: "M",
                    approver: "M R",
                    department: "IT",
                    version: "1.2",
                    createdBy: "M",
                    createdOn: "Jan 8, 2025",
                    publishedBy: "",
                    publishedOn: ""
                  },
                  {
                    name: "Data and Record Retention and Deletion Policy",
                    status: "Draft",
                    assignee: "M",
                    approver: "R",
                    department: "IT",
                    version: "1.2",
                    createdBy: "M",
                    createdOn: "Jan 9, 2025",
                    publishedBy: "",
                    publishedOn: ""
                  },
                  {
                    name: "Configuration Management Policy",
                    status: "Draft",
                    assignee: "M",
                    approver: "-",
                    department: "IT",
                    version: "1.0",
                    createdBy: "ST",
                    createdOn: "Nov 19, 2024",
                    publishedBy: "",
                    publishedOn: ""
                  },
                  {
                    name: "Cloud Security Policy",
                    status: "Draft",
                    assignee: "M",
                    approver: "R",
                    department: "IT",
                    version: "1.1",
                    createdBy: "M",
                    createdOn: "Jan 9, 2025",
                    publishedBy: "",
                    publishedOn: ""
                  },
                  {
                    name: "Data Privacy Policy",
                    status: "Published",
                    assignee: "M",
                    approver: "R",
                    department: "GOV",
                    version: "1.1",
                    createdBy: "M",
                    createdOn: "Jan 9, 2025",
                    publishedBy: "R",
                    publishedOn: "Apr 10, 2025"
                  },
                  {
                    name: "Threat Intelligence Policy",
                    status: "Draft",
                    assignee: "M",
                    approver: "R",
                    department: "IT",
                    version: "1.1",
                    createdBy: "M",
                    createdOn: "Jan 9, 2025",
                    publishedBy: "",
                    publishedOn: ""
                  },
                  {
                    name: "Information Security (IS) Policy",
                    status: "Published",
                    assignee: "M",
                    approver: "R",
                    department: "GOV",
                    version: "v1",
                    createdBy: "ST",
                    createdOn: "Feb 3, 2025",
                    publishedBy: "R",
                    publishedOn: "Apr 10, 2025"
                  },
                  {
                    name: "Asset Management and Media Handling Procedure",
                    status: "Draft",
                    assignee: "M",
                    approver: "R",
                    department: "IT",
                    version: "1.1",
                    createdBy: "M",
                    createdOn: "Jan 9, 2025",
                    publishedBy: "",
                    publishedOn: ""
                  },
                  {
                    name: "Secure Development and Maintenance Policy",
                    status: "Draft",
                    assignee: "M",
                    approver: "R",
                    department: "IT",
                    version: "1.1",
                    createdBy: "M",
                    createdOn: "Jan 9, 2025",
                    publishedBy: "",
                    publishedOn: ""
                  }
                ].map((policy, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell>{policy.name}</TableCell>
                    <TableCell>
                      {policy.status === "Published" ? (
                        <span className="bg-green-100 text-green-600 rounded px-2 py-1 text-xs">
                          {policy.status}
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-600 rounded px-2 py-1 text-xs">
                          {policy.status}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {policy.assignee !== "-" ? (
                        <div className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center">
                          {policy.assignee}
                        </div>
                      ) : policy.assignee}
                    </TableCell>
                    <TableCell>
                      {policy.approver !== "-" ? (
                        <div className="bg-violet-100 text-violet-700 rounded-full w-6 h-6 flex items-center justify-center">
                          {policy.approver[0]}
                        </div>
                      ) : policy.approver}
                    </TableCell>
                    <TableCell>{policy.department}</TableCell>
                    <TableCell>{policy.version}</TableCell>
                    <TableCell>
                      {policy.createdBy && (
                        <div className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center">
                          {policy.createdBy}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{policy.createdOn}</TableCell>
                    <TableCell>
                      {policy.publishedBy && (
                        <div className="bg-violet-100 text-violet-700 rounded-full w-6 h-6 flex items-center justify-center">
                          {policy.publishedBy}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{policy.publishedOn}</TableCell>
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
                    1-10/36
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

export default Policies;

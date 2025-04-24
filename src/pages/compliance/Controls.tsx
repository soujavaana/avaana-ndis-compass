
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext } from '@/components/ui/pagination';
import { InfoIcon, ArrowUpDown, Search } from 'lucide-react';

const Controls = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Controls</h1>
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm">209</span>
            </div>
            <Button className="bg-violet-600 hover:bg-violet-700">
              <span className="mr-1">+</span> Create Control
            </Button>
          </div>
          
          <div className="mb-6">
            <TabsList className="bg-white shadow-sm w-auto">
              <TabsTrigger className="text-black hover:bg-gray-100">Dashboard</TabsTrigger>
              <TabsTrigger className="bg-black text-white hover:bg-black/90">All Controls</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mb-6 flex flex-wrap gap-2">
            <Button variant="outline" className="bg-white">
              Assignee <span className="ml-1">▼</span>
            </Button>
            <Button variant="outline" className="bg-white">
              Framework <span className="ml-1">▼</span>
            </Button>
            <Button variant="outline" className="bg-white">
              Entities <span className="ml-1">▼</span>
            </Button>
            <Button variant="outline" className="bg-white">
              Domain <span className="ml-1">▼</span>
            </Button>
            <Button variant="outline" className="bg-white">
              Function Grouping <span className="ml-1">▼</span>
            </Button>
            <Button variant="outline" className="bg-white flex items-center gap-1">
              Control Scope <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span> <span>▼</span>
            </Button>
            <Button variant="outline" className="bg-white" size="icon">
              <Search size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Compliant */}
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-emerald-500 font-medium mr-2">Compliant</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <div className="flex items-baseline">
                <h2 className="text-4xl font-bold">27</h2>
                <span className="ml-1 text-gray-600">/209</span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '12.9%' }}></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">12.9% done</div>
              </div>
            </div>
            
            {/* Non Compliant */}
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-red-500 font-medium mr-2">Non Compliant</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">172</h2>
            </div>
            
            {/* Not Applicable */}
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-gray-500 font-medium mr-2">Not Applicable</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">10</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Function Grouping */}
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h3 className="font-medium mb-4">Function Grouping</h3>
              <div className="flex justify-center">
                <div className="relative w-64 h-64">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="white" />
                    <circle cx="50" cy="50" r="30" fill="white" stroke="#7c3aed" strokeWidth="40" strokeDasharray="188.5" strokeDashoffset="84.825" />
                    <circle cx="50" cy="50" r="30" fill="white" stroke="#4f46e5" strokeWidth="40" strokeDasharray="188.5" strokeDashoffset="113.1" />
                    <circle cx="50" cy="50" r="30" fill="white" stroke="#f97316" strokeWidth="40" strokeDasharray="188.5" strokeDashoffset="160.225" />
                    <circle cx="50" cy="50" r="30" fill="white" stroke="#ef4444" strokeWidth="40" strokeDasharray="188.5" strokeDashoffset="179.075" />
                    <circle cx="50" cy="50" r="30" fill="white" stroke="#22c55e" strokeWidth="40" strokeDasharray="188.5" strokeDashoffset="185.15" />
                    <circle cx="50" cy="50" r="30" fill="white" stroke="#fbbf24" strokeWidth="40" strokeDasharray="188.5" strokeDashoffset="188.5" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-medium">Total</div>
                      <div className="text-2xl font-bold">209</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span className="text-xs">Govern</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Identify</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-violet-600"></div>
                  <span className="text-xs">Protect</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs">Detect</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Respond</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Recover</span>
                </div>
              </div>
            </div>
            
            {/* By Framework */}
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">By Framework</h3>
                <Button variant="outline" className="h-7 text-xs">
                  Highest <span className="ml-1">▼</span>
                </Button>
              </div>
              
              <div className="mt-20">
                <div className="mb-1">
                  <div className="text-xs">ISO 27001:20...</div>
                </div>
                <div className="flex h-8 rounded-md overflow-hidden">
                  <div className="bg-red-500 w-4/5"></div>
                  <div className="bg-green-500 w-1/6"></div>
                  <div className="bg-gray-300 w-1/12"></div>
                </div>
                <div className="flex justify-end mt-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-xs">Non Compliant</span>
                  </div>
                  <div className="flex items-center gap-1 mx-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs">Compliant</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <span className="text-xs">Not Applicable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6 flex flex-wrap justify-between items-center">
            <Input className="bg-white w-full md:w-auto max-w-md" placeholder="Search by control code, name" />
            <div className="flex items-center gap-2 mt-3 md:mt-0">
              <Button variant="outline" className="bg-white flex items-center gap-1">
                Columns <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">6</span> <span>▼</span>
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
                    Control Name <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Control Code <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Status <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Assignee <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Control Domain <ArrowUpDown size={14} />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "Vulnerability & Patch Management Program (VPMP)",
                    code: "VPM-01",
                    status: "Non Compliant",
                    assignee: "",
                    domain: "Vulnerability and Patch Management"
                  },
                  {
                    name: "Threat Intelligence Program",
                    code: "THR-01",
                    status: "Non Compliant",
                    assignee: "",
                    domain: "Threat Management"
                  },
                  {
                    name: "Managing Changes To Third-Party Services",
                    code: "TPM-10",
                    status: "Compliant",
                    assignee: "",
                    domain: "Third-Party Management"
                  },
                  {
                    name: "Vulnerability Remediation Process",
                    code: "VPM-02",
                    status: "Non Compliant",
                    assignee: "",
                    domain: "Vulnerability and Patch Management"
                  },
                  {
                    name: "Continuous Vulnerability Remediation Activities",
                    code: "VPM-04",
                    status: "Non Compliant",
                    assignee: "",
                    domain: "Vulnerability and Patch Management"
                  },
                  {
                    name: "Software & Firmware Patching",
                    code: "VPM-05",
                    status: "Non Compliant",
                    assignee: "",
                    domain: "Vulnerability and Patch Management"
                  },
                  {
                    name: "Attack Surface Scope",
                    code: "VPM-011",
                    status: "Non Compliant",
                    assignee: "",
                    domain: "Vulnerability and Patch Management"
                  },
                  {
                    name: "Role-Based Security & Privacy Training",
                    code: "SAT-03",
                    status: "Non Compliant",
                    assignee: "",
                    domain: "Security Awareness and Training"
                  },
                  {
                    name: "Secure Coding",
                    code: "TDA-06",
                    status: "Non Compliant",
                    assignee: "",
                    domain: "Technology Development and Acquisition"
                  },
                  {
                    name: "Development Methods, Techniques & Processes",
                    code: "TDA-02.3",
                    status: "Non Compliant",
                    assignee: "",
                    domain: "Technology Development and Acquisition"
                  }
                ].map((control, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell>{control.name}</TableCell>
                    <TableCell>{control.code}</TableCell>
                    <TableCell>
                      {control.status === "Compliant" ? (
                        <span className="bg-green-100 text-green-600 rounded px-2 py-1 text-xs">
                          {control.status}
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-500 rounded px-2 py-1 text-xs">
                          {control.status}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>{control.domain}</TableCell>
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
                    1-10/209
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

export default Controls;

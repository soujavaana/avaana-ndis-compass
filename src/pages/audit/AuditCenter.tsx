
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationNext } from '@/components/ui/pagination';
import { InfoIcon, ArrowUpDown, Edit, Trash2, Calendar } from 'lucide-react';

const AuditCenter = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Audit Center</h1>
            <div className="flex gap-2">
              <Button className="bg-violet-600 hover:bg-violet-700">
                <span className="mr-1">+</span> New Audit
                <span className="ml-1">▼</span>
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <TabsList className="bg-white shadow-sm w-auto">
              <TabsTrigger className="bg-black text-white hover:bg-black/90">
                <span className="flex items-center gap-1">
                  Audits <span className="bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                </span>
              </TabsTrigger>
              <TabsTrigger className="text-black hover:bg-gray-100">Requests</TabsTrigger>
              <TabsTrigger className="text-black hover:bg-gray-100">Findings</TabsTrigger>
              <TabsTrigger className="text-black hover:bg-gray-100">Corrective Actions</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 font-medium mr-2">In Progress</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">1</h2>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-green-500 font-medium mr-2">Completed</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">0</h2>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-blue-500 font-medium mr-2">Internal Audits</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">0</h2>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-blue-500 font-medium mr-2">External Audits</span>
                <InfoIcon size={16} className="text-gray-400" />
              </div>
              <h2 className="text-4xl font-bold">0</h2>
            </div>
          </div>
          
          <div className="mb-6 flex flex-wrap justify-between items-center">
            <Input className="bg-white w-full md:w-auto max-w-md" placeholder="Search by audit name" />
            <div className="flex items-center gap-2 mt-3 md:mt-0">
              <Button variant="outline" className="bg-white flex items-center">
                <Calendar size={16} className="mr-1" /> Audit Date
              </Button>
              <Button variant="outline" className="bg-white">
                Entities <span className="ml-1">▼</span>
              </Button>
              <Button variant="outline" className="bg-white">
                Created On <span className="ml-1">▼</span>
              </Button>
              <Button variant="outline" className="bg-white flex items-center gap-1">
                Columns <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">6</span> <span>▼</span>
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Audit Name <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Status <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Audit Type <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Audit Date <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Observation Period
                  </TableHead>
                  <TableHead>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Gap Assessment</TableCell>
                  <TableCell>
                    <span className="bg-yellow-100 text-yellow-600 rounded px-2 py-1 text-xs">
                      In Progress
                    </span>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>Nov 20, 2024</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100 h-8 w-8">
                      <Edit size={16} className="text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100 h-8 w-8">
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="p-4 border-t border-gray-200">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button className="bg-black text-white h-8 w-8 p-0 rounded-md">
                      1
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext className="h-8" />
                  </PaginationItem>
                  <PaginationItem className="ml-2 text-sm text-gray-500">
                    1-1/1
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

export default AuditCenter;

import React from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDown, Cog } from 'lucide-react';
const CorrectiveAction = () => {
  return <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-normal">Corrective Action Tracker</h1>
            <div className="flex gap-2">
              <Button className="bg-[#F1490D] hover:bg-[#EA580C]">
                <span className="mr-1">+</span> Add New
              </Button>
              <Button variant="outline" className="bg-white" size="icon">
                <span className="sr-only">Export</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V10" stroke="currentColor" />
                  <path d="M7.5 2V10M7.5 10L5 7.5M7.5 10L10 7.5" stroke="currentColor" />
                </svg>
              </Button>
              <Button variant="outline" className="bg-white" size="icon">
                <Cog size={16} />
              </Button>
            </div>
          </div>
          
          <div className="mb-6 flex flex-wrap justify-between items-center">
            <Input className="bg-white w-full md:w-auto max-w-md" placeholder="Search" />
            <div className="flex items-center gap-2 mt-3 md:mt-0">
              <Button variant="outline" className="bg-white">
                Status <span className="ml-1">▼</span>
              </Button>
              <Button variant="outline" className="bg-white">
                Assignee <span className="ml-1">▼</span>
              </Button>
              <Button variant="outline" className="bg-white">
                Filters
              </Button>
              <Button variant="outline" className="bg-white flex items-center gap-1">
                Columns <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">6</span> <span>▼</span>
              </Button>
              <Button variant="outline" className="bg-white" size="icon">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" />
                  <path d="M13 13L13.5 13.5" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Non Conformity Name <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Status <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Assignee <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Due date <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Criticality Rating <ArrowUpDown size={14} />
                  </TableHead>
                  <TableHead>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No available options
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        
        {/* Help Button */}
        <div className="fixed bottom-6 right-6">
          <Button className="bg-blue-900 hover:bg-blue-800 text-white rounded-full h-10 w-10 flex items-center justify-center p-0">
            <span className="text-lg">?</span>
          </Button>
        </div>
      </div>
    </Layout>;
};
export default CorrectiveAction;
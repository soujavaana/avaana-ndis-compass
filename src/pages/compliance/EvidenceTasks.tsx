import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, ArrowUpDown } from 'lucide-react';
import EvidenceStatsCard from '@/components/evidence/EvidenceStatsCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface EvidenceTask {
  id: string;
  name: string;
  status: 'Not Uploaded' | 'Draft' | 'Needs Attention' | 'Uploaded';
  assignee?: string;
  department: string;
}

const evidenceTasks: EvidenceTask[] = [
  {
    id: '1',
    name: 'Screenshots of Backups',
    status: 'Not Uploaded',
    assignee: 'M',
    department: 'IT'
  },
  {
    id: '2',
    name: 'Statement of Applicability',
    status: 'Draft',
    assignee: 'M',
    department: 'GOV'
  },
  {
    id: '3',
    name: 'Security & Privacy Awareness Training Report',
    status: 'Not Uploaded',
    assignee: 'M',
    department: 'HR'
  },
  // ... more tasks
];

const EvidenceTasks = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Evidence Tasks</h1>
            <span className="px-2 py-1 text-sm bg-gray-100 rounded">38</span>
          </div>
          <Button className="bg-[#F1490D] hover:bg-[#EA580C]">
            + Create New Evidence
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="all">All Evidences</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <EvidenceStatsCard title="Not Uploaded" count={35} variant="not-uploaded" />
              <EvidenceStatsCard title="Draft" count={2} variant="draft" />
              <EvidenceStatsCard title="Needs Attention" count={1} variant="needs-attention" />
              <EvidenceStatsCard title="Uploaded" count={0} total={38} variant="uploaded" />
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search by name, entities or approver"
                    className="pl-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {['Assignee', 'Department', 'Framework', 'Entities', 'Relevance'].map((filter) => (
                    <Select key={filter}>
                      <SelectTrigger className="min-w-[130px]">
                        <SelectValue placeholder={filter} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                  ))}
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30px]">
                      <Checkbox />
                    </TableHead>
                    <TableHead>
                      Evidence Name
                      <ArrowUpDown className="ml-1 h-4 w-4 inline" />
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Department</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evidenceTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.status === 'Not Uploaded' ? 'bg-gray-100 text-gray-600' :
                          task.status === 'Draft' ? 'bg-amber-50 text-amber-600' :
                          task.status === 'Needs Attention' ? 'bg-red-50 text-red-600' :
                          'bg-green-50 text-green-600'
                        }`}>
                          {task.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {task.assignee ? (
                          <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">
                            {task.assignee}
                          </span>
                        ) : '—'}
                      </TableCell>
                      <TableCell>{task.department}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="p-4 border-t">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EvidenceTasks;

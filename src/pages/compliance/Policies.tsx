import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Plus } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface Policy {
  name: string;
  status: 'Published' | 'Draft';
  assignee: string;
  approver: string;
  department: string;
  version: string;
  createdBy: string;
  createdOn: string;
  publishedBy?: string;
  publishedOn?: string;
}

const policies: Policy[] = [
  {
    name: "Data Breach Response Plan",
    status: "Published",
    assignee: "R",
    approver: "R",
    department: "ADMIN",
    version: "1.0",
    createdBy: "M",
    createdOn: "Jan 8, 2025",
    publishedBy: "R",
    publishedOn: "Apr 10, 2025"
  },
  {
    name: "ISMS Clause Requirements",
    status: "Draft",
    assignee: "M",
    approver: "R",
    department: "IT",
    version: "1.2",
    createdBy: "M",
    createdOn: "Jan 8, 2025"
  },
  // ... more policies
];

const Policies = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Policies</h1>
            <Badge variant="secondary" className="bg-gray-100">36</Badge>
          </div>
          <Button className="bg-[#F1490D] hover:bg-[#EA580C] gap-2">
            <Plus className="h-4 w-4" />
            New Policy
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start h-auto p-0 mb-6">
            <TabsTrigger 
              value="dashboard" 
              className="py-2 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              className="py-2 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent"
            >
              All Policies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-5 gap-4 mb-6">
              <Card className="p-4">
                <div className="text-sm text-gray-600">Not Uploaded</div>
                <div className="text-3xl font-semibold mt-2">0</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-amber-600">Draft</div>
                <div className="text-3xl font-semibold mt-2">27</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-blue-600">Approved</div>
                <div className="text-3xl font-semibold mt-2">0</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-red-600">Needs Review</div>
                <div className="text-3xl font-semibold mt-2">0</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-green-600">Published</div>
                <div className="text-3xl font-semibold mt-2">8/35</div>
              </Card>
            </div>

            <div className="flex items-center justify-between mb-4 gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search by name, entities or approver"
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Entities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                  <span>Relevance</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded">1</span>
                </div>
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Columns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 columns</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[30px]">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Policy Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Approver</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Version Number</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Created On</TableHead>
                    <TableHead>Published By</TableHead>
                    <TableHead>Published On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policies.map((policy, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">{policy.name}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={
                            policy.status === 'Published' 
                              ? 'bg-green-50 text-green-700' 
                              : 'bg-amber-50 text-amber-700'
                          }
                        >
                          {policy.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-rose-50 text-rose-700">
                          {policy.assignee}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                          {policy.approver}
                        </Badge>
                      </TableCell>
                      <TableCell>{policy.department}</TableCell>
                      <TableCell>{policy.version}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-rose-50 text-rose-700">
                          {policy.createdBy}
                        </Badge>
                      </TableCell>
                      <TableCell>{policy.createdOn}</TableCell>
                      <TableCell>
                        {policy.publishedBy && (
                          <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                            {policy.publishedBy}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{policy.publishedOn}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-transparent text-black">1</Button>
                <Button variant="ghost" size="sm">2</Button>
                <Button variant="ghost" size="sm">3</Button>
                <Button variant="ghost" size="sm">4</Button>
                <Button variant="ghost" size="sm">›</Button>
                <span className="text-sm text-gray-500 ml-2">1-10/35</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dashboard">
            <div className="text-center text-gray-500 py-12">
              Dashboard view content will go here
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Policies;


import React from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown } from 'lucide-react';

const Tests = () => {
  const testData = [
    {
      name: "Security & Privacy Awareness Training Report",
      status: "Needs Attention",
      type: "Evidence",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Contact with Special Interest Groups and Authorities",
      status: "Needs Attention",
      type: "Evidence",
      application: "Scrut",
      assignee: "-",
      framework: "ISO 27001:2022"
    },
    {
      name: "Review of the classification policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Information Security",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Backup Policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Acceptable Usage Policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Password Policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Data Security Policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Contact with Special Interest Groups and Authorities",
      status: "Needs Attention",
      type: "Evidence",
      application: "Scrut",
      assignee: "-",
      framework: "ISO 27001:2022"
    },
    {
      name: "Review of the classification policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Information Security",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Backup Policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Acceptable Usage Policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Password Policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Data Security Policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Contact with Special Interest Groups and Authorities",
      status: "Needs Attention",
      type: "Evidence",
      application: "Scrut",
      assignee: "-",
      framework: "ISO 27001:2022"
    },
    {
      name: "Review of the classification policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Information Security",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Backup Policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Acceptable Usage Policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Password Policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
    {
      name: "Data Security Policy",
      status: "OK",
      type: "Policy",
      application: "Scrut",
      assignee: "M",
      framework: "ISO 27001:2022"
    },
  ];

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-bold">Tests</h1>
          <Badge variant="secondary" className="bg-gray-100">197</Badge>
        </div>

        <Tabs defaultValue="all-tests" className="w-full">
          <div className="flex gap-2 mb-6">
            <Button variant="default" className="bg-black/0 text-white hover:bg-gray-900/10">All Tests</Button>
            <Button variant="ghost">Test Library</Button>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">OK</Badge>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-semibold">89</span>
                <span className="text-gray-500">/197</span>
              </div>
              <div className="mt-2">
                <div className="h-2 bg-green-100 rounded-full">
                  <div className="h-full w-[45.1%] bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-500">45.1% done</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Badge variant="secondary" className="bg-red-100 text-red-800">Needs Attention</Badge>
              <div className="mt-4">
                <span className="text-3xl font-semibold">108</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Badge variant="secondary" className="bg-gray-100">Ignored</Badge>
              <div className="mt-4">
                <span className="text-3xl font-semibold">1</span>
              </div>
            </div>
          </div>

          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="automated">Automated Tests</TabsTrigger>
            <TabsTrigger value="policy">Policy</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
          </TabsList>

          <div className="flex items-center justify-between gap-4 mb-4">
            <Input 
              placeholder="Search by name" 
              className="max-w-sm"
            />
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Application
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" />
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Assignee
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" />
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Framework
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" />
              </DropdownMenu>

              <div className="flex items-center gap-2">
                <Switch id="unmapped" />
                <label htmlFor="unmapped" className="text-sm">Show Unmapped Tests</label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]"><Checkbox /></TableHead>
                  <TableHead className="font-medium">TestName</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Applications</TableHead>
                  <TableHead className="font-medium">Assignees</TableHead>
                  <TableHead className="font-medium">Framework</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testData.map((test, index) => (
                  <TableRow key={index}>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell>{test.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        {test.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{test.type}</TableCell>
                    <TableCell>{test.application}</TableCell>
                    <TableCell>
                      {test.assignee === "M" ? (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          M
                        </Badge>
                      ) : (
                        test.assignee
                      )}
                    </TableCell>
                    <TableCell>{test.framework}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Tests;

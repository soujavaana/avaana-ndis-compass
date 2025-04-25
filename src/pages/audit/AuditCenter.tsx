import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Filter, Edit, Trash2 } from 'lucide-react';
import AuditStatsCard from '@/components/audit/AuditStatsCard';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const AuditCenter = () => {
  const auditData = [
    {
      name: "Gap Assessment",
      status: "In Progress",
      type: "Internal",
      date: "Nov 20, 2024",
      observationPeriod: "-"
    },
    {
      name: "Compliance Verification",
      status: "Completed",
      type: "External",
      date: "Mar 15, 2025",
      observationPeriod: "Jan-Feb 2025"
    },
    {
      name: "IT Security Audit",
      status: "In Progress",
      type: "Internal",
      date: "Apr 10, 2025",
      observationPeriod: "-"
    },
    {
      name: "Third-Party Risk Assessment",
      status: "Completed",
      type: "External",
      date: "Feb 25, 2025",
      observationPeriod: "Dec 2024-Jan 2025"
    },
    {
      name: "Data Privacy Audit",
      status: "Planned",
      type: "Internal",
      date: "May 5, 2025",
      observationPeriod: "-"
    }
  ];

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-[32px] font-[400] leading-[48px] font-recoleta">Audit Center</h1>
          </div>
          <Button className="bg-[#F1490D] hover:bg-[#EA580C]">
            + New Audit
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <AuditStatsCard title="In Progress" count={1} variant="in-progress" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <AuditStatsCard title="Completed" count={0} variant="completed" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <AuditStatsCard title="Internal Audits" count={0} variant="internal" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <AuditStatsCard title="External Audits" count={0} variant="external" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search by audit name"
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Audit Date
                </Button>
                <Button variant="outline">Entities</Button>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Created On
                </Button>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Columns
                </Button>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Audit Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Audit Type</TableHead>
                <TableHead>Audit Date</TableHead>
                <TableHead>Observation Period</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditData.map((audit, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{audit.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      audit.status === 'In Progress' ? 'bg-amber-50 text-amber-600' :
                      audit.status === 'Completed' ? 'bg-green-50 text-green-600' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {audit.status}
                    </span>
                  </TableCell>
                  <TableCell>{audit.type}</TableCell>
                  <TableCell>{audit.date}</TableCell>
                  <TableCell>{audit.observationPeriod}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4 border-t">
            <div className="text-sm text-gray-500">
              Showing 1-1 of 1 result
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuditCenter;

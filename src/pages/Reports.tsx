import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Calendar, Download, FileText, PieChart, Settings } from 'lucide-react';

const Reports = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Reports</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-white flex items-center gap-2">
              <Calendar size={16} />
              <span>Last 30 Days</span>
            </Button>
            <Button className="bg-[#F1490D] hover:bg-[#EA580C]">
              <span className="mr-1">+</span> Generate Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <Card className="p-4 flex flex-col">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Compliance Score</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">87%</div>
              <span className="text-green-600 text-sm">↑ 4%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "87%" }}></div>
            </div>
          </Card>
          
          <Card className="p-4 flex flex-col">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Risk Score</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">23%</div>
              <span className="text-green-600 text-sm">↓ 7%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
              <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: "23%" }}></div>
            </div>
          </Card>
          
          <Card className="p-4 flex flex-col">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Open Issues</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">12</div>
              <span className="text-red-600 text-sm">↑ 2</span>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <span className="font-medium">4</span> high priority
            </div>
          </Card>
          
          <Card className="p-4 flex flex-col">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Tasks Completed</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">87%</div>
              <span className="text-green-600 text-sm">↑ 12%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "87%" }}></div>
            </div>
          </Card>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Quarterly Compliance Summary",
              date: "Generated on Jul 1, 2025",
              type: "PDF",
              icon: BarChart
            },
            {
              title: "Risk Assessment Report",
              date: "Generated on Jun 15, 2025",
              type: "Excel",
              icon: PieChart
            },
            {
              title: "Security Audit Findings",
              date: "Generated on May 30, 2025",
              type: "PDF",
              icon: FileText
            },
            {
              title: "Control Implementation Status",
              date: "Generated on May 15, 2025",
              type: "PDF",
              icon: BarChart
            },
            {
              title: "Vendor Risk Analysis",
              date: "Generated on May 1, 2025",
              type: "Excel",
              icon: PieChart
            },
            {
              title: "Policy Compliance Report",
              date: "Generated on Apr 15, 2025",
              type: "PDF",
              icon: FileText
            }
          ].map((report, i) => (
            <Card key={i} className="p-5 hover:shadow-md transition-shadow border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <report.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">{report.title}</h3>
                    <p className="text-gray-500 text-xs">{report.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings size={16} />
                </Button>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  report.type === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {report.type}
                </span>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download size={14} /> 
                  <span>Download</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reports;

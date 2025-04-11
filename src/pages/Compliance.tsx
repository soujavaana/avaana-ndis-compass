
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const complianceAreas = [
  { name: 'NDIS Practice Standards', value: 85 },
  { name: 'Worker Screening', value: 100 },
  { name: 'Complaints Management', value: 60 },
  { name: 'Incident Management', value: 75 },
  { name: 'Risk Management', value: 90 },
  { name: 'Quality Management', value: 65 },
];

const auditData = [
  { name: 'Core Module', completed: 18, total: 20 },
  { name: 'Provider Governance', completed: 10, total: 12 },
  { name: 'Risk Management', completed: 7, total: 8 },
  { name: 'Human Resource', completed: 12, total: 15 },
  { name: 'Participant Support', completed: 16, total: 20 },
];

const upcomingRequirements = [
  { name: 'Mid-term Audit', date: 'May 15, 2025', status: 'urgent' },
  { name: 'Worker Screening Renewal', date: 'July 8, 2025', status: 'upcoming' },
  { name: 'Policy Review', date: 'August 22, 2025', status: 'planned' },
  { name: 'Insurance Certificate Renewal', date: 'September 5, 2025', status: 'planned' },
];

const statusColors = {
  urgent: 'text-red-500',
  upcoming: 'text-amber-500',
  planned: 'text-blue-500',
  completed: 'text-green-500'
};

const pieColors = ['#2DCE89', '#4FD69C', '#8BE9C0', '#1AAE6F', '#0C8B55', '#F3F4F6'];

const Compliance = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Compliance Management</h1>
        <button className="bg-avaana-primary text-white px-4 py-2 rounded-md hover:bg-avaana-secondary transition-colors">
          Generate Compliance Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-avaana-primary" />
              Overall Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <Progress value={78} className="h-2 mt-2" />
            <p className="text-sm text-gray-500 mt-2">
              Last verified: April 5, 2025
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-avaana-primary" />
              Audit Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">63%</div>
            <Progress value={63} className="h-2 mt-2" />
            <p className="text-sm text-gray-500 mt-2">
              Mid-term audit: 35 days remaining
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Required Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-red-500">Critical: 2</span>
              <span className="text-amber-500">Important: 3</span>
              <span className="text-blue-500">Normal: 2</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={{
                  area1: { color: '#2DCE89' },
                  area2: { color: '#1AAE6F' }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={auditData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" name="Completed" fill="#2DCE89" />
                    <Bar dataKey="total" name="Required" fill="#E5E7EB" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ChartContainer 
                config={{
                  area1: { color: '#2DCE89' },
                  area2: { color: '#4FD69C' }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complianceAreas}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {complianceAreas.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Compliance Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {upcomingRequirements.map((item, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`mr-3 ${statusColors[item.status]}`}>
                    {item.status === 'urgent' ? <XCircle size={20} /> : 
                     item.status === 'upcoming' ? <AlertTriangle size={20} /> : 
                     <CheckCircle size={20} />}
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Due: {item.date}</p>
                  </div>
                </div>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Compliance;

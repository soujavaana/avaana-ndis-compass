
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, DollarSign, Award } from 'lucide-react';

const quarterlyRevenue = [
  { name: 'Jan', revenue: 28000 },
  { name: 'Feb', revenue: 32000 },
  { name: 'Mar', revenue: 35000 },
  { name: 'Apr', revenue: 42000 },
  { name: 'May', revenue: 45000 },
  { name: 'Jun', revenue: 48000 },
  { name: 'Jul', revenue: 52000 },
  { name: 'Aug', revenue: 55000 },
  { name: 'Sep', revenue: 58000 },
];

const serviceDistribution = [
  { name: 'Community Nursing', value: 35 },
  { name: 'Personal Care', value: 25 },
  { name: 'Therapeutic Supports', value: 20 },
  { name: 'Group Activities', value: 15 },
  { name: 'Other', value: 5 },
];

const benchmarkData = [
  { name: 'Growth Rate', yours: 18, average: 12 },
  { name: 'Profit Margin', yours: 22, average: 15 },
  { name: 'Client Retention', yours: 92, average: 85 },
  { name: 'Staff Satisfaction', yours: 88, average: 75 },
];

const COLORS = ['#2DCE89', '#4FD69C', '#1AAE6F', '#8BE9C0', '#0C8B55'];

const Analytics = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex gap-3">
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Year to Date</option>
            <option>Custom Range</option>
          </select>
          <button className="bg-avaana-primary text-white px-4 py-2 rounded-md hover:bg-avaana-secondary transition-colors">
            Export Data
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-avaana-primary" />
              Revenue Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18%</div>
            <p className="text-sm text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> 
              5% above industry average
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-avaana-primary" />
              Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87</div>
            <p className="text-sm text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> 
              12 new this quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-avaana-primary" />
              Avg. Revenue Per Client
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$4,850</div>
            <p className="text-sm text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> 
              $350 increase since last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4 text-avaana-primary" />
              Market Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Top 15%</div>
            <p className="text-sm text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> 
              Improved from top 20%
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue over last 9 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={{
                  revenue: { color: '#2DCE89' }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={quarterlyRevenue}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Revenue']}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      name="Revenue" 
                      stroke="#2DCE89" 
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
            <CardDescription>Revenue breakdown by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ChartContainer 
                config={{
                  services: { color: '#2DCE89' }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {serviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
          <CardTitle>Benchmarking Against Industry</CardTitle>
          <CardDescription>How your business compares to other NDIS providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer 
              config={{
                yours: { color: '#2DCE89' },
                average: { color: '#E5E7EB' }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={benchmarkData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={30}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="yours" name="Your Business" fill="#2DCE89" />
                  <Bar dataKey="average" name="Industry Average" fill="#E5E7EB" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Analytics;

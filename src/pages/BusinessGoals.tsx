
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, Flag, TrendingUp, Award, Users } from 'lucide-react';

const goals = [
  {
    id: 1,
    title: "Increase participant base by 25%",
    category: "Growth",
    progress: 65,
    status: "In Progress",
    dueDate: "December 31, 2025",
    description: "Target to increase the number of active participants from 80 to 100 by end of year."
  },
  {
    id: 2,
    title: "Achieve 95% compliance score",
    category: "Compliance",
    progress: 80,
    status: "In Progress",
    dueDate: "June 30, 2025",
    description: "Improve compliance documentation and procedures to exceed NDIS audit requirements."
  },
  {
    id: 3,
    title: "Staff training completion",
    category: "Development",
    progress: 100,
    status: "Completed",
    dueDate: "March 15, 2025",
    description: "Ensure all staff complete required training modules for NDIS compliance and service quality."
  },
  {
    id: 4,
    title: "Expand to 3 new service categories",
    category: "Growth",
    progress: 33,
    status: "In Progress",
    dueDate: "September 30, 2025",
    description: "Apply for registration in 3 additional NDIS service categories to diversify service offerings."
  },
];

const growthData = [
  { month: 'Jan', participants: 65, revenue: 72000 },
  { month: 'Feb', participants: 68, revenue: 75000 },
  { month: 'Mar', participants: 72, revenue: 80000 },
  { month: 'Apr', participants: 75, revenue: 82000 },
  { month: 'May', participants: 78, revenue: 87000 },
  { month: 'Jun', participants: 82, revenue: 92000 },
  { month: 'Jul', participants: 87, revenue: 98000 },
];

const BusinessGoals = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Business Goals</h1>
        <Button className="bg-avaana-primary text-white hover:bg-avaana-secondary">
          <Flag className="h-4 w-4 mr-2" />
          Add New Goal
        </Button>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.filter(goal => goal.status !== "Completed").map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{goal.title}</CardTitle>
                      <CardDescription>Category: {goal.category}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {goal.status === "In Progress" ? (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>In Progress</span>
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Completed</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-3">{goal.description}</p>
                  <div className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">Due: {goal.dueDate}</p>
                    <Button variant="outline" size="sm">Update Progress</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.filter(goal => goal.status === "Completed").map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{goal.title}</CardTitle>
                      <CardDescription>Category: {goal.category}</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Completed</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-3">{goal.description}</p>
                  <div className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">Completed: {goal.dueDate}</p>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="progress">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Participant Growth</CardTitle>
                <CardDescription>Tracking progress towards 25% growth target</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer 
                    config={{
                      participants: { color: '#2DCE89' }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={growthData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="participants" 
                          name="Participants" 
                          stroke="#2DCE89" 
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm font-medium">Target: 100 participants</p>
                    <p className="text-sm text-gray-500">Current: 87 participants</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">On Track</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
                <CardDescription>Monthly revenue progression</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer 
                    config={{
                      revenue: { color: '#1AAE6F' }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={growthData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`$${value}`, 'Revenue']}
                        />
                        <Legend />
                        <Bar dataKey="revenue" name="Revenue" fill="#1AAE6F" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm font-medium">Target: $120,000/month</p>
                    <p className="text-sm text-gray-500">Current: $98,000/month</p>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">In Progress</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
              <CardDescription>Summary of all current business goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center">
                  <div className="bg-avaana-primary/10 rounded-full p-3 mb-4">
                    <TrendingUp className="h-8 w-8 text-avaana-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Growth Goals</h3>
                  <p className="text-sm text-gray-500 mb-3">2 goals in progress</p>
                  <Progress value={45} className="h-2 w-full" />
                  <p className="text-sm text-gray-500 mt-2">45% complete</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center">
                  <div className="bg-avaana-primary/10 rounded-full p-3 mb-4">
                    <Award className="h-8 w-8 text-avaana-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Compliance Goals</h3>
                  <p className="text-sm text-gray-500 mb-3">1 goal in progress</p>
                  <Progress value={80} className="h-2 w-full" />
                  <p className="text-sm text-gray-500 mt-2">80% complete</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center">
                  <div className="bg-avaana-primary/10 rounded-full p-3 mb-4">
                    <Users className="h-8 w-8 text-avaana-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Development Goals</h3>
                  <p className="text-sm text-gray-500 mb-3">1 goal completed</p>
                  <Progress value={100} className="h-2 w-full" />
                  <p className="text-sm text-gray-500 mt-2">100% complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default BusinessGoals;

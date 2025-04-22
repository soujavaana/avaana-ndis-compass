
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

const complianceTopics = [
  {
    title: 'Security Posture',
    progress: 85,
    status: 'Compliant',
    items: [
      { name: 'Access Control', status: 'complete' },
      { name: 'Data Protection', status: 'in-progress' },
      { name: 'System Security', status: 'complete' },
    ]
  },
  {
    title: 'NDIS Standards',
    progress: 92,
    status: 'Compliant',
    items: [
      { name: 'Provider Registration', status: 'complete' },
      { name: 'Service Delivery', status: 'complete' },
      { name: 'Quality Management', status: 'complete' },
    ]
  },
  {
    title: 'Privacy Compliance',
    progress: 78,
    status: 'In Progress',
    items: [
      { name: 'Data Handling', status: 'in-progress' },
      { name: 'Privacy Policies', status: 'complete' },
      { name: 'Consent Management', status: 'pending' },
    ]
  }
];

const Compliance = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[32px] font-[400] leading-[48px] font-recoleta flex items-center gap-[5px]">
          <Shield className="h-8 w-8" />
          Compliance Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">85%</div>
            <Progress value={85} className="h-2 mt-2" />
            <p className="text-sm text-gray-500 mt-2">Last updated: Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Controls Passed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156/180</div>
            <Progress value={87} className="h-2 mt-2" />
            <p className="text-sm text-gray-500 mt-2">24 controls need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Critical Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">3</div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-amber-500">High: 3</span>
              <span className="text-blue-500">Medium: 8</span>
              <span className="text-gray-500">Low: 13</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {complianceTopics.map((topic, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">{topic.title}</CardTitle>
              <Badge 
                className={topic.status === 'Compliant' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}
              >
                {topic.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{topic.progress}%</span>
                </div>
                <Progress value={topic.progress} className="h-2" />
              </div>
              <div className="mt-4 space-y-3">
                {topic.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.status === 'complete' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : item.status === 'in-progress' ? (
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      ) : (
                        <FileText className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <Badge 
                      className={
                        item.status === 'complete' ? 'bg-green-100 text-green-800' : 
                        item.status === 'in-progress' ? 'bg-amber-100 text-amber-800' : 
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {item.status === 'complete' ? 'Complete' : 
                       item.status === 'in-progress' ? 'In Progress' : 
                       'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Compliance;


import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserIcon, PhoneIcon, CalendarIcon, Search, PlusCircle, Filter } from 'lucide-react';

const participants = [
  {
    id: 1,
    name: "Emma Thompson",
    ndisNumber: "123456789",
    status: "Active",
    dateOfBirth: "12 May 1985",
    phone: "0412 345 678",
    email: "emma.t@example.com",
    lastService: "15 Apr 2025",
    fundingStatus: "Good",
  },
  {
    id: 2,
    name: "Michael Chen",
    ndisNumber: "987654321",
    status: "Active",
    dateOfBirth: "23 August 1992",
    phone: "0423 456 789",
    email: "michael.c@example.com",
    lastService: "10 Apr 2025",
    fundingStatus: "Warning",
  },
  {
    id: 3,
    name: "Sophie Williams",
    ndisNumber: "456789123",
    status: "Inactive",
    dateOfBirth: "17 January 1978",
    phone: "0434 567 890",
    email: "sophie.w@example.com",
    lastService: "25 Feb 2025",
    fundingStatus: "Good",
  },
  {
    id: 4,
    name: "James Rodriguez",
    ndisNumber: "789123456",
    status: "Active",
    dateOfBirth: "4 November 1990",
    phone: "0445 678 901",
    email: "james.r@example.com",
    lastService: "12 Apr 2025",
    fundingStatus: "Critical",
  },
];

const getFundingStatusBadge = (status) => {
  switch(status) {
    case "Good":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Funding Good</Badge>;
    case "Warning":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Low Funding</Badge>;
    case "Critical":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Critical Funding</Badge>;
    default:
      return null;
  }
};

const getStatusBadge = (status) => {
  switch(status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
    case "Inactive":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>;
    default:
      return null;
  }
};

const Participants = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Participants</h1>
        <Button className="bg-avaana-primary text-white hover:bg-avaana-secondary">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Participant
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input className="pl-9" placeholder="Search participants by name, email, or NDIS number" />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {participants.map((participant) => (
          <Card key={participant.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{participant.name}</h3>
                      {getStatusBadge(participant.status)}
                      {getFundingStatusBadge(participant.fundingStatus)}
                    </div>
                    <p className="text-sm text-gray-500">NDIS #: {participant.ndisNumber}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-1 gap-x-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <CalendarIcon className="h-4 w-4" />
                        <span>DoB: {participant.dateOfBirth}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <PhoneIcon className="h-4 w-4" />
                        <span>{participant.phone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <CalendarIcon className="h-4 w-4" />
                        <span>Last Service: {participant.lastService}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col gap-2 mt-4 md:mt-0 md:text-right">
                  <Button className="bg-avaana-primary text-white hover:bg-avaana-secondary">View Profile</Button>
                  <Button variant="outline">Schedule Service</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Participants;

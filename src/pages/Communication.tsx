
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { UserIcon, SendIcon } from 'lucide-react';

const messages = [
  {
    id: 1,
    sender: 'Monique Wilson',
    avatar: null,
    isAdmin: true,
    time: 'Yesterday at 9:42 AM',
    content: 'Hi there! Just checking in about your upcoming mid-term audit. Have you started gathering the required documents?',
    read: true
  },
  {
    id: 2,
    sender: 'You',
    avatar: null,
    isAdmin: false,
    time: 'Yesterday at 11:15 AM',
    content: 'Hello Monique, not yet. Could you please remind me what documents I need to prepare?',
    read: true
  },
  {
    id: 3,
    sender: 'Monique Wilson',
    avatar: null,
    isAdmin: true,
    time: 'Yesterday at 2:30 PM',
    content: 'Of course! For your mid-term audit, you\'ll need to provide:\n\n1. Updated policies and procedures\n2. Staff training records\n3. Incident reports from the last 6 months\n4. Evidence of continuous improvement activities\n5. Updated risk management plan\n\nWould you like me to send over some templates?',
    read: true
  },
  {
    id: 4,
    sender: 'You',
    avatar: null,
    isAdmin: false,
    time: 'Yesterday at 3:45 PM',
    content: 'That would be very helpful. When is the deadline for submitting these documents?',
    read: true
  },
  {
    id: 5,
    sender: 'Monique Wilson',
    avatar: null,
    isAdmin: true,
    time: 'Today at 8:20 AM',
    content: 'Your mid-term audit is scheduled for May 15th, so ideally we should have all documents prepared by May 1st to give us time for any revisions. I\'ve just uploaded some templates to your Documents section. Let me know if you have any questions!',
    read: false
  }
];

const Communication = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Communication Center</h1>
        <button className="bg-avaana-primary text-white px-4 py-2 rounded-md hover:bg-avaana-secondary transition-colors">
          New Message
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader className="pb-3">
              <CardTitle>Conversations</CardTitle>
              <div className="mt-2">
                <Input placeholder="Search messages..." />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-y-auto h-[calc(100%-5rem)]">
                <div className="border-l-4 border-avaana-primary bg-gray-50">
                  <div className="p-4 cursor-pointer">
                    <div className="flex justify-between">
                      <div className="font-semibold">Monique Wilson</div>
                      <div className="text-xs text-gray-500">8:20 AM</div>
                    </div>
                    <div className="text-sm truncate text-gray-600">I've just uploaded some templates to your Documents...</div>
                    <div className="flex justify-between mt-1">
                      <div className="text-xs text-gray-500">Mid-term audit preparation</div>
                      <div className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        1
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hover:bg-gray-50">
                  <div className="p-4 cursor-pointer">
                    <div className="flex justify-between">
                      <div className="font-semibold">Support Team</div>
                      <div className="text-xs text-gray-500">Apr 5</div>
                    </div>
                    <div className="text-sm truncate text-gray-600">Thank you for submitting your quarterly report...</div>
                    <div className="flex justify-between mt-1">
                      <div className="text-xs text-gray-500">Quarterly report</div>
                    </div>
                  </div>
                </div>
                <div className="hover:bg-gray-50">
                  <div className="p-4 cursor-pointer">
                    <div className="flex justify-between">
                      <div className="font-semibold">James Peters</div>
                      <div className="text-xs text-gray-500">Mar 27</div>
                    </div>
                    <div className="text-sm truncate text-gray-600">Your registration has been approved. Congratulations!...</div>
                    <div className="flex justify-between mt-1">
                      <div className="text-xs text-gray-500">Registration approval</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-12rem)] flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-avaana-primary h-10 w-10 rounded-full flex items-center justify-center text-white">
                    <UserIcon size={20} />
                  </div>
                  <div>
                    <CardTitle>Monique Wilson</CardTitle>
                    <div className="text-sm text-gray-500">Application Manager</div>
                  </div>
                </div>
                <div>
                  <Tabs defaultValue="messages">
                    <TabsList>
                      <TabsTrigger value="messages">Messages</TabsTrigger>
                      <TabsTrigger value="files">Files</TabsTrigger>
                      <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className={`max-w-[70%] rounded-lg p-4 ${
                        message.isAdmin 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-avaana-primary text-white'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-medium">{message.sender}</div>
                        <div className={`text-xs ${message.isAdmin ? 'text-gray-500' : 'text-white/80'}`}>
                          {message.time}
                        </div>
                      </div>
                      <div className="whitespace-pre-line">{message.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <button className="bg-avaana-primary text-white p-2 rounded-md hover:bg-avaana-secondary transition-colors">
                  <SendIcon size={20} />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Communication;

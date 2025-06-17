
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserIcon, SendIcon, Mail, Phone, Loader2, Plus, ArrowUpRight, ArrowDownLeft, MessageSquare } from 'lucide-react';
import { useStaffContacts, useConversationThreads, useMessages, useSendMessage, useCreateThread } from '@/hooks/useCommunication';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import CloseCrmDebug from '@/components/communication/CloseCrmDebug';

interface CloseContact {
  id: string;
  name: string;
  lead_id: string;
  emails: Array<{ email: string; type: string }>;
  phones: Array<{ phone: string; type: string }>;
  date_created: string;
  date_updated: string;
}

interface CloseActivity {
  id: string;
  type: string;
  date_created: string;
  user_id: string;
  contact_id?: string;
  lead_id?: string;
  to?: string[];
  from?: string;
  subject?: string;
  body_text?: string;
  body_html?: string;
  text?: string;
  note?: string;
  body?: string;
  direction?: string;
  status?: string;
  duration?: number;
  phone?: string;
  raw_data?: any;
}

interface CloseUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
}

interface StaffConversation {
  staffUserId: string;
  staffEmail: string;
  staffName: string;
  activities: CloseActivity[];
  lastActivity: string;
}

const Communication = () => {
  const { user } = useAuth();
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newMessageStaff, setNewMessageStaff] = useState('');
  const [newMessageSubject, setNewMessageSubject] = useState('');
  const [selectedStaffUserId, setSelectedStaffUserId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  
  // Close CRM lookup state
  const [contactData, setContactData] = useState<CloseContact | null>(null);
  const [activities, setActivities] = useState<CloseActivity[]>([]);
  const [users, setUsers] = useState<{ [key: string]: CloseUser }>({});
  const [lookupLoading, setLookupLoading] = useState(false);
  const [staffConversations, setStaffConversations] = useState<StaffConversation[]>([]);

  const { data: staffContacts, isLoading: staffLoading } = useStaffContacts();
  const { data: threads, isLoading: threadsLoading } = useConversationThreads();
  const { data: messages, isLoading: messagesLoading } = useMessages(selectedThreadId);
  const sendMessage = useSendMessage();
  const createThread = useCreateThread();

  // Filter activities to only include Email and SMS with successful status
  const filterCommunicationActivities = (activities: CloseActivity[]) => {
    return activities.filter(activity => {
      const type = activity.type?.toLowerCase();
      const status = activity.status?.toLowerCase();
      
      // Only include Email and SMS activities
      if (type !== 'email' && type !== 'sms') {
        return false;
      }
      
      // Only include successfully sent activities (exclude drafts, failed, etc.)
      if (status && !['sent', 'delivered', 'opened', 'clicked'].includes(status)) {
        return false;
      }
      
      return true;
    });
  };

  // Process activities into staff conversations with filtering
  useEffect(() => {
    if (activities.length > 0 && Object.keys(users).length > 0) {
      // Filter activities first
      const filteredActivities = filterCommunicationActivities(activities);
      
      const staffMap = new Map<string, StaffConversation>();
      
      filteredActivities.forEach(activity => {
        const staffUser = users[activity.user_id];
        if (staffUser && activity.user_id) {
          if (!staffMap.has(activity.user_id)) {
            staffMap.set(activity.user_id, {
              staffUserId: activity.user_id,
              staffEmail: staffUser.email,
              staffName: staffUser.display_name || `${staffUser.first_name} ${staffUser.last_name}`,
              activities: [],
              lastActivity: activity.date_created,
            });
          }
          
          const existing = staffMap.get(activity.user_id)!;
          existing.activities.push(activity);
          
          // Update last activity date if this is more recent
          if (new Date(activity.date_created) > new Date(existing.lastActivity)) {
            existing.lastActivity = activity.date_created;
          }
        }
      });
      
      // Convert to array and sort by last activity
      const conversations = Array.from(staffMap.values()).sort(
        (a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      );
      
      setStaffConversations(conversations);
      
      // Auto-select first staff member if none selected
      if (conversations.length > 0 && !selectedStaffUserId) {
        setSelectedStaffUserId(conversations[0].staffUserId);
      }
    }
  }, [activities, users, selectedStaffUserId]);

  const getActivityIcon = (type: string, direction?: string) => {
    switch (type?.toLowerCase()) {
      case 'email':
        return direction === 'outbound' ? 
          <ArrowUpRight size={16} className="text-blue-500" /> : 
          <ArrowDownLeft size={16} className="text-blue-600" />;
      case 'sms':
        return <MessageSquare size={16} className="text-green-500" />;
      default:
        return <Mail size={16} className="text-gray-400" />;
    }
  };

  const getActivityContent = (activity: CloseActivity) => {
    const content = activity.body_text || activity.body_html || activity.text || activity.note || activity.body;
    if (content) return content;
    
    if (activity.raw_data) {
      const rawData = activity.raw_data;
      if (rawData.template_name) return `Template: ${rawData.template_name}`;
      if (rawData.summary) return rawData.summary;
      if (rawData.description) return rawData.description;
    }
    
    return 'No content available';
  };

  // Auto-lookup contact data when component mounts
  useEffect(() => {
    const lookupUserContact = async () => {
      if (!user?.email) return;

      setLookupLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
          throw new Error('No valid session found');
        }

        const response = await fetch('https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-lookup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybmp4Z2Z6emJleGpheXRzenZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MjkxOTcsImV4cCI6MjA2MzIwNTE5N30.euI15LNkMP1IMWojTAetE75ecjqrk-2Audt64AyMel4',
          },
          body: JSON.stringify({ email: user.email }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.contact) {
            setContactData(result.contact);
          }
          if (result.activities) {
            setActivities(result.activities);
          }
          if (result.users) {
            setUsers(result.users);
          }
        }
      } catch (error) {
        console.error('Failed to lookup contact:', error);
      } finally {
        setLookupLoading(false);
      }
    };

    lookupUserContact();
  }, [user?.email]);

  // Select first thread if none selected
  useEffect(() => {
    if (threads && threads.length > 0 && !selectedThreadId) {
      setSelectedThreadId(threads[0].id);
    }
  }, [threads, selectedThreadId]);

  const selectedThread = threads?.find(t => t.id === selectedThreadId);
  const selectedStaff = selectedThread?.close_crm_contacts;
  const selectedStaffConversation = staffConversations.find(conv => conv.staffUserId === selectedStaffUserId);

  const handleSendMessage = async () => {
    if (!messageContent.trim() || !selectedThread || !selectedStaff?.email) return;

    try {
      await sendMessage.mutateAsync({
        threadId: selectedThread.id,
        content: messageContent.trim(),
        recipientEmail: selectedStaff.email,
        subject: selectedThread.subject || 'Message from Avaana Dashboard',
      });

      setMessageContent('');
      toast({
        title: 'Message Sent',
        description: 'Your message has been sent successfully via Close CRM.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message',
        variant: 'destructive',
      });
    }
  };

  const handleSendReply = async () => {
    if (!replyContent.trim() || !selectedStaffConversation) return;

    setIsSendingReply(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('No valid session found');
      }

      const response = await fetch('https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybmp4Z2Z6emJleGpheXRzenZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MjkxOTcsImV4cCI6MjA2MzIwNTE5N30.euI15LNkMP1IMWojTAetE75ecjqrk-2Audt64AyMel4',
        },
        body: JSON.stringify({
          content: replyContent.trim(),
          recipientEmail: selectedStaffConversation.staffEmail,
          subject: `Reply from ${contactData?.name || user?.email}`,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send message');
      }

      setReplyContent('');
      toast({
        title: 'Reply Sent',
        description: `Your message has been sent to ${selectedStaffConversation.staffName}.`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send reply',
        variant: 'destructive',
      });
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleCreateNewThread = async () => {
    if (!newMessageStaff || !newMessageSubject.trim()) return;

    try {
      const thread = await createThread.mutateAsync({
        staffContactId: newMessageStaff,
        subject: newMessageSubject.trim(),
      });

      setSelectedThreadId(thread.id);
      setShowNewMessage(false);
      setNewMessageStaff('');
      setNewMessageSubject('');
      
      toast({
        title: 'New Conversation',
        description: 'New conversation thread created.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create thread',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl text-gray-900 font-normal">Communication Center</h1>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowNewMessage(true)}
            className="bg-avaana-primary text-white px-4 py-2 rounded-md hover:bg-avaana-secondary transition-colors"
          >
            <Plus size={16} className="mr-2" />
            New Message
          </Button>
        </div>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="debug">Debug & Lookup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="mt-6">
          {showNewMessage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <Card className="w-96">
                <CardHeader>
                  <CardTitle>New Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Staff Member</label>
                    <select 
                      value={newMessageStaff} 
                      onChange={(e) => setNewMessageStaff(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    >
                      <option value="">Select staff member...</option>
                      {staffContacts?.map(staff => (
                        <option key={staff.id} value={staff.id}>
                          {staff.name} - {staff.role}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input 
                      value={newMessageSubject}
                      onChange={(e) => setNewMessageSubject(e.target.value)}
                      placeholder="Enter subject..."
                      className="mt-1"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleCreateNewThread}
                      disabled={!newMessageStaff || !newMessageSubject.trim() || createThread.isPending}
                    >
                      {createThread.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Create
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewMessage(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card className="h-[calc(100vh-12rem)]">
                <CardHeader className="pb-3">
                  <CardTitle className="font-normal">Conversations</CardTitle>
                  <div className="mt-2">
                    <Input placeholder="Search messages..." />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-y-auto h-[calc(100%-5rem)]">
                    {lookupLoading ? (
                      <div className="p-4 text-center">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        <p className="text-sm text-gray-500 mt-2">Loading conversations...</p>
                      </div>
                    ) : staffConversations.length > 0 ? (
                      <div className="space-y-2 p-2">
                        {staffConversations.map(conversation => (
                          <div 
                            key={conversation.staffUserId}
                            className={`cursor-pointer rounded-lg border p-3 hover:bg-gray-50 ${
                              selectedStaffUserId === conversation.staffUserId ? 'border-avaana-primary bg-gray-50' : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedStaffUserId(conversation.staffUserId)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="font-medium text-sm">{conversation.staffName}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(conversation.lastActivity).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {conversation.staffEmail}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {conversation.activities.length} messages
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No conversations found. Messages will appear here once loaded.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="h-[calc(100vh-12rem)] flex flex-col">
                {selectedStaffConversation ? (
                  <>
                    <CardHeader className="pb-3 border-b">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-avaana-primary h-10 w-10 rounded-full flex items-center justify-center text-white">
                            <UserIcon size={20} />
                          </div>
                          <div>
                            <CardTitle className="text-base font-normal">{selectedStaffConversation.staffName}</CardTitle>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                              <Mail size={12} />
                              <span>{selectedStaffConversation.staffEmail}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {selectedStaffConversation.activities.length} messages
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4">
                      <div className="space-y-4">
                        {selectedStaffConversation.activities.map((activity) => {
                          const content = getActivityContent(activity);
                          
                          return (
                            <div key={activity.id} className="border rounded-lg p-4 bg-gray-50">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                  {getActivityIcon(activity.type, activity.direction)}
                                  <div>
                                    <span className="font-medium capitalize">{activity.type || 'Message'}</span>
                                    {activity.direction && (
                                      <span className="ml-2 text-sm text-gray-500 capitalize">({activity.direction})</span>
                                    )}
                                  </div>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(activity.date_created).toLocaleString()}
                                </span>
                              </div>

                              {activity.subject && (
                                <div className="mb-2">
                                  <strong className="text-sm">Subject:</strong> 
                                  <span className="ml-2">{activity.subject}</span>
                                </div>
                              )}

                              {activity.to && activity.to.length > 0 && (
                                <div className="mb-2">
                                  <strong className="text-sm">To:</strong> 
                                  <span className="ml-2">{activity.to.join(', ')}</span>
                                </div>
                              )}

                              {activity.from && (
                                <div className="mb-2">
                                  <strong className="text-sm">From:</strong> 
                                  <span className="ml-2">{activity.from}</span>
                                </div>
                              )}

                              {content && content !== 'No content available' && (
                                <div className="mt-3">
                                  <strong className="text-sm">Message:</strong>
                                  <div className="mt-2 p-3 bg-white rounded border text-sm whitespace-pre-wrap">
                                    {content.length > 500 ? `${content.substring(0, 500)}...` : content}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                    
                    {/* Reply Section */}
                    <div className="border-t p-4">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Reply to {selectedStaffConversation.staffName}
                          </label>
                        </div>
                        <Textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Type your message here..."
                          className="min-h-[100px] resize-none"
                        />
                        <div className="flex justify-end">
                          <Button
                            onClick={handleSendReply}
                            disabled={!replyContent.trim() || isSendingReply}
                            className="bg-avaana-primary text-white hover:bg-avaana-secondary"
                          >
                            {isSendingReply ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <SendIcon className="w-4 h-4 mr-2" />
                            )}
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    {lookupLoading ? (
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                        <p>Loading your communication history...</p>
                      </div>
                    ) : (
                      <p>Select a staff member to view your conversation history</p>
                    )}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="debug" className="mt-6">
          <CloseCrmDebug />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Communication;

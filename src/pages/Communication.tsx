
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserIcon, SendIcon, Mail, Phone, Loader2, Plus, RefreshCw, History, CheckCircle, AlertCircle, Bug } from 'lucide-react';
import { useStaffContacts, useConversationThreads, useMessages, useSendMessage, useCreateThread, useSyncCloseContacts, useSyncUserHistory, useUserSyncStatus } from '@/hooks/useCommunication';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Communication = () => {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newMessageStaff, setNewMessageStaff] = useState('');
  const [newMessageSubject, setNewMessageSubject] = useState('');

  const { data: staffContacts, isLoading: staffLoading } = useStaffContacts();
  const { data: threads, isLoading: threadsLoading } = useConversationThreads();
  const { data: messages, isLoading: messagesLoading } = useMessages(selectedThreadId);
  const { data: syncStatus } = useUserSyncStatus();
  const sendMessage = useSendMessage();
  const createThread = useCreateThread();
  const syncContacts = useSyncCloseContacts();
  const syncUserHistory = useSyncUserHistory();

  // Auto-sync user history on first load if not already synced
  useEffect(() => {
    if (syncStatus === null || syncStatus?.sync_status === 'pending') {
      console.log('Auto-syncing user history...');
      syncUserHistory.mutate();
    }
  }, [syncStatus]);

  // Select first thread if none selected
  useEffect(() => {
    if (threads && threads.length > 0 && !selectedThreadId) {
      setSelectedThreadId(threads[0].id);
    }
  }, [threads, selectedThreadId]);

  const selectedThread = threads?.find(t => t.id === selectedThreadId);
  const selectedStaff = selectedThread?.close_crm_contacts;

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

  const handleSyncContacts = async () => {
    try {
      await syncContacts.mutateAsync();
      toast({
        title: 'Contacts Synced',
        description: 'Close CRM contacts have been synced successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Sync Error',
        description: error.message || 'Failed to sync contacts',
        variant: 'destructive',
      });
    }
  };

  const handleSyncUserHistory = async () => {
    try {
      const result = await syncUserHistory.mutateAsync();
      toast({
        title: 'History Synced',
        description: result.message || 'User communication history synced successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Sync Error',
        description: error.message || 'Failed to sync user history',
        variant: 'destructive',
      });
    }
  };

  const handleForceSyncUserHistory = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('No valid session found');
      }

      const response = await fetch('https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-sync-user-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybmp4Z2Z6emJleGpheXRzenZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MjkxOTcsImV4cCI6MjA2MzIwNTE5N30.euI15LNkMP1IMWojTAetE75ecjqrk-2Audt64AyMel4',
        },
        body: JSON.stringify({ forceSync: true }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      
      toast({
        title: 'Force Sync Completed',
        description: `${result.message || 'Force sync completed'}${result.importedCount ? ` - ${result.importedCount} new messages imported` : ''}`,
      });

      // Refresh the data
      window.location.reload();
    } catch (error: any) {
      console.error('Force sync error:', error);
      toast({
        title: 'Force Sync Error',
        description: error.message || 'Failed to force sync user history',
        variant: 'destructive',
      });
    }
  };

  const getSyncStatusDisplay = () => {
    if (!syncStatus) return null;
    
    switch (syncStatus.sync_status) {
      case 'completed':
        return (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle size={16} />
            <span>History synced</span>
            {syncStatus.last_synced_at && (
              <span className="text-gray-500">
                ({new Date(syncStatus.last_synced_at).toLocaleDateString()})
              </span>
            )}
          </div>
        );
      case 'in_progress':
        return (
          <div className="flex items-center gap-2 text-blue-600 text-sm">
            <Loader2 size={16} className="animate-spin" />
            <span>Syncing history...</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={16} />
            <span>Sync failed</span>
          </div>
        );
      case 'no_contact_found':
        return (
          <div className="flex items-center gap-2 text-yellow-600 text-sm">
            <AlertCircle size={16} />
            <span>No matching contact found</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl text-gray-900 font-normal">Communication Center</h1>
          {getSyncStatusDisplay()}
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleSyncUserHistory}
            disabled={syncUserHistory.isPending}
            variant="outline"
            className="px-4 py-2 rounded-md"
          >
            {syncUserHistory.isPending ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <History size={16} className="mr-2" />
            )}
            Sync My History
          </Button>
          <Button 
            onClick={handleForceSyncUserHistory}
            disabled={syncUserHistory.isPending}
            variant="outline"
            className="px-4 py-2 rounded-md border-orange-300 text-orange-600 hover:bg-orange-50"
          >
            <Bug size={16} className="mr-2" />
            Force Sync (Debug)
          </Button>
          <Button 
            onClick={handleSyncContacts}
            disabled={syncContacts.isPending}
            variant="outline"
            className="px-4 py-2 rounded-md"
          >
            {syncContacts.isPending ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <RefreshCw size={16} className="mr-2" />
            )}
            Sync Contacts
          </Button>
          <Button 
            onClick={() => setShowNewMessage(true)}
            className="bg-avaana-primary text-white px-4 py-2 rounded-md hover:bg-avaana-secondary transition-colors"
          >
            <Plus size={16} className="mr-2" />
            New Message
          </Button>
        </div>
      </div>

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
                {threadsLoading ? (
                  <div className="p-4 text-center">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                  </div>
                ) : threads?.length ? (
                  threads.map(thread => (
                    <div 
                      key={thread.id}
                      className={`cursor-pointer border-b hover:bg-gray-50 ${
                        selectedThreadId === thread.id ? 'border-l-4 border-avaana-primary bg-gray-50' : ''
                      }`}
                      onClick={() => setSelectedThreadId(thread.id)}
                    >
                      <div className="p-4">
                        <div className="flex justify-between">
                          <div className="font-normal">{thread.close_crm_contacts.name}</div>
                          <div className="text-xs text-gray-500">
                            {thread.last_message_at ? 
                              new Date(thread.last_message_at).toLocaleDateString() : 
                              'No messages'
                            }
                          </div>
                        </div>
                        <div className="text-sm truncate text-gray-600">
                          {thread.subject || 'No subject'}
                        </div>
                        <div className="flex justify-between mt-1">
                          <div className="text-xs text-gray-500">
                            {thread.close_crm_contacts.role}
                          </div>
                          {thread.unread_count > 0 && (
                            <div className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {thread.unread_count}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No conversations yet. Click "New Message" to start one.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-12rem)] flex flex-col">
            {selectedStaff ? (
              <>
                <CardHeader className="pb-3 border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-avaana-primary h-10 w-10 rounded-full flex items-center justify-center text-white">
                        <UserIcon size={20} />
                      </div>
                      <div>
                        <CardTitle className="text-base font-normal">{selectedStaff.name}</CardTitle>
                        <div className="text-sm text-gray-500">{selectedStaff.role}</div>
                        <div className="flex items-center gap-4 mt-1">
                          {selectedStaff.email && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Mail size={12} />
                              <span>{selectedStaff.email}</span>
                            </div>
                          )}
                          {selectedStaff.phone && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Phone size={12} />
                              <span>{selectedStaff.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Tabs defaultValue="messages" className="w-[320px]">
                        <TabsList className="bg-gray-100 grid w-full grid-cols-3 rounded-lg h-8">
                          <TabsTrigger value="messages" className="text-xs rounded-md data-[state=active]:bg-white data-[state=active]:text-avaana-primary h-7">
                            Messages
                          </TabsTrigger>
                          <TabsTrigger value="files" className="text-xs rounded-md data-[state=active]:bg-white data-[state=active]:text-avaana-primary h-7">
                            Files
                          </TabsTrigger>
                          <TabsTrigger value="tasks" className="text-xs rounded-md data-[state=active]:bg-white data-[state=active]:text-avaana-primary h-7">
                            Tasks
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messagesLoading ? (
                      <div className="text-center">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                      </div>
                    ) : messages?.length ? (
                      messages.map(message => (
                        <div key={message.id} className={`flex ${message.sender_type === 'staff' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[70%] rounded-lg p-4 ${
                            message.sender_type === 'staff' 
                              ? 'bg-gray-100 text-gray-800' 
                              : 'bg-avaana-primary text-white'
                          }`}>
                            <div className="flex justify-between items-start mb-1">
                              <div className="font-normal">
                                {message.sender_type === 'staff' ? 
                                  (message.staff_name || selectedStaff.name) : 
                                  'You'
                                }
                              </div>
                              <div className="flex flex-col items-end">
                                <div className={`text-xs ${
                                  message.sender_type === 'staff' ? 'text-gray-500' : 'text-white/80'
                                }`}>
                                  {new Date(message.sent_at).toLocaleString()}
                                </div>
                                {message.is_historical && (
                                  <div className={`text-xs ${
                                    message.sender_type === 'staff' ? 'text-gray-400' : 'text-white/60'
                                  } flex items-center gap-1 mt-1`}>
                                    <History size={10} />
                                    <span>{message.message_type}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="whitespace-pre-line">{message.content}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500">
                        No messages in this conversation yet. Start the conversation below!
                      </div>
                    )}
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type your message..." 
                      className="flex-1"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!messageContent.trim() || sendMessage.isPending || !selectedStaff.email}
                      className="bg-avaana-primary text-white p-2 rounded-md hover:bg-avaana-secondary transition-colors"
                    >
                      {sendMessage.isPending ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <SendIcon size={20} />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a conversation to start messaging or create a new one
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Communication;

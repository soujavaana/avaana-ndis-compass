
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Search, User, Mail, Phone, Calendar, Activity, Users, MessageSquare, FileText, PhoneCall, Clock, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

const CloseCrmDebug = () => {
  const [email, setEmail] = useState('ndis12345@gmail.com');
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState<CloseContact | null>(null);
  const [activities, setActivities] = useState<CloseActivity[]>([]);
  const [users, setUsers] = useState<{ [key: string]: CloseUser }>({});
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    console.log(`[Close CRM Debug] ${message}`);
  };

  const getActivityIcon = (type: string, direction?: string) => {
    switch (type) {
      case 'email':
        return direction === 'outbound' ? 
          <ArrowUpRight size={16} className="text-blue-500" /> : 
          <ArrowDownLeft size={16} className="text-blue-600" />;
      case 'sms':
        return <MessageSquare size={16} className="text-green-500" />;
      case 'call':
        return <PhoneCall size={16} className="text-purple-500" />;
      case 'note':
        return <FileText size={16} className="text-gray-500" />;
      case 'unknown':
        return <Clock size={16} className="text-yellow-500" />;
      default:
        return <Activity size={16} className="text-gray-400" />;
    }
  };

  const getActivityContent = (activity: CloseActivity) => {
    const content = activity.body_text || activity.body_html || activity.text || activity.note || activity.body;
    if (content) return content;
    
    // If no content, show some basic info from raw data
    if (activity.raw_data) {
      const rawData = activity.raw_data;
      if (rawData.template_name) return `Template: ${rawData.template_name}`;
      if (rawData.summary) return rawData.summary;
      if (rawData.description) return rawData.description;
    }
    
    return 'No content available';
  };

  const lookupContact = async () => {
    if (!email.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setContactData(null);
    setActivities([]);
    setUsers({});
    setLogs([]);

    try {
      addLog(`Starting lookup for email: ${email}`);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('No valid session found');
      }

      addLog('Valid session found, calling Close CRM lookup edge function...');

      const response = await fetch('https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybmp4Z2Z6emJleGpheXRzenZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MjkxOTcsImV4cCI6MjA2MzIwNTE5N30.euI15LNkMP1IMWojTAetE75ecjqrk-2Audt64AyMel4',
        },
        body: JSON.stringify({ email }),
      });

      addLog(`Edge function response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        addLog(`Edge function error: ${errorText}`);
        throw new Error(`Lookup failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      addLog(`Lookup completed: ${JSON.stringify(result)}`);

      if (result.contact) {
        setContactData(result.contact);
        addLog(`Contact found: ${result.contact.name} (ID: ${result.contact.id}, Lead ID: ${result.contact.lead_id})`);
      } else {
        addLog('No contact found with that email address');
        toast({
          title: 'Contact Not Found',
          description: `No contact found in Close CRM for email: ${email}`,
          variant: 'destructive',
        });
      }

      if (result.activities) {
        setActivities(result.activities);
        addLog(`Found ${result.activities.length} activities`);
        
        const activityTypes = result.activities.reduce((acc: any, activity: CloseActivity) => {
          acc[activity.type] = (acc[activity.type] || 0) + 1;
          return acc;
        }, {});
        addLog(`Activity types: ${JSON.stringify(activityTypes)}`);
      }

      if (result.users) {
        setUsers(result.users);
        addLog(`Found ${Object.keys(result.users).length} Close CRM users`);
      }

    } catch (error: any) {
      addLog(`Error: ${error.message}`);
      console.error('Close CRM lookup error:', error);
      toast({
        title: 'Lookup Error',
        description: error.message || 'Failed to lookup contact in Close CRM',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search size={20} />
            Close CRM Contact Lookup & Debug
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address to lookup..."
              className="flex-1"
            />
            <Button onClick={lookupContact} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Lookup
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            This tool uses a Supabase Edge Function to safely call the Close CRM API and fetch all lead activities.
          </p>
        </CardContent>
      </Card>

      {contactData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div><strong>Name:</strong> {contactData.name}</div>
              <div><strong>Contact ID:</strong> {contactData.id}</div>
              <div><strong>Lead ID:</strong> {contactData.lead_id}</div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <strong>Emails:</strong>
                {contactData.emails?.map((email, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {email.email} ({email.type})
                  </span>
                ))}
              </div>
              {contactData.phones?.length > 0 && (
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <strong>Phones:</strong>
                  {contactData.phones.map((phone, index) => (
                    <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {phone.phone} ({phone.type})
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <strong>Created:</strong> {new Date(contactData.date_created).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {Object.keys(users).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Close CRM Users ({Object.keys(users).length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {Object.values(users).map((user) => (
                <div key={user.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{user.display_name}</span>
                    <span className="text-sm text-gray-500 ml-2">{user.email}</span>
                  </div>
                  <span className="text-xs text-gray-400">{user.id}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={20} />
              All Activities & Messages ({activities.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {activities.map((activity) => {
                const user = users[activity.user_id];
                const content = getActivityContent(activity);
                
                return (
                  <div key={activity.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        {getActivityIcon(activity.type, activity.direction)}
                        <div>
                          <span className="font-medium capitalize">{activity.type || 'Unknown'}</span>
                          {activity.direction && (
                            <span className="ml-2 text-sm text-gray-500 capitalize">({activity.direction})</span>
                          )}
                          {user && (
                            <div className="text-sm text-blue-600">
                              by {user.display_name} ({user.email})
                            </div>
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

                    {activity.status && (
                      <div className="mb-2">
                        <strong className="text-sm">Status:</strong> 
                        <span className="ml-2 capitalize">{activity.status}</span>
                      </div>
                    )}

                    {activity.duration && (
                      <div className="mb-2">
                        <strong className="text-sm">Duration:</strong> 
                        <span className="ml-2">{activity.duration} seconds</span>
                      </div>
                    )}

                    {activity.phone && (
                      <div className="mb-2">
                        <strong className="text-sm">Phone:</strong> 
                        <span className="ml-2">{activity.phone}</span>
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
                        <strong className="text-sm">Content:</strong>
                        <div className="mt-2 p-3 bg-white rounded border text-sm whitespace-pre-wrap">
                          {content.length > 500 ? `${content.substring(0, 500)}...` : content}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-gray-400 mt-3 pt-2 border-t">
                      Activity ID: {activity.id} | User ID: {activity.user_id}
                      {activity.contact_id && ` | Contact ID: ${activity.contact_id}`}
                      {activity.lead_id && ` | Lead ID: ${activity.lead_id}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {logs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Debug Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-60 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CloseCrmDebug;

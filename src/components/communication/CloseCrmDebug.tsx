
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Search, User, Mail, Phone, Calendar, Activity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CloseContact {
  id: string;
  name: string;
  emails: Array<{ email: string; type: string }>;
  phones: Array<{ phone: string; type: string }>;
  date_created: string;
  date_updated: string;
}

interface CloseActivity {
  id: string;
  type: string;
  date_created: string;
  subject?: string;
  body_text?: string;
  text?: string;
  note?: string;
  direction?: string;
  status?: string;
}

const CloseCrmDebug = () => {
  const [email, setEmail] = useState('ndis12345@gmail.com');
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState<CloseContact | null>(null);
  const [activities, setActivities] = useState<CloseActivity[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    console.log(`[Close CRM Debug] ${message}`);
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
    setLogs([]);

    try {
      addLog(`Starting lookup for email: ${email}`);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('No valid session found');
      }

      addLog('Valid session found, proceeding with Close CRM lookup...');

      // Search for contact by email
      const searchParams = new URLSearchParams();
      searchParams.append('query', `email:"${email}"`);
      
      addLog(`Searching Close CRM with query: email:"${email}"`);

      const contactResponse = await fetch(`https://api.close.com/api/v1/contact/?${searchParams}`, {
        headers: {
          'Authorization': 'Basic ' + btoa('sk_test_VHaUc1t0SLKCWqQ3zFHAAU:'),
          'Content-Type': 'application/json',
        },
      });

      addLog(`Contact search response status: ${contactResponse.status}`);

      if (!contactResponse.ok) {
        const errorText = await contactResponse.text();
        addLog(`Contact search error: ${errorText}`);
        throw new Error(`Contact search failed: ${contactResponse.status} - ${errorText}`);
      }

      const contactResult = await contactResponse.json();
      addLog(`Found ${contactResult.data?.length || 0} contacts`);

      if (contactResult.data && contactResult.data.length > 0) {
        const contact = contactResult.data[0];
        setContactData(contact);
        addLog(`Contact found: ${contact.name} (ID: ${contact.id})`);

        // Fetch activities for this contact
        addLog('Fetching activities for contact...');
        
        const activitiesResponse = await fetch(`https://api.close.com/api/v1/activity/?contact_id=${contact.id}&_limit=20`, {
          headers: {
            'Authorization': 'Basic ' + btoa('sk_test_VHaUc1t0SLKCWqQ3zFHAAU:'),
            'Content-Type': 'application/json',
          },
        });

        addLog(`Activities response status: ${activitiesResponse.status}`);

        if (activitiesResponse.ok) {
          const activitiesResult = await activitiesResponse.json();
          setActivities(activitiesResult.data || []);
          addLog(`Found ${activitiesResult.data?.length || 0} activities`);
          
          // Log activity types
          const activityTypes = activitiesResult.data?.reduce((acc: any, activity: CloseActivity) => {
            acc[activity.type] = (acc[activity.type] || 0) + 1;
            return acc;
          }, {});
          addLog(`Activity types: ${JSON.stringify(activityTypes)}`);
        } else {
          const errorText = await activitiesResponse.text();
          addLog(`Activities fetch error: ${errorText}`);
        }
      } else {
        addLog('No contact found with that email address');
        toast({
          title: 'Contact Not Found',
          description: `No contact found in Close CRM for email: ${email}`,
          variant: 'destructive',
        });
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
              <div><strong>ID:</strong> {contactData.id}</div>
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

      {activities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={20} />
              Recent Activities ({activities.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {activities.map((activity) => (
                <div key={activity.id} className="border rounded p-3 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{activity.type}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(activity.date_created).toLocaleString()}
                    </span>
                  </div>
                  {activity.subject && (
                    <div className="text-sm"><strong>Subject:</strong> {activity.subject}</div>
                  )}
                  {activity.direction && (
                    <div className="text-sm"><strong>Direction:</strong> {activity.direction}</div>
                  )}
                  {activity.status && (
                    <div className="text-sm"><strong>Status:</strong> {activity.status}</div>
                  )}
                  {(activity.body_text || activity.text || activity.note) && (
                    <div className="text-sm mt-2">
                      <strong>Content:</strong> {activity.body_text || activity.text || activity.note}
                    </div>
                  )}
                </div>
              ))}
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

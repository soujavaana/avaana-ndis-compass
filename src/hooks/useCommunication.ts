
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface StaffContact {
  id: string;
  close_contact_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: string | null;
  avatar_url: string | null;
}

export interface ConversationThread {
  id: string;
  staff_contact_id: string;
  subject: string | null;
  last_message_at: string | null;
  unread_count: number;
  close_crm_contacts: StaffContact;
}

export interface Message {
  id: string;
  thread_id: string;
  sender_type: 'user' | 'staff';
  content: string;
  message_type: 'email' | 'sms';
  sent_at: string;
  delivered_at: string | null;
  read_at: string | null;
  is_historical: boolean | null;
  staff_name: string | null;
  staff_email: string | null;
}

export interface UserSyncStatus {
  id: string;
  user_id: string;
  last_synced_at: string | null;
  sync_status: string;
  created_at: string;
  updated_at: string;
}

export const useStaffContacts = () => {
  return useQuery({
    queryKey: ['staff-contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('close_crm_contacts')
        .select('*')
        .eq('is_staff', true)
        .order('name');

      if (error) throw error;
      return data as StaffContact[];
    },
  });
};

export const useConversationThreads = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['conversation-threads', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('No user');

      const { data, error } = await supabase
        .from('conversation_threads')
        .select(`
          *,
          close_crm_contacts (*)
        `)
        .eq('user_id', user.id)
        .order('last_message_at', { ascending: false });

      if (error) throw error;
      return data as ConversationThread[];
    },
    enabled: !!user,
  });
};

export const useMessages = (threadId: string | null) => {
  return useQuery({
    queryKey: ['messages', threadId],
    queryFn: async () => {
      if (!threadId) return [];

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('sent_at', { ascending: true });

      if (error) throw error;
      return data as Message[];
    },
    enabled: !!threadId,
  });
};

export const useUserSyncStatus = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-sync-status', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('No user');

      const { data, error } = await supabase
        .from('user_sync_status')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
      return data as UserSyncStatus | null;
    },
    enabled: !!user,
  });
};

export const useSyncUserHistory = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      console.log('Starting sync user history...');
      
      const response = await fetch(`https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-sync-user-history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybmp4Z2Z6emJleGpheXRzenZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MjkxOTcsImV4cCI6MjA2MzIwNTE5N30.euI15LNkMP1IMWojTAetE75ecjqrk-2Audt64AyMel4',
        },
      });

      console.log('Sync response status:', response.status);
      console.log('Sync response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Failed to sync user history';
        
        if (contentType && contentType.includes('application/json')) {
          try {
            const error = await response.json();
            errorMessage = error.error || errorMessage;
          } catch (e) {
            console.error('Failed to parse error response as JSON:', e);
          }
        } else {
          const textError = await response.text();
          console.error('Non-JSON error response:', textError);
          errorMessage = textError || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Sync completed successfully:', result);
      return result;
    },
    onSuccess: () => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ['conversation-threads', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['user-sync-status', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: (error) => {
      console.error('Sync error:', error);
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ 
      threadId, 
      content, 
      recipientEmail, 
      subject 
    }: { 
      threadId: string; 
      content: string; 
      recipientEmail: string; 
      subject?: string; 
    }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const response = await fetch('https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybmp4Z2Z6emJleGpheXRzenZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MjkxOTcsImV4cCI6MjA2MzIwNTE5N30.euI15LNkMP1IMWojTAetE75ecjqrk-2Audt64AyMel4',
        },
        body: JSON.stringify({
          threadId,
          content,
          recipientEmail,
          subject,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send message');
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ['messages', variables.threadId] });
      queryClient.invalidateQueries({ queryKey: ['conversation-threads', user?.id] });
    },
  });
};

export const useCreateThread = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ 
      staffContactId, 
      subject 
    }: { 
      staffContactId: string; 
      subject: string; 
    }) => {
      if (!user) throw new Error('No user');

      const { data, error } = await supabase
        .from('conversation_threads')
        .insert({
          user_id: user.id,
          staff_contact_id: staffContactId,
          subject,
          last_message_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversation-threads', user?.id] });
    },
  });
};

export const useSyncCloseContacts = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch('https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybmp4Z2Z6emJleGpheXRzenZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MjkxOTcsImV4cCI6MjA2MzIwNTE5N30.euI15LNkMP1IMWojTAetE75ecjqrk-2Audt64AyMel4',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to sync contacts');
      }

      return response.json();
    },
  });
};

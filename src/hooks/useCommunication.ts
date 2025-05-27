
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

      const response = await fetch('/functions/v1/close-crm-send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
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

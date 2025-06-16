
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
type KeyPersonnel = Database['public']['Tables']['key_personnel']['Row'];
type KeyPersonnelInsert = Database['public']['Tables']['key_personnel']['Insert'];
type KeyPersonnelUpdate = Database['public']['Tables']['key_personnel']['Update'];
type Shareholder = Database['public']['Tables']['shareholders']['Row'];
type ShareholderInsert = Database['public']['Tables']['shareholders']['Insert'];
type ShareholderUpdate = Database['public']['Tables']['shareholders']['Update'];

export function useProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user ID');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (updates: ProfileUpdate) => {
      if (!user?.id) throw new Error('No user ID');
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

export function useKeyPersonnel() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['key-personnel', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user ID');
      
      const { data, error } = await supabase
        .from('key_personnel')
        .select('*')
        .eq('profile_id', user.id)
        .order('key_number', { ascending: true });
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
}

export function useAddKeyPersonnel() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (personnel: Omit<KeyPersonnelInsert, 'profile_id'>) => {
      if (!user?.id) throw new Error('No user ID');
      
      const { data, error } = await supabase
        .from('key_personnel')
        .insert({ ...personnel, profile_id: user.id })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['key-personnel'] });
    },
  });
}

export function useUpdateKeyPersonnel() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: KeyPersonnelUpdate }) => {
      const { data, error } = await supabase
        .from('key_personnel')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['key-personnel'] });
    },
  });
}

export function useDeleteKeyPersonnel() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('key_personnel')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['key-personnel'] });
    },
  });
}

export function useShareholders() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['shareholders', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user ID');
      
      const { data, error } = await supabase
        .from('shareholders')
        .select('*')
        .eq('profile_id', user.id);
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
}

export function useAddShareholder() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (shareholder: Omit<ShareholderInsert, 'profile_id'>) => {
      if (!user?.id) throw new Error('No user ID');
      
      const { data, error } = await supabase
        .from('shareholders')
        .insert({ ...shareholder, profile_id: user.id })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shareholders'] });
    },
  });
}

export function useDeleteShareholder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('shareholders')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shareholders'] });
    },
  });
}

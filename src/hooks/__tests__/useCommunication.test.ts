
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSyncUserHistory, useStaffContacts, useConversationThreads } from '../useCommunication';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// Mock dependencies
jest.mock('@/integrations/supabase/client');
jest.mock('@/contexts/AuthContext');

const mockSupabase = supabase as jest.Mocked<typeof supabase>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock fetch globally
global.fetch = jest.fn();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCommunication hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      user: { id: 'test-user-id', email: 'test@example.com' },
      session: { access_token: 'test-token' },
    } as any);
  });

  describe('useSyncUserHistory', () => {
    it('should successfully sync user history', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: { access_token: 'test-token' } },
        error: null,
      } as any);

      const mockResponse = {
        success: true,
        importedCount: 5,
        closeContactId: 'contact-123',
        message: 'Imported 5 historical messages',
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve(mockResponse),
      });

      const { result } = renderHook(() => useSyncUserHistory(), {
        wrapper: createWrapper(),
      });

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-sync-user-history',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
            'apikey': expect.any(String),
          }),
        })
      );
    });

    it('should handle API errors with JSON response', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: { access_token: 'test-token' } },
        error: null,
      } as any);

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 400,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve({ error: 'No matching contact found' }),
      });

      const { result } = renderHook(() => useSyncUserHistory(), {
        wrapper: createWrapper(),
      });

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error?.message).toBe('No matching contact found');
    });

    it('should handle API errors with text response', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: { access_token: 'test-token' } },
        error: null,
      } as any);

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        headers: new Headers({ 'content-type': 'text/plain' }),
        text: () => Promise.resolve('Internal Server Error'),
      });

      const { result } = renderHook(() => useSyncUserHistory(), {
        wrapper: createWrapper(),
      });

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error?.message).toBe('Internal Server Error');
    });

    it('should handle network errors', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: { access_token: 'test-token' } },
        error: null,
      } as any);

      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() => useSyncUserHistory(), {
        wrapper: createWrapper(),
      });

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error?.message).toBe('Network error');
    });

    it('should handle missing session', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      } as any);

      const { result } = renderHook(() => useSyncUserHistory(), {
        wrapper: createWrapper(),
      });

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error?.message).toBe('No session');
    });
  });

  describe('useStaffContacts', () => {
    it('should fetch staff contacts successfully', async () => {
      const mockContacts = [
        {
          id: '1',
          close_contact_id: 'contact-1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          role: 'Support Agent',
          avatar_url: null,
        },
        {
          id: '2',
          close_contact_id: 'contact-2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '098-765-4321',
          role: 'Account Manager',
          avatar_url: null,
        },
      ];

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({
              data: mockContacts,
              error: null,
            }),
          }),
        }),
      } as any);

      const { result } = renderHook(() => useStaffContacts(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockContacts);
    });
  });

  describe('useConversationThreads', () => {
    it('should fetch conversation threads for authenticated user', async () => {
      const mockThreads = [
        {
          id: 'thread-1',
          staff_contact_id: 'contact-1',
          subject: 'Support Request',
          last_message_at: '2024-01-15T10:00:00Z',
          unread_count: 2,
          close_crm_contacts: {
            id: 'contact-1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Support Agent',
          },
        },
      ];

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({
              data: mockThreads,
              error: null,
            }),
          }),
        }),
      } as any);

      const { result } = renderHook(() => useConversationThreads(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockThreads);
    });

    it('should not fetch threads when user is not authenticated', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        session: null,
      } as any);

      const { result } = renderHook(() => useConversationThreads(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isIdle).toBe(true);
      expect(mockSupabase.from).not.toHaveBeenCalled();
    });
  });
});

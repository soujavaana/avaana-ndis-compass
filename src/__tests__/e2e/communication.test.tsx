import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import Communication from '@/pages/Communication';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

// Mock dependencies
jest.mock('@/contexts/AuthContext');
jest.mock('@/hooks/use-toast');
jest.mock('@/integrations/supabase/client');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockToast = toast as jest.MockedFunction<typeof toast>;

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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('Communication Page E2E Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseAuth.mockReturnValue({
      user: { id: 'test-user-id', email: 'test@example.com' },
      session: { access_token: 'test-token' },
    } as any);

    // Mock successful queries by default
    jest.doMock('@/hooks/useCommunication', () => ({
      useStaffContacts: () => ({
        data: [
          {
            id: '1',
            close_contact_id: 'contact-1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Support Agent',
          },
        ],
        isLoading: false,
      }),
      useConversationThreads: () => ({
        data: [
          {
            id: 'thread-1',
            staff_contact_id: '1',
            subject: 'Support Request',
            last_message_at: '2024-01-15T10:00:00Z',
            unread_count: 0,
            close_crm_contacts: {
              id: '1',
              name: 'John Doe',
              email: 'john@example.com',
              role: 'Support Agent',
            },
          },
        ],
        isLoading: false,
      }),
      useMessages: () => ({
        data: [
          {
            id: 'msg-1',
            thread_id: 'thread-1',
            sender_type: 'staff',
            content: 'Hello! How can I help you today?',
            message_type: 'email',
            sent_at: '2024-01-15T10:00:00Z',
            is_historical: true,
            staff_name: 'John Doe',
          },
          {
            id: 'msg-2',
            thread_id: 'thread-1',
            sender_type: 'user',
            content: 'I need help with my account setup.',
            message_type: 'email',
            sent_at: '2024-01-15T10:05:00Z',
            is_historical: true,
          },
        ],
        isLoading: false,
      }),
      useUserSyncStatus: () => ({
        data: {
          id: 'sync-1',
          user_id: 'test-user-id',
          sync_status: 'completed',
          last_synced_at: '2024-01-15T09:00:00Z',
        },
      }),
      useSyncUserHistory: () => ({
        mutate: jest.fn(),
        isPending: false,
        isSuccess: false,
        isError: false,
      }),
      useSyncCloseContacts: () => ({
        mutateAsync: jest.fn(),
        isPending: false,
      }),
      useSendMessage: () => ({
        mutateAsync: jest.fn(),
        isPending: false,
      }),
      useCreateThread: () => ({
        mutateAsync: jest.fn(),
        isPending: false,
      }),
    }));
  });

  it('should render communication page with all elements', async () => {
    render(<Communication />, { wrapper: createWrapper() });

    // Check main elements are present
    expect(screen.getByText('Communication Center')).toBeInTheDocument();
    expect(screen.getByText('Sync My History')).toBeInTheDocument();
    expect(screen.getByText('Sync Contacts')).toBeInTheDocument();
    expect(screen.getByText('New Message')).toBeInTheDocument();
    
    // Check conversation list
    expect(screen.getByText('Conversations')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Support Request')).toBeInTheDocument();
    
    // Check sync status display
    expect(screen.getByText('History synced')).toBeInTheDocument();
  });

  it('should display historical messages correctly', async () => {
    render(<Communication />, { wrapper: createWrapper() });

    // Wait for messages to load
    await waitFor(() => {
      expect(screen.getByText('Hello! How can I help you today?')).toBeInTheDocument();
      expect(screen.getByText('I need help with my account setup.')).toBeInTheDocument();
    });

    // Check that historical indicators are shown
    const historyIcons = screen.getAllByTestId('history-icon');
    expect(historyIcons).toHaveLength(2);
  });

  it('should handle sync history button click', async () => {
    const mockMutate = jest.fn();
    
    jest.doMock('@/hooks/useCommunication', () => ({
      useSyncUserHistory: () => ({
        mutate: mockMutate,
        isPending: false,
        isSuccess: false,
        isError: false,
      }),
    }));

    render(<Communication />, { wrapper: createWrapper() });

    const syncButton = screen.getByText('Sync My History');
    fireEvent.click(syncButton);

    expect(mockMutate).toHaveBeenCalled();
  });

  it('should show success toast after successful sync', async () => {
    const mockMutateAsync = jest.fn().mockResolvedValue({
      success: true,
      importedCount: 5,
      message: 'Imported 5 historical messages',
    });

    jest.doMock('@/hooks/useCommunication', () => ({
      useSyncUserHistory: () => ({
        mutateAsync: mockMutateAsync,
        isPending: false,
        isSuccess: true,
        isError: false,
      }),
    }));

    render(<Communication />, { wrapper: createWrapper() });

    const syncButton = screen.getByText('Sync My History');
    fireEvent.click(syncButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'History Synced',
        description: 'Imported 5 historical messages',
      });
    });
  });

  it('should show error toast on sync failure', async () => {
    const mockMutateAsync = jest.fn().mockRejectedValue(
      new Error('No matching contact found')
    );

    jest.doMock('@/hooks/useCommunication', () => ({
      useSyncUserHistory: () => ({
        mutateAsync: mockMutateAsync,
        isPending: false,
        isSuccess: false,
        isError: true,
      }),
    }));

    render(<Communication />, { wrapper: createWrapper() });

    const syncButton = screen.getByText('Sync My History');
    fireEvent.click(syncButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Sync Error',
        description: 'No matching contact found',
        variant: 'destructive',
      });
    });
  });

  it('should open new message modal when clicking New Message', async () => {
    render(<Communication />, { wrapper: createWrapper() });

    const newMessageButton = screen.getByText('New Message');
    fireEvent.click(newMessageButton);

    await waitFor(() => {
      expect(screen.getByText('New Message')).toBeInTheDocument();
      expect(screen.getByText('Staff Member')).toBeInTheDocument();
      expect(screen.getByText('Subject')).toBeInTheDocument();
    });
  });

  it('should display different sync status states correctly', async () => {
    // Test in_progress state
    jest.doMock('@/hooks/useCommunication', () => ({
      useUserSyncStatus: () => ({
        data: {
          sync_status: 'in_progress',
        },
      }),
    }));

    const { rerender } = render(<Communication />, { wrapper: createWrapper() });
    expect(screen.getByText('Syncing history...')).toBeInTheDocument();

    // Test error state
    jest.doMock('@/hooks/useCommunication', () => ({
      useUserSyncStatus: () => ({
        data: {
          sync_status: 'error',
        },
      }),
    }));

    rerender(<Communication />);
    expect(screen.getByText('Sync failed')).toBeInTheDocument();

    // Test no_contact_found state
    jest.doMock('@/hooks/useCommunication', () => ({
      useUserSyncStatus: () => ({
        data: {
          sync_status: 'no_contact_found',
        },
      }),
    }));

    rerender(<Communication />);
    expect(screen.getByText('No matching contact found')).toBeInTheDocument();
  });
});

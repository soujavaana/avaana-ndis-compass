import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import Communication from '../../pages/Communication';
import { useAuth } from '../../contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';

// Mock the AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock the communication hooks
jest.mock('../../hooks/useCommunication', () => ({
  useStaffContacts: () => ({ data: [], isLoading: false }),
  useConversationThreads: () => ({ data: [], isLoading: false }),
  useMessages: () => ({ data: [], isLoading: false }),
  useUserSyncStatus: () => ({ data: null }),
  useSendMessage: () => ({ mutateAsync: jest.fn(), isPending: false }),
  useCreateThread: () => ({ mutateAsync: jest.fn(), isPending: false }),
  useSyncCloseContacts: () => ({ mutateAsync: jest.fn(), isPending: false }),
  useSyncUserHistory: () => ({ mutate: jest.fn(), mutateAsync: jest.fn(), isPending: false }),
}));

// Mock the Layout component
jest.mock('../../components/layout/Layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>,
}));

// Mock Supabase
jest.mock('../../integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({
        data: { session: { access_token: 'mock-token' } }
      })
    }
  }
}));

// Mock toast
jest.mock('../../hooks/use-toast', () => ({
  toast: jest.fn(),
}));

describe('Communication Page', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 'test-user-id', email: 'test@example.com' },
      isAuthenticated: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  test('renders communication center', () => {
    renderWithProviders(<Communication />);
    
    expect(screen.getByText('Communication Center')).toBeInTheDocument();
  });

  test('shows debug tab', () => {
    renderWithProviders(<Communication />);
    
    expect(screen.getByText('Debug & Lookup')).toBeInTheDocument();
  });

  test('can switch to debug tab', async () => {
    renderWithProviders(<Communication />);
    
    const debugTab = screen.getByText('Debug & Lookup');
    fireEvent.click(debugTab);
    
    await waitFor(() => {
      expect(screen.getByText('Close CRM Contact Lookup & Debug')).toBeInTheDocument();
    });
  });
});

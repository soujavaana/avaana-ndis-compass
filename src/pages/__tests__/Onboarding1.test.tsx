
import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import Onboarding1 from '../Onboarding1';
import { toast } from '@/components/ui/use-toast';
import '@testing-library/jest-dom';

// Mock the toast
jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
}));

// Mock the Layout component
jest.mock('../../components/layout/Layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>,
}));

// Mock Supabase auth
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signUp: jest.fn().mockResolvedValue({
        data: { user: { id: '123' }, session: {} },
        error: null
      })
    },
    from: jest.fn().mockReturnThis(),
    upsert: jest.fn().mockResolvedValue({ error: null })
  },
}));

describe('Onboarding1 Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the start onboarding button', () => {
    render(<Onboarding1 />);
    
    expect(screen.getByText('Onboarding 1')).toBeInTheDocument();
    expect(screen.getByText('Start Onboarding Process')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Onboarding/i })).toBeInTheDocument();
  });

  test('clicking the start button initiates user creation', async () => {
    const mockSignUp = jest.fn().mockResolvedValue({
      data: { user: { id: '123' }, session: {} },
      error: null
    });
    
    require('@/integrations/supabase/client').supabase.auth.signUp = mockSignUp;
    
    render(<Onboarding1 />);
    
    fireEvent.click(screen.getByRole('button', { name: /Start Onboarding/i }));
    
    expect(screen.getByRole('button', { name: /Creating Account/i })).toBeInTheDocument();
    
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({
        title: "Success!"
      }));
    });
  });
});

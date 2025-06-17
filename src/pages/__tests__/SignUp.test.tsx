import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import SignUp from '../SignUp';
import '@testing-library/jest-dom';

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

// Mock the toast
jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
}));

describe('SignUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the sign up form', () => {
    render(<SignUp />);
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('allows signing up with valid email and password', async () => {
    const mockSignUp = jest.fn().mockResolvedValue({
      data: { user: { id: '123' }, session: {} },
      error: null
    });
    
    require('@/integrations/supabase/client').supabase.auth.signUp = mockSignUp;
    
    render(<SignUp />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    
    expect(screen.getByRole('button', { name: /Signing Up/i })).toBeInTheDocument();
    
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../SignUp';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Mock the toast
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mock the supabase client
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SignUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderSignUp = () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  };

  test('renders the signup form', () => {
    renderSignUp();
    expect(screen.getByText('Create your account')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
  });

  test('shows validation errors for invalid inputs', async () => {
    renderSignUp();
    
    // Click submit without entering data
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
    });
  });

  test('shows error when passwords do not match', async () => {
    renderSignUp();
    
    // Fill out the form with mismatching passwords
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'DifferentPassword123!' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    
    // Check for password mismatch error
    await waitFor(() => {
      expect(screen.getByText(/Passwords don't match/i)).toBeInTheDocument();
    });
  });

  test('successful signup redirects to onboarding demo page', async () => {
    // Mock successful signup
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: { user: { id: '123' } },
      error: null,
    });

    renderSignUp();
    
    // Fill out the form correctly
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'Password123!' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    
    // Check that the success message is shown and navigation occurs
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Account created successfully!");
      expect(mockNavigate).toHaveBeenCalledWith('/onboarding-demo');
    });
  });

  test('shows error message on signup failure', async () => {
    // Mock failed signup
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: 'User already exists' },
    });

    renderSignUp();
    
    // Fill out the form correctly
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'Password123!' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    
    // Check that the error message is shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('User already exists');
    });
  });
});

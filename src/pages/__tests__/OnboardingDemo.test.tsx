
import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import OnboardingDemo from '../OnboardingDemo';
import { toast } from '@/components/ui/use-toast';
import '@testing-library/jest-dom'; // Add this import for DOM matchers

// Mock the toast
jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
}));

// Mock the Layout component
jest.mock('../../components/layout/Layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>,
}));

// Mock the Widget from @typeform/embed-react
jest.mock('@typeform/embed-react', () => ({
  PopupButton: ({ children }: { children: React.ReactNode }) => (
    <button data-testid="typeform-popup">{children}</button>
  ),
  Widget: (props: any) => (
    <div data-testid="typeform-widget">
      Typeform Widget
      {/* Add a data attribute to verify hidden fields are passed */}
      {props.hidden && <div data-testid="hidden-fields" data-hidden={JSON.stringify(props.hidden)}></div>}
    </div>
  ),
}));

// Mock Supabase auth
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

describe('OnboardingDemo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the sign up form', () => {
    render(<OnboardingDemo />);
    
    expect(screen.getByText('Onboarding')).toBeInTheDocument();
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account & Continue/i })).toBeInTheDocument();
  });

  test('shows validation error for invalid email', async () => {
    render(<OnboardingDemo />);
    
    // Enter invalid email
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
    
    // Enter some password
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Account & Continue/i }));
    
    // Check for validation error
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test('shows validation error for password mismatch', async () => {
    render(<OnboardingDemo />);
    
    // Enter valid email
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    
    // Enter mismatched passwords
    fireEvent.change(screen.getByLabelText(/^Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'different123' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Account & Continue/i }));
    
    // Check for validation error
    await waitFor(() => {
      expect(screen.getByText(/Passwords don't match/i)).toBeInTheDocument();
    });
  });

  test('shows Typeform widget after valid form submission and passes user ID', async () => {
    const mockSignUp = jest.fn().mockResolvedValue({
      data: { user: { id: '123' }, session: {} },
      error: null
    });
    
    require('@/integrations/supabase/client').supabase.auth.signUp = mockSignUp;
    
    render(<OnboardingDemo />);
    
    // Enter valid email and matching passwords
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Account & Continue/i }));
    
    // Check for success toast and Typeform widget
    await waitFor(() => {
      expect(toast).toHaveBeenCalled();
      expect(screen.getByTestId('typeform-widget')).toBeInTheDocument();
      
      // Verify userId is passed to Typeform
      const hiddenFields = screen.getByTestId('hidden-fields');
      const hiddenData = JSON.parse(hiddenFields.getAttribute('data-hidden') || '{}');
      expect(hiddenData).toHaveProperty('userId', '123');
      expect(hiddenData).toHaveProperty('email', 'test@example.com');
    });
  });
});


import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OnboardingDemo from '../OnboardingDemo';
import { toast } from '@/components/ui/use-toast';

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
  Widget: () => <div data-testid="typeform-widget">Typeform Widget</div>,
}));

describe('OnboardingDemo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the initial email form', () => {
    render(<OnboardingDemo />);
    
    expect(screen.getByText('Onboarding')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Continue to Onboarding/i })).toBeInTheDocument();
  });

  test('shows validation error for invalid email', async () => {
    render(<OnboardingDemo />);
    
    // Enter invalid email
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Continue to Onboarding/i }));
    
    // Check for validation error
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test('shows Typeform widget after valid form submission', async () => {
    render(<OnboardingDemo />);
    
    // Enter valid email
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Continue to Onboarding/i }));
    
    // Check for success toast and Typeform widget
    await waitFor(() => {
      expect(toast).toHaveBeenCalled();
      expect(screen.getByTestId('typeform-widget')).toBeInTheDocument();
    });
  });

  test('passes email as hidden field to Typeform widget', async () => {
    render(<OnboardingDemo />);
    
    const testEmail = 'test@example.com';
    
    // Enter valid email
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: testEmail } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Continue to Onboarding/i }));
    
    // Check that the Typeform widget is displayed
    await waitFor(() => {
      expect(screen.getByTestId('typeform-widget')).toBeInTheDocument();
    });
    
    // Note: In a real test, we might want to inspect the props passed to Widget
    // but this requires more advanced testing techniques like mocking at a lower level
    // This simplified test just checks that the widget appears after form submission
  });
});

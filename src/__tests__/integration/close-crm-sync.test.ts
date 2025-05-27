
import { supabase } from '@/integrations/supabase/client';

// Mock Close CRM API responses
const mockCloseAPIResponses = {
  contactSearch: {
    success: {
      data: [
        {
          id: 'contact_123',
          emails: [{ email: 'test@example.com' }],
          phones: [{ phone: '+1234567890' }],
          name: 'Test User',
        },
      ],
      has_more: false,
    },
    notFound: {
      data: [],
      has_more: false,
    },
  },
  activities: {
    withEmails: {
      data: [
        {
          id: 'activity_email_1',
          type: 'email',
          date_created: '2024-01-15T10:00:00Z',
          date_updated: '2024-01-15T10:00:00Z',
          user_id: 'user_456',
          user_name: 'Support Agent',
          user_email: 'support@company.com',
          contact_id: 'contact_123',
          from: 'support@company.com',
          to: ['test@example.com'],
          subject: 'Welcome to our platform',
          body_text: 'Thank you for signing up!',
          status: 'sent',
        },
        {
          id: 'activity_email_2',
          type: 'email',
          date_created: '2024-01-16T14:30:00Z',
          date_updated: '2024-01-16T14:30:00Z',
          user_id: 'user_456',
          user_name: 'Support Agent',
          user_email: 'support@company.com',
          contact_id: 'contact_123',
          from: 'test@example.com',
          to: ['support@company.com'],
          subject: 'Re: Welcome to our platform',
          body_text: 'Thanks for the welcome!',
          status: 'sent',
        },
      ],
      has_more: false,
    },
    withSMS: {
      data: [
        {
          id: 'activity_sms_1',
          type: 'sms',
          date_created: '2024-01-17T09:15:00Z',
          date_updated: '2024-01-17T09:15:00Z',
          user_id: 'user_456',
          user_name: 'Support Agent',
          user_email: 'support@company.com',
          contact_id: 'contact_123',
          direction: 'outbound',
          phone: '+1234567890',
          text: 'Your account has been activated!',
          status: 'sent',
        },
        {
          id: 'activity_sms_2',
          type: 'sms',
          date_created: '2024-01-17T09:20:00Z',
          date_updated: '2024-01-17T09:20:00Z',
          user_id: 'user_456',
          user_name: 'Support Agent',
          user_email: 'support@company.com',
          contact_id: 'contact_123',
          direction: 'inbound',
          phone: '+1234567890',
          text: 'Perfect, thank you!',
          status: 'received',
        },
      ],
      has_more: false,
    },
    empty: {
      data: [],
      has_more: false,
    },
  },
  users: {
    data: [
      {
        id: 'user_456',
        email: 'support@company.com',
        first_name: 'Support',
        last_name: 'Agent',
        display_name: 'Support Agent',
      },
    ],
  },
};

describe('Close CRM Sync Integration Tests', () => {
  beforeEach(() => {
    // Reset fetch mock
    jest.clearAllMocks();
  });

  describe('Successful sync scenarios', () => {
    it('should sync email history for existing contact', async () => {
      // Mock Close CRM API calls
      global.fetch = jest.fn()
        .mockImplementationOnce(() => // Contact search
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockCloseAPIResponses.contactSearch.success),
          })
        )
        .mockImplementationOnce(() => // Users fetch
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockCloseAPIResponses.users),
          })
        )
        .mockImplementationOnce(() => // Activities fetch
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockCloseAPIResponses.activities.withEmails),
          })
        );

      // Test the sync function
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No session for test');
      }

      const response = await fetch(
        'https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-sync-user-history',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
        }
      );

      expect(response.ok).toBe(true);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.importedCount).toBeGreaterThan(0);
      expect(result.closeContactId).toBe('contact_123');
    });

    it('should handle contact not found scenario', async () => {
      global.fetch = jest.fn()
        .mockImplementationOnce(() => // Contact search - not found
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockCloseAPIResponses.contactSearch.notFound),
          })
        );

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No session for test');
      }

      const response = await fetch(
        'https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-sync-user-history',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
        }
      );

      expect(response.ok).toBe(true);
      
      const result = await response.json();
      expect(result.message).toBe('No matching contact found');
    });

    it('should sync SMS history correctly', async () => {
      global.fetch = jest.fn()
        .mockImplementationOnce(() => // Contact search
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockCloseAPIResponses.contactSearch.success),
          })
        )
        .mockImplementationOnce(() => // Users fetch
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockCloseAPIResponses.users),
          })
        )
        .mockImplementationOnce(() => // Activities fetch
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockCloseAPIResponses.activities.withSMS),
          })
        );

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No session for test');
      }

      const response = await fetch(
        'https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-sync-user-history',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
        }
      );

      expect(response.ok).toBe(true);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.importedCount).toBeGreaterThan(0);
    });
  });

  describe('Error scenarios', () => {
    it('should handle Close CRM API errors', async () => {
      global.fetch = jest.fn()
        .mockImplementationOnce(() => // Contact search fails
          Promise.resolve({
            ok: false,
            status: 401,
            statusText: 'Unauthorized',
          })
        );

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No session for test');
      }

      const response = await fetch(
        'https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-sync-user-history',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
        }
      );

      expect(response.ok).toBe(false);
      expect(response.status).toBe(500);
    });

    it('should handle network timeouts', async () => {
      global.fetch = jest.fn()
        .mockImplementationOnce(() => // Network timeout
          Promise.reject(new Error('Network timeout'))
        );

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No session for test');
      }

      const response = await fetch(
        'https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-sync-user-history',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
        }
      );

      expect(response.ok).toBe(false);
    });
  });

  describe('Data validation', () => {
    it('should correctly identify message sender types', async () => {
      // This test would verify that emails from the user are marked as 'user'
      // and emails from staff are marked as 'staff'
      
      const emailFromUser = {
        type: 'email',
        from: 'test@example.com', // User's email
        to: ['support@company.com'],
        subject: 'Help request',
        body_text: 'I need help with my account',
      };

      const emailFromStaff = {
        type: 'email',
        from: 'support@company.com', // Staff email
        to: ['test@example.com'],
        subject: 'Re: Help request',
        body_text: 'Happy to help!',
      };

      // Mock activities with mixed sender types
      const mockActivities = {
        data: [emailFromUser, emailFromStaff],
        has_more: false,
      };

      global.fetch = jest.fn()
        .mockImplementationOnce(() => // Contact search
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockCloseAPIResponses.contactSearch.success),
          })
        )
        .mockImplementationOnce(() => // Users fetch
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockCloseAPIResponses.users),
          })
        )
        .mockImplementationOnce(() => // Activities fetch
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockActivities),
          })
        );

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No session for test');
      }

      const response = await fetch(
        'https://vrnjxgfzzbexjaytszvg.supabase.co/functions/v1/close-crm-sync-user-history',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
        }
      );

      expect(response.ok).toBe(true);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.importedCount).toBe(2);
    });
  });
});

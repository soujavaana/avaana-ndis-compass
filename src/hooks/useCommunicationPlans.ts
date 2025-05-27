
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export interface CommunicationPlan {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  target_audience: string;
  channels: string[];
  created_at: string;
  updated_at: string;
}

export const useCommunicationPlans = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock data for demonstration
  const mockPlans: CommunicationPlan[] = [
    {
      id: '1',
      title: 'NDIS Client Onboarding Communication',
      description: 'Comprehensive communication plan for new NDIS clients including welcome messages, documentation requirements, and ongoing support touchpoints.',
      status: 'active',
      frequency: 'weekly',
      target_audience: 'New NDIS Clients',
      channels: ['Email', 'Phone', 'SMS'],
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z'
    },
    {
      id: '2',
      title: 'Compliance Update Communications',
      description: 'Regular updates to stakeholders about compliance status, upcoming audits, and regulatory changes.',
      status: 'draft',
      frequency: 'monthly',
      target_audience: 'Internal Team & Key Stakeholders',
      channels: ['Email', 'Portal'],
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z'
    },
    {
      id: '3',
      title: 'Service Provider Network Updates',
      description: 'Keep service providers informed about policy changes, training opportunities, and network updates.',
      status: 'active',
      frequency: 'quarterly',
      target_audience: 'Service Provider Network',
      channels: ['Email', 'Webinar', 'Newsletter'],
      created_at: '2024-01-05T00:00:00Z',
      updated_at: '2024-01-05T00:00:00Z'
    }
  ];

  const { data: plans, isLoading } = useQuery({
    queryKey: ['communication-plans'],
    queryFn: () => Promise.resolve(mockPlans),
  });

  const createPlan = useMutation({
    mutationFn: async (newPlan: Omit<CommunicationPlan, 'id' | 'created_at' | 'updated_at'>) => {
      const plan: CommunicationPlan = {
        ...newPlan,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return plan;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communication-plans'] });
      toast({
        title: 'Plan Created',
        description: 'Communication plan has been created successfully.',
      });
    },
  });

  const updatePlan = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CommunicationPlan> }) => {
      const plan = plans?.find(p => p.id === id);
      if (!plan) throw new Error('Plan not found');
      
      return {
        ...plan,
        ...updates,
        updated_at: new Date().toISOString(),
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communication-plans'] });
      toast({
        title: 'Plan Updated',
        description: 'Communication plan has been updated successfully.',
      });
    },
  });

  const deletePlan = useMutation({
    mutationFn: async (id: string) => {
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communication-plans'] });
      toast({
        title: 'Plan Deleted',
        description: 'Communication plan has been deleted successfully.',
      });
    },
  });

  return {
    plans,
    isLoading,
    createPlan,
    updatePlan,
    deletePlan,
  };
};

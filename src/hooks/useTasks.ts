
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TaskType {
  id: string;
  name: string;
  title: string;
  description: string | null;
  priority: number;
  page_route: string | null;
  icon: string | null;
}

export interface UserTask {
  id: string;
  user_id: string;
  task_type_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  assigned_at: string;
  started_at: string | null;
  completed_at: string | null;
  metadata: any;
  task_types: TaskType;
}

export const useTasks = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['user-tasks'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('user_tasks')
        .select(`
          *,
          task_types (*)
        `)
        .eq('user_id', user.id)
        .order('task_types(priority)', { ascending: true });

      if (error) throw error;
      return data as UserTask[];
    },
  });

  const updateTaskStatus = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      const updates: any = { 
        status, 
        updated_at: new Date().toISOString() 
      };
      
      if (status === 'in_progress') {
        updates.started_at = new Date().toISOString();
      } else if (status === 'completed') {
        updates.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('user_tasks')
        .update(updates)
        .eq('id', taskId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-tasks'] });
      toast({
        title: 'Task updated',
        description: 'Task status has been updated successfully.',
      });
    },
    onError: (error) => {
      console.error('Error updating task:', error);
      toast({
        title: 'Error',
        description: 'Failed to update task status.',
        variant: 'destructive',
      });
    },
  });

  const checkTaskCompletion = useMutation({
    mutationFn: async (taskName: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase.rpc('check_task_completion', {
        user_uuid: user.id,
        task_name: taskName
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-tasks'] });
    },
  });

  const pendingTasks = tasks?.filter(task => task.status === 'pending') || [];
  const completedTasks = tasks?.filter(task => task.status === 'completed') || [];
  const completionPercentage = tasks?.length ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  return {
    tasks,
    pendingTasks,
    completedTasks,
    completionPercentage,
    isLoading,
    error,
    updateTaskStatus,
    checkTaskCompletion,
  };
};

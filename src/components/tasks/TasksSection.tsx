
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTasks } from '@/hooks/useTasks';
import TaskCard from './TaskCard';
import { CheckCircle2, ListTodo } from 'lucide-react';

const TasksSection = () => {
  const { 
    tasks, 
    pendingTasks, 
    completionPercentage, 
    isLoading, 
    updateTaskStatus, 
    checkTaskCompletion 
  } = useTasks();

  // Check for task completion when component mounts
  React.useEffect(() => {
    if (tasks && tasks.length > 0) {
      tasks.forEach(task => {
        if (task.status !== 'completed') {
          checkTaskCompletion.mutate(task.task_types.name);
        }
      });
    }
  }, [tasks]);

  const handleStatusChange = (taskId: string, status: string) => {
    updateTaskStatus.mutate({ taskId, status });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListTodo size={20} />
            Your Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!tasks || tasks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Tasks Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListTodo size={20} />
            Your Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-500">{completionPercentage}% Complete</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={16} className="text-green-600" />
                {tasks.filter(t => t.status === 'completed').length} Completed
              </span>
              <span className="text-gray-500">
                {pendingTasks.length} Pending
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Pending Tasks</h3>
          <div className="grid gap-4">
            {pendingTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Tasks (if user wants to see completed ones too) */}
      {tasks.some(t => t.status === 'completed') && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">All Tasks</h3>
          <div className="grid gap-4">
            {tasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksSection;

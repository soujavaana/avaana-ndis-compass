
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { UserTask } from '@/hooks/useTasks';

interface TaskCardProps {
  task: UserTask;
  onStatusChange: (taskId: string, status: string) => void;
}

const TaskCard = ({ task, onStatusChange }: TaskCardProps) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      default:
        return null;
    }
  };

  const handleStartTask = () => {
    if (task.status === 'pending') {
      onStatusChange(task.id, 'in_progress');
    }

    // Special handling for the Complete Business Profile task
    if (task.task_types.name === 'complete_business_profile') {
      navigate('/business-profile-onboarding');
    } else if (task.task_types.page_route) {
      navigate(task.task_types.page_route);
    }
  };

  const handleMarkComplete = () => {
    onStatusChange(task.id, 'completed');
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{task.task_types.title}</CardTitle>
          {getStatusBadge(task.status)}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{task.task_types.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={16} className="mr-1" />
            Priority {task.task_types.priority}
          </div>
          <div className="flex gap-2">
            {task.status === 'completed' ? (
              <div className="flex items-center text-green-600">
                <CheckCircle2 size={16} className="mr-1" />
                <span className="text-sm">Complete</span>
              </div>
            ) : (
              <>
                {task.status === 'in_progress' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleMarkComplete}
                  >
                    Mark Complete
                  </Button>
                )}
                <Button 
                  size="sm" 
                  onClick={handleStartTask}
                  className="flex items-center gap-1"
                >
                  {task.status === 'pending' ? 'Start Task' : 'Continue'}
                  <ArrowRight size={14} />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

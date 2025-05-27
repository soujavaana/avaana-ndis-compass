
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MessageSquare, Edit3, Trash2 } from 'lucide-react';
import { CommunicationPlan } from '@/hooks/useCommunicationPlans';

interface CommunicationPlanCardProps {
  plan: CommunicationPlan;
  onEdit: (plan: CommunicationPlan) => void;
  onDelete: (id: string) => void;
}

const CommunicationPlanCard = ({ plan, onEdit, onDelete }: CommunicationPlanCardProps) => {
  const getStatusColor = (status: CommunicationPlan['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getFrequencyIcon = () => {
    return <Calendar size={16} className="mr-1" />;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">{plan.title}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(plan)}
              className="h-8 w-8 p-0"
            >
              <Edit3 size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(plan.id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge className={getStatusColor(plan.status)}>
            {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
          </Badge>
          <div className="flex items-center text-sm text-gray-500">
            {getFrequencyIcon()}
            {plan.frequency.charAt(0).toUpperCase() + plan.frequency.slice(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-2">{plan.description}</p>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Users size={16} className="mr-2 text-gray-500" />
            <span className="text-gray-700">{plan.target_audience}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MessageSquare size={16} className="mr-2 text-gray-500" />
            <div className="flex flex-wrap gap-1">
              {plan.channels.map((channel, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {channel}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
          Updated {new Date(plan.updated_at).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationPlanCard;

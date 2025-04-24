
import React from 'react';
import { Card } from "@/components/ui/card";
import { InfoIcon } from 'lucide-react';

interface AuditStatsCardProps {
  title: string;
  count: number;
  variant: 'in-progress' | 'completed' | 'internal' | 'external';
}

const AuditStatsCard: React.FC<AuditStatsCardProps> = ({ title, count, variant }) => {
  const bgColors = {
    'in-progress': 'bg-amber-50',
    'completed': 'bg-green-50',
    'internal': 'bg-blue-50',
    'external': 'bg-purple-50'
  };

  const textColors = {
    'in-progress': 'text-amber-600',
    'completed': 'text-green-600',
    'internal': 'text-blue-600',
    'external': 'text-purple-600'
  };

  return (
    <div className={`p-4 rounded-lg ${bgColors[variant]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-medium ${textColors[variant]}`}>{title}</span>
        <InfoIcon className="h-4 w-4 text-gray-400" />
      </div>
      <div className="text-3xl font-bold text-gray-900">{count}</div>
    </div>
  );
};

export default AuditStatsCard;

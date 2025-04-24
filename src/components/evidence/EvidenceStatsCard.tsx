
import React from 'react';
import { Card } from "@/components/ui/card";
import { InfoIcon } from 'lucide-react';

interface EvidenceStatsCardProps {
  title: string;
  count: number;
  total?: number;
  variant: 'not-uploaded' | 'draft' | 'needs-attention' | 'uploaded';
}

const EvidenceStatsCard: React.FC<EvidenceStatsCardProps> = ({ title, count, total, variant }) => {
  const bgColors = {
    'not-uploaded': 'bg-gray-100',
    'draft': 'bg-amber-50',
    'needs-attention': 'bg-red-50',
    'uploaded': 'bg-green-50'
  };

  const textColors = {
    'not-uploaded': 'text-gray-600',
    'draft': 'text-amber-600',
    'needs-attention': 'text-red-600',
    'uploaded': 'text-green-600'
  };

  return (
    <div className={`p-4 rounded-lg ${bgColors[variant]}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <InfoIcon className="h-4 w-4 text-gray-400" />
      </div>
      <div className="text-3xl font-bold">
        {count}
        {total && <span className="text-gray-500 text-lg ml-1">/{total}</span>}
      </div>
    </div>
  );
};

export default EvidenceStatsCard;

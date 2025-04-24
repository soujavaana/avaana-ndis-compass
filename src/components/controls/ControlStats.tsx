
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface StatCardProps {
  label: string;
  value: number;
  total?: number;
  variant: 'compliant' | 'non-compliant' | 'not-applicable';
  progress?: number;
}

const StatCard = ({ label, value, total, variant, progress }: StatCardProps) => {
  const colors = {
    compliant: "text-green-600 bg-green-50",
    "non-compliant": "text-red-600 bg-red-50",
    "not-applicable": "text-gray-600 bg-gray-50"
  };

  return (
    <div className="p-4 rounded-lg bg-white">
      <div className="flex items-center gap-1">
        <span className={`text-sm font-medium ${colors[variant].split(' ')[0]}`}>
          {label}
        </span>
        <button className="text-gray-400 hover:text-gray-600">
          <span className="sr-only">Info</span>
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>
        </button>
      </div>
      <div className="mt-2">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{value}</span>
          {total && (
            <span className="text-gray-500 text-sm">/{total}</span>
          )}
        </div>
        {progress !== undefined && (
          <div className="mt-2">
            <Progress value={progress} className="h-1.5" />
            <span className="text-xs text-gray-500 mt-1">
              {progress.toFixed(1)}% done
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const ControlStats = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <StatCard 
        label="Compliant" 
        value={27} 
        total={209} 
        variant="compliant"
        progress={12.9}
      />
      <StatCard 
        label="Non Compliant" 
        value={172} 
        variant="non-compliant"
      />
      <StatCard 
        label="Not Applicable" 
        value={10} 
        variant="not-applicable"
      />
    </div>
  );
};

export default ControlStats;

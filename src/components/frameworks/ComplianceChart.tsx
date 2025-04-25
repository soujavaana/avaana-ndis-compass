
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ComplianceMetrics {
  policies: number;
  evidenceTasks: number;
  automatedTests: number;
}

interface ComplianceChartProps {
  totalCompliance: number;
  metrics: ComplianceMetrics;
}

const ComplianceChart: React.FC<ComplianceChartProps> = ({ totalCompliance, metrics }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 mb-8">
        <div className="w-48 h-48 rounded-full bg-gray-100"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">{totalCompliance}%</span>
          <span className="text-gray-500">Compliant</span>
        </div>
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(#F97316 0% ${totalCompliance}%, #E5E7EB ${totalCompliance}% 100%)`
          }}
        >
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6 w-full">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <Progress value={metrics.policies} className="w-16 h-16 rounded-full" />
          </div>
          <span className="mt-2 font-semibold">{metrics.policies}%</span>
          <span className="text-sm text-gray-500">Policies</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <Progress value={metrics.evidenceTasks} className="w-16 h-16 rounded-full" />
          </div>
          <span className="mt-2 font-semibold">{metrics.evidenceTasks}%</span>
          <span className="text-sm text-gray-500">Evidence Tasks</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <Progress value={metrics.automatedTests} className="w-16 h-16 rounded-full" />
          </div>
          <span className="mt-2 font-semibold">{metrics.automatedTests}%</span>
          <span className="text-sm text-gray-500">Automated Tests</span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceChart;

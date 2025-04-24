
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Protect', value: 80, color: '#9b87f5' },
  { name: 'Identify', value: 50, color: '#4287f5' },
  { name: 'Detect', value: 30, color: '#f5a742' },
  { name: 'Respond', value: 20, color: '#f54242' },
  { name: 'Recover', value: 15, color: '#42f5ad' },
  { name: 'Govern', value: 14, color: '#f5d742' },
];

const ControlsChart = () => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Function Grouping</h3>
      <div className="w-full aspect-square max-w-[400px] mx-auto">
        <ChartContainer 
          config={{
            data: { label: "Controls Distribution" }
          }}
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-lg font-medium"
            >
              Total
            </text>
            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl font-bold"
            >
              209
            </text>
          </PieChart>
        </ChartContainer>
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlsChart;

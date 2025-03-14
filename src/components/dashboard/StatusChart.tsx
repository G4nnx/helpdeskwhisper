
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '@/lib/utils';

interface StatusChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title: string;
  className?: string;
}

export const StatusChart: React.FC<StatusChartProps> = ({ data, title, className }) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  borderRadius: '4px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value) => [`${value}`, 'Tickets']}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

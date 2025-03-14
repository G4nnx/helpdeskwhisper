
import React from 'react';
import { StatusChart } from '@/components/dashboard/StatusChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

// Mock data for the dashboard
const mockTicketStatusData = [
  { name: 'Open', value: 12, color: '#3B82F6' },
  { name: 'In Progress', value: 18, color: '#F59E0B' },
  { name: 'Resolved', value: 30, color: '#10B981' },
  { name: 'Closed', value: 24, color: '#6B7280' },
];

const mockSLAStatusData = [
  { name: 'Within SLA', value: 85, color: '#10B981' },
  { name: 'At Risk', value: 10, color: '#F59E0B' },
  { name: 'Breached', value: 5, color: '#EF4444' },
];

const mockUpcomingTasks = [
  {
    id: '1',
    title: 'Server maintenance',
    date: 'Tomorrow, 10:00 AM',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Software update deployment',
    date: 'Wed, 2:00 PM',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Network security audit',
    date: 'Fri, 9:00 AM',
    priority: 'high'
  }
];

export const ChartsSection: React.FC = () => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-blue-100 text-blue-800 border-blue-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <StatusChart
        data={mockTicketStatusData}
        title="Tickets by Status"
        className="col-span-1 lg:col-span-1 animate-fade-in"
      />
      <StatusChart
        data={mockSLAStatusData}
        title="SLA Performance"
        className="col-span-1 lg:col-span-1 animate-fade-in"
      />
      
      <Card className="col-span-1 lg:col-span-1 animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Upcoming Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUpcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-3 p-3 rounded-md bg-muted/50">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">{task.title}</p>
                    <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

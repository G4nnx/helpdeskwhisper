
import React from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { TicketIcon, AlertCircle, Clock, CheckCircle } from 'lucide-react';

export const StatsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Tickets"
        value="84"
        icon={<TicketIcon className="w-5 h-5 text-blue-500" />}
        description="Last 30 days"
        trend={{ value: 12, isPositive: true }}
        className="animate-scale-in"
      />
      <StatCard
        title="Open Tickets"
        value="12"
        icon={<AlertCircle className="w-5 h-5 text-amber-500" />}
        description="4 high priority"
        className="animate-scale-in"
      />
      <StatCard
        title="SLA Compliance"
        value="95%"
        icon={<Clock className="w-5 h-5 text-green-500" />}
        description="Above target"
        trend={{ value: 3, isPositive: true }}
        className="animate-scale-in"
      />
      <StatCard
        title="Avg. Resolution Time"
        value="4.2h"
        icon={<CheckCircle className="w-5 h-5 text-purple-500" />}
        description="Last 7 days"
        trend={{ value: 8, isPositive: true }}
        className="animate-scale-in"
      />
    </div>
  );
};

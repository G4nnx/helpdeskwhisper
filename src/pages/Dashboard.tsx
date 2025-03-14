
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { ChartsSection } from '@/components/dashboard/ChartsSection';
import { RecentTickets } from '@/components/dashboard/RecentTickets';
import { SystemSummary } from '@/components/dashboard/SystemSummary';

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome header */}
        <WelcomeHeader />

        {/* Stats overview */}
        <StatsOverview />

        {/* Charts and upcoming tasks */}
        <ChartsSection />

        {/* Recent tickets and system summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentTickets />
          <SystemSummary />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

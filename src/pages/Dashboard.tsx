
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { ChartsSection } from '@/components/dashboard/ChartsSection';
import { RecentTickets } from '@/components/dashboard/RecentTickets';
import { SystemSummary } from '@/components/dashboard/SystemSummary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FAQ } from '@/components/kb/FAQ';
import { TicketIcon, MessageSquare, BookText, BellIcon } from 'lucide-react';

// Sample FAQ items for the dashboard
const sampleFaqItems = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions sent to your email."
  },
  {
    question: "What should I do if my computer is running slowly?",
    answer: "Try restarting your computer, closing unused applications, and checking for malware. If the problem persists, create a support ticket."
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome header */}
        <WelcomeHeader />

        {/* Stats overview */}
        <StatsOverview />

        {/* Quick Access Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="hover:shadow-md transition-shadow animate-fade-in">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <TicketIcon className="mr-2 h-5 w-5 text-blue-500" />
                Support Tickets
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Create, track and manage your support tickets in one place.
              </p>
              <Button 
                onClick={() => navigate('/tickets')} 
                className="w-full"
                variant="outline"
              >
                View My Tickets
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow animate-fade-in">
            <CardHeader className="bg-purple-50 dark:bg-purple-900/20 pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-purple-500" />
                Chat Support
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Get instant help through our chatbot or live support agents.
              </p>
              <Button 
                onClick={() => navigate('/chat')} 
                className="w-full"
                variant="outline"
              >
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow animate-fade-in">
            <CardHeader className="bg-green-50 dark:bg-green-900/20 pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <BookText className="mr-2 h-5 w-5 text-green-500" />
                Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Browse articles and FAQs to find solutions to common problems.
              </p>
              <Button 
                onClick={() => navigate('/knowledge-base')} 
                className="w-full"
                variant="outline"
              >
                Explore Articles
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Charts and upcoming tasks */}
        <ChartsSection />

        {/* Recent tickets and system summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentTickets />
          <SystemSummary />
        </div>

        {/* FAQ Section */}
        <div className="mt-6">
          <FAQ faqItems={sampleFaqItems} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

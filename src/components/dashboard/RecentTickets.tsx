
import React from 'react';
import { TicketCard, Ticket } from '@/components/tickets/TicketCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for recent tickets
const mockRecentTickets: Ticket[] = [
  {
    id: 'TIC-1001',
    title: 'Unable to access email',
    description: "I cannot login to my email account since this morning. I've tried resetting my password but still getting an error.",
    status: 'open',
    priority: 'high',
    category: 'account',
    requester: {
      id: 'USR-001',
      name: 'John Smith',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff',
    },
    createdAt: new Date(new Date().getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    updatedAt: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: 'TIC-1000',
    title: 'Printer not working on 3rd floor',
    description: 'The main printer on the 3rd floor is showing an error about paper jam, but there is no paper jam visible.',
    status: 'in-progress',
    priority: 'medium',
    category: 'hardware',
    assignee: {
      id: 'SUP-002',
      name: 'Tech Support',
      avatar: 'https://ui-avatars.com/api/?name=Tech+Support&background=36B37E&color=fff',
    },
    requester: {
      id: 'USR-002',
      name: 'Emily Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Johnson&background=FF5630&color=fff',
    },
    createdAt: new Date(new Date().getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
    updatedAt: new Date(new Date().getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 'TIC-999',
    title: 'Request for new laptop',
    description: 'I need a new laptop for the new employee starting next Monday. Please provide details about available models.',
    status: 'open',
    priority: 'low',
    category: 'request',
    requester: {
      id: 'USR-003',
      name: 'Michael Brown',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=0D8ABC&color=fff',
    },
    createdAt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 1 day ago
  },
];

export const RecentTickets: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="col-span-1 lg:col-span-2 animate-fade-in">
      <CardHeader className="pb-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Recent Tickets</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate('/tickets')}>
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRecentTickets.map((ticket) => (
            <TicketCard 
              key={ticket.id}
              ticket={ticket}
              onClick={() => navigate('/tickets')}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

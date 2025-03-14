import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { TicketForm } from '@/components/tickets/TicketForm';
import { Button } from '@/components/ui/button';
import { TicketCard, Ticket } from '@/components/tickets/TicketCard';
import { PlusIcon, FilterIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

// Mock tickets data
const mockTickets: Ticket[] = [
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
  {
    id: 'TIC-998',
    title: 'Software installation request',
    description: 'Need Adobe Creative Suite installed on my workstation for the new marketing project.',
    status: 'closed',
    priority: 'medium',
    category: 'software',
    requester: {
      id: 'USR-004',
      name: 'Sarah Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=FF5630&color=fff',
    },
    createdAt: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: 'TIC-997',
    title: 'Network connectivity issues',
    description: 'Intermittent network drops affecting the entire marketing department.',
    status: 'resolved',
    priority: 'critical',
    category: 'network',
    assignee: {
      id: 'SUP-001',
      name: 'Network Admin',
      avatar: 'https://ui-avatars.com/api/?name=Network+Admin&background=36B37E&color=fff',
    },
    requester: {
      id: 'USR-005',
      name: 'David Miller',
      avatar: 'https://ui-avatars.com/api/?name=David+Miller&background=0D8ABC&color=fff',
    },
    createdAt: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    updatedAt: new Date(new Date().getTime() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
  },
];

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const { user } = useAuth();

  const handleCreateTicket = (ticketData: any) => {
    const newTicket: Ticket = {
      id: `TIC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: ticketData.title,
      description: ticketData.description,
      status: 'open',
      priority: ticketData.priority,
      category: ticketData.category,
      requester: {
        id: user?.id || 'unknown',
        name: user?.name || 'Unknown User',
        avatar: user?.avatar,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTickets([newTicket, ...tickets]);
    setShowForm(false);
    
    toast.success('Ticket Created', {
      description: `Ticket #${newTicket.id} has been created successfully.`,
    });
    
    // Simulate email notification
    console.log(`Email notification sent for new ticket: ${newTicket.id}`);
  };
  
  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus as any, updatedAt: new Date() } 
        : ticket
    ));
    
    toast.success('Status Updated', {
      description: `Ticket #${ticketId} status changed to ${newStatus}.`,
    });
    
    // Simulate email notification
    console.log(`Email notification sent for status update on ticket: ${ticketId}`);
  };

  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = filterStatus === 'all' || ticket.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || ticket.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Support Tickets</h1>
            <p className="text-muted-foreground">Manage and track all support tickets</p>
          </div>
          
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : (
              <>
                <PlusIcon className="w-4 h-4 mr-2" />
                New Ticket
              </>
            )}
          </Button>
        </div>
        
        {showForm && (
          <div className="mb-6">
            <TicketForm 
              onSubmit={handleCreateTicket} 
              onCancel={() => setShowForm(false)} 
            />
          </div>
        )}
        
        <div className="bg-background border rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center gap-2">
              <FilterIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-40">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-40">
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TicketCard 
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => {
                    // For this demo, clicking a ticket will cycle through statuses
                    // In a real app, this would open a ticket detail page
                    const statusOrder = ['open', 'in-progress', 'resolved', 'closed'];
                    const currentIndex = statusOrder.indexOf(ticket.status);
                    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
                    handleStatusChange(ticket.id, nextStatus);
                  }}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No tickets match your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tickets;


import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { StatusChart } from '@/components/dashboard/StatusChart';
import { TicketCard, Ticket } from '@/components/tickets/TicketCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Clock, 
  Ticket as TicketIcon, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  LaptopIcon,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

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

const mockRecentTickets: Ticket[] = [
  {
    id: 'TIC-1001',
    title: 'Unable to access email',
    description: 'I cannot login to my email account since this morning. I've tried resetting my password but still getting an error.',
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

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-blue-100 text-blue-800 border-blue-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground">Here's what's happening with your support desk today.</p>
          </div>
          <Button className="mt-4 sm:mt-0" onClick={() => navigate('/tickets')}>
            Create New Ticket
          </Button>
        </div>

        {/* Stats overview */}
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
            style={{ animationDelay: '0.1s' }}
            />
          <StatCard
            title="SLA Compliance"
            value="95%"
            icon={<Clock className="w-5 h-5 text-green-500" />}
            description="Above target"
            trend={{ value: 3, isPositive: true }}
            className="animate-scale-in"
            style={{ animationDelay: '0.2s' }}
            />
          <StatCard
            title="Avg. Resolution Time"
            value="4.2h"
            icon={<CheckCircle className="w-5 h-5 text-purple-500" />}
            description="Last 7 days"
            trend={{ value: 8, isPositive: true }}
            className="animate-scale-in"
            style={{ animationDelay: '0.3s' }}
            />
        </div>

        {/* Charts and recent tickets */}
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
            style={{ animationDelay: '0.1s' }}
            />
          
          <Card className="col-span-1 lg:col-span-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
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

        {/* Recent tickets and other data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

          <Tabs defaultValue="assets" className="col-span-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-black border rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="assets">Assets</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="assets" className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Asset Summary</h3>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/assets')}>
                      View All
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { icon: <LaptopIcon className="w-4 h-4" />, name: 'Laptops', count: 48, status: '2 for maintenance' },
                      { icon: <LaptopIcon className="w-4 h-4" />, name: 'Desktops', count: 32, status: 'All operational' },
                      { icon: <LaptopIcon className="w-4 h-4" />, name: 'Printers', count: 12, status: '1 low on toner' },
                      { icon: <LaptopIcon className="w-4 h-4" />, name: 'Servers', count: 8, status: 'All operational' },
                    ].map((asset, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-md bg-primary/10">
                            {asset.icon}
                          </div>
                          <div>
                            <p className="font-medium">{asset.name}</p>
                            <p className="text-sm text-muted-foreground">{asset.status}</p>
                          </div>
                        </div>
                        <p className="font-bold">{asset.count}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="users" className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">User Summary</h3>
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <Users className="w-4 h-4" />
                        </div>
                        <p className="font-medium">Total Users</p>
                      </div>
                      <p className="font-bold">126</p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <p>Active Users</p>
                        <p>112</p>
                      </div>
                      <div className="flex justify-between text-sm">
                        <p>IT Support Team</p>
                        <p>8</p>
                      </div>
                      <div className="flex justify-between text-sm">
                        <p>Admins</p>
                        <p>6</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Most Active Departments</p>
                      <div className="space-y-2">
                        {[
                          { name: 'Sales', tickets: 34 },
                          { name: 'Finance', tickets: 27 },
                          { name: 'Marketing', tickets: 19 },
                        ].map((dept, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <p>{dept.name}</p>
                            <p>{dept.tickets} tickets</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

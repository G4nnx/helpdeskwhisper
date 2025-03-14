
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { UserCircle, Mail, UserCog } from 'lucide-react';

// Mock data for user's tickets
const userTickets = [
  {
    id: 'TIC-1001',
    title: 'Unable to access email',
    status: 'open',
    priority: 'high',
    createdAt: new Date(new Date().getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    updatedAt: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: 'TIC-985',
    title: 'Monitor display issues',
    status: 'resolved',
    priority: 'medium',
    createdAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
  },
  {
    id: 'TIC-942',
    title: 'Software license renewal',
    status: 'closed',
    priority: 'low',
    createdAt: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    updatedAt: new Date(new Date().getTime() - 28 * 24 * 60 * 60 * 1000), // 28 days ago
  },
];

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p>Please log in to view your profile.</p>
        </div>
      </Layout>
    );
  }

  const statusColors: Record<string, string> = {
    'open': 'bg-blue-100 text-blue-800 border-blue-200',
    'in-progress': 'bg-amber-100 text-amber-800 border-amber-200',
    'resolved': 'bg-green-100 text-green-800 border-green-200',
    'closed': 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const priorityColors: Record<string, string> = {
    'low': 'bg-green-100 text-green-800 border-green-200',
    'medium': 'bg-blue-100 text-blue-800 border-blue-200',
    'high': 'bg-amber-100 text-amber-800 border-amber-200',
    'critical': 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">User Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <Badge className="mt-1 capitalize">{user.role}</Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">ID: {user.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCog className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm capitalize">Role: {user.role}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Ticket History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[ticket.status]}>
                          {ticket.status.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={priorityColors[ticket.priority]}>
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(ticket.createdAt, { addSuffix: true })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

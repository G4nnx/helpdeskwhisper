
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  requester: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
};

interface TicketCardProps {
  ticket: Ticket;
  className?: string;
  onClick?: () => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, className, onClick }) => {
  const statusColors: Record<TicketStatus, string> = {
    'open': 'bg-blue-100 text-blue-800 border-blue-200',
    'in-progress': 'bg-amber-100 text-amber-800 border-amber-200',
    'resolved': 'bg-green-100 text-green-800 border-green-200',
    'closed': 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const priorityColors: Record<TicketPriority, string> = {
    'low': 'bg-green-100 text-green-800 border-green-200',
    'medium': 'bg-blue-100 text-blue-800 border-blue-200',
    'high': 'bg-amber-100 text-amber-800 border-amber-200',
    'critical': 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/50",
        "animate-scale-in",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-0 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className={cn(statusColors[ticket.status], "capitalize")}>
              {ticket.status.replace('-', ' ')}
            </Badge>
            <Badge className={cn(priorityColors[ticket.priority], "capitalize")}>
              {ticket.priority}
            </Badge>
          </div>
          <CardTitle className="text-base font-medium line-clamp-1">
            #{ticket.id.substring(0, 6)} {ticket.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t">
        <div className="flex items-center">
          <Avatar className="h-7 w-7 mr-2">
            <AvatarImage 
              src={ticket.requester.avatar} 
              alt={ticket.requester.name} 
            />
            <AvatarFallback>
              {ticket.requester.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-muted-foreground">Opened by</p>
            <p className="text-sm font-medium">{ticket.requester.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Opened</p>
          <p className="text-sm">{formatDistanceToNow(ticket.createdAt, { addSuffix: true })}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

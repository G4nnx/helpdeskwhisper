
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Ticket, TicketStatus } from './TicketCard';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { MessageCircle, Send, AlertCircle, Clock, Calendar } from 'lucide-react';

interface TicketDetailProps {
  ticket: Ticket;
  onUpdate: (ticket: Ticket) => void;
  onClose: () => void;
}

export const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onUpdate, onClose }) => {
  const [status, setStatus] = useState<TicketStatus>(ticket.status);
  const [comment, setComment] = useState('');
  const { user, hasPermission } = useAuth();
  
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
  
  const handleStatusChange = () => {
    if (status === ticket.status) return;
    
    const updatedTicket = {
      ...ticket,
      status,
      updatedAt: new Date()
    };
    
    onUpdate(updatedTicket);
    
    // Simulate email notification
    console.log(`Email notification sent for status update: ${ticket.id} changed to ${status}`);
    
    toast.success('Status Updated', {
      description: `Ticket #${ticket.id} status changed to ${status.replace('-', ' ')}.`,
    });
  };
  
  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    // In a real app, you would save the comment to the database
    console.log(`New comment added to ticket ${ticket.id}: ${comment}`);
    
    // Notify user
    toast.success('Comment Added', {
      description: 'Your comment has been added to the ticket.',
    });
    
    // Simulate email notification
    console.log(`Email notification sent for new comment on ticket: ${ticket.id}`);
    
    setComment('');
  };
  
  const canChangeStatus = hasPermission(['admin', 'support']) || 
    (ticket.requester.id === user?.id && status === 'closed');

  return (
    <Card className="w-full max-w-3xl mx-auto animate-slide-in-bottom">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <CardTitle className="text-xl font-bold">
            #{ticket.id} {ticket.title}
          </CardTitle>
          <div className="flex gap-2">
            <Badge className={cn(statusColors[ticket.status], "capitalize")}>
              {ticket.status.replace('-', ' ')}
            </Badge>
            <Badge className={cn(priorityColors[ticket.priority], "capitalize")}>
              {ticket.priority}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage 
                src={ticket.requester.avatar} 
                alt={ticket.requester.name} 
              />
              <AvatarFallback>
                {ticket.requester.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{ticket.requester.name}</p>
              <p className="text-xs text-muted-foreground">Requester</p>
            </div>
          </div>
          
          {ticket.assignee && (
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium">{ticket.assignee.name}</p>
                <p className="text-xs text-muted-foreground">Assigned to</p>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage 
                  src={ticket.assignee.avatar} 
                  alt={ticket.assignee.name} 
                />
                <AvatarFallback>
                  {ticket.assignee.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
        
        <div className="bg-muted/40 p-4 rounded-md">
          <p>{ticket.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Created:</span>
            <span>{formatDistanceToNow(ticket.createdAt, { addSuffix: true })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Updated:</span>
            <span>{formatDistanceToNow(ticket.updatedAt, { addSuffix: true })}</span>
          </div>
        </div>
        
        {ticket.status !== 'closed' && (
          <div className="bg-muted/40 p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-4 w-4" />
              <h3 className="font-medium">Add Comment</h3>
            </div>
            <Textarea
              placeholder="Enter your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-2"
            />
            <Button size="sm" onClick={handleAddComment} disabled={!comment.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send Comment
            </Button>
          </div>
        )}
        
        {canChangeStatus && (
          <div className="bg-muted/40 p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4" />
              <h3 className="font-medium">Update Status</h3>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Select value={status} onValueChange={(value) => setStatus(value as TicketStatus)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleStatusChange} 
                disabled={status === ticket.status}
                className="w-full sm:w-auto"
              >
                Update Status
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end pt-0">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </CardFooter>
    </Card>
  );
};

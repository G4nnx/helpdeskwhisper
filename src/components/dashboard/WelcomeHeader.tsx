
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const WelcomeHeader: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'support':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
          {user && (
            <Badge className={getRoleColor(user.role)}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground">Here's what's happening with your support desk today.</p>
      </div>
      <Button className="mt-4 sm:mt-0" onClick={() => navigate('/tickets')}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create New Ticket
      </Button>
    </div>
  );
};

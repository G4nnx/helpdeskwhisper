
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const WelcomeHeader: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">Here's what's happening with your support desk today.</p>
      </div>
      <Button className="mt-4 sm:mt-0" onClick={() => navigate('/tickets')}>
        Create New Ticket
      </Button>
    </div>
  );
};

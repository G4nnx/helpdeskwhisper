
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LaptopIcon, TicketIcon, UserCircleIcon, CheckCircleIcon } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <TicketIcon className="h-6 w-6" />,
      title: 'Ticketing System',
      description: 'Create, track, and manage support tickets with categories, priorities, and real-time updates.'
    },
    {
      icon: <UserCircleIcon className="h-6 w-6" />,
      title: 'User Management',
      description: 'Role-based access control for users, IT support teams, and administrators.'
    },
    {
      icon: <CheckCircleIcon className="h-6 w-6" />,
      title: 'Status Tracking',
      description: 'Track ticket status from creation to resolution with automatic notifications.'
    },
    {
      icon: <LaptopIcon className="h-6 w-6" />,
      title: 'IT Support',
      description: 'Centralized platform for all IT support requests and asset management.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-tr from-blue-50 to-indigo-50 p-6 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-primary text-white p-4 rounded-full">
              <LaptopIcon className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">IT Support Helpdesk</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A complete solution for managing IT support tickets, user requests, and technical issues.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {isAuthenticated ? (
              <Button size="lg" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button size="lg" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
                  Try Demo
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto bg-gray-50 py-8 border-t">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} IT Support Helpdesk. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

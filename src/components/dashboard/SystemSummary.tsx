
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LaptopIcon, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SystemSummary: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Tabs defaultValue="assets" className="col-span-1 animate-fade-in">
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
  );
};

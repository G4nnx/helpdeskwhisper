
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Customize your help desk experience</p>
        </div>
        
        <Card className="border-dashed">
          <CardHeader className="pb-4">
            <div className="flex items-center">
              <SettingsIcon className="w-6 h-6 mr-3 text-muted-foreground" />
              <CardTitle>Settings Page</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-muted-foreground">
              This feature is coming soon. Settings will allow you to customize notifications, appearance, and more.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;

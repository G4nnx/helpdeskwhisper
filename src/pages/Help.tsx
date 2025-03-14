
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Help = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">Get help with using the help desk system</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-blue-500" />
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Access detailed user guides and tutorials to help you get the most out of the help desk system.
              </p>
              <Button variant="outline" className="w-full">
                View Documentation
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-100 dark:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-green-500" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Watch step-by-step video tutorials on how to use the system's features effectively.
              </p>
              <Button variant="outline" className="w-full">
                Watch Tutorials
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Help;


import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, PhoneCall } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatMessage, ChatBot } from '@/components/chat/ChatBot';
import { LiveSupport } from '@/components/chat/LiveSupport';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Chat = () => {
  const [activeTab, setActiveTab] = useState<string>('chatbot');
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Support Chat</h1>
          <p className="text-muted-foreground">Get instant answers from our chatbot or connect with a support agent</p>
        </div>
        
        <Tabs defaultValue="chatbot" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chatbot">
              <Bot className="h-4 w-4 mr-2" />
              Help Bot
            </TabsTrigger>
            <TabsTrigger value="livechat">
              <User className="h-4 w-4 mr-2" />
              Live Support
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chatbot" className="mt-6">
            <ChatBot />
          </TabsContent>
          
          <TabsContent value="livechat" className="mt-6">
            <LiveSupport />
          </TabsContent>
        </Tabs>
        
        <div className="flex items-center justify-end mt-4">
          <Button variant="outline" className="gap-2" onClick={() => toast.success("Support call initiated. An agent will call you shortly.")}>
            <PhoneCall className="h-4 w-4" />
            Call IT Support
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

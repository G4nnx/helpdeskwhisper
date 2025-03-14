
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, User, Clock } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { ChatMessage } from './ChatBot';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Simulated support agents
const supportAgents = [
  {
    id: 'agent-001',
    name: 'Sarah Wilson',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=FF5630&color=fff',
    role: 'IT Support Specialist',
    isOnline: true
  },
  {
    id: 'agent-002',
    name: 'Michael Chen',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=0D8ABC&color=fff',
    role: 'Network Administrator',
    isOnline: true
  },
  {
    id: 'agent-003',
    name: 'Emma Rodriguez',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Rodriguez&background=36B37E&color=fff',
    role: 'Software Support',
    isOnline: false
  }
];

export const LiveSupport: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [assignedAgent, setAssignedAgent] = useState<typeof supportAgents[0] | null>(null);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const connectToAgent = () => {
    setIsConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      const availableAgents = supportAgents.filter(agent => agent.isOnline);
      const randomAgent = availableAgents[Math.floor(Math.random() * availableAgents.length)];
      
      setAssignedAgent(randomAgent);
      setIsConnecting(false);
      setIsConnected(true);
      
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `Hello! I'm ${randomAgent.name} from IT Support. How can I help you today?`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      
      toast.success('Connected to support agent', {
        description: `You are now chatting with ${randomAgent.name}`
      });
    }, 2000);
  };
  
  const simulateAgentResponse = (userMessage: string) => {
    // Simulate agent typing
    setIsAgentTyping(true);
    
    // Simulate response delay
    const responseTime = 2000 + Math.random() * 2000;
    
    setTimeout(() => {
      setIsAgentTyping(false);
      
      // Simple responses based on message content
      let responseText = '';
      const lowerMsg = userMessage.toLowerCase();
      
      if (lowerMsg.includes('password') || lowerMsg.includes('reset')) {
        responseText = "I can help you reset your password. Can you verify your username or email address?";
      } else if (lowerMsg.includes('printer') || lowerMsg.includes('print')) {
        responseText = "Printer issues can be tricky. Can you tell me if you're getting any specific error messages on your computer or on the printer's display?";
      } else if (lowerMsg.includes('network') || lowerMsg.includes('internet') || lowerMsg.includes('connection')) {
        responseText = "Let's troubleshoot your network connection. Are other devices able to connect to the network, or is it just your device having issues?";
      } else if (lowerMsg.includes('software') || lowerMsg.includes('install')) {
        responseText = "For software installation requests, I'll need to know which software you need, the version, and if you have management approval.";
      } else if (lowerMsg.includes('email') || lowerMsg.includes('outlook')) {
        responseText = "Let's resolve your email issue. Are you unable to send, receive, or access your email account?";
      } else {
        // Generic responses if no keyword matches
        const genericResponses = [
          "I understand your concern. Can you provide more details about the issue you're experiencing?",
          "I'd be happy to help with that. Could you explain a bit more about when this issue started?",
          "Let me assist you with this. Have you tried restarting your device already?",
          "I'll need a bit more information to properly diagnose this issue. Can you walk me through what happens when you try to use this feature?",
          "Thanks for providing that information. Let me check a few things on our end. This will just take a moment."
        ];
        
        responseText = genericResponses[Math.floor(Math.random() * genericResponses.length)];
      }
      
      const agentResponse: ChatMessage = {
        id: Date.now().toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentResponse]);
    }, responseTime);
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim() || !isConnected) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate agent response
    simulateAgentResponse(inputValue);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const endChat = () => {
    setIsConnected(false);
    setAssignedAgent(null);
    setMessages([]);
    
    toast.info('Chat session ended', {
      description: 'The support session has been closed'
    });
  };
  
  return (
    <Card className="h-[600px] flex flex-col">
      <CardContent className="flex flex-col h-full p-0">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-medium">Connect with IT Support</h3>
              <p className="text-muted-foreground">
                Chat directly with our support team for personalized assistance.
              </p>
              
              <div className="flex flex-col gap-4 mt-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">Available Support Agents</h4>
                  <div className="space-y-3">
                    {supportAgents.map((agent) => (
                      <div key={agent.id} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={agent.avatar} alt={agent.name} />
                          <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{agent.name}</div>
                          <div className="text-xs text-muted-foreground">{agent.role}</div>
                        </div>
                        <Badge 
                          variant={agent.isOnline ? "default" : "outline"}
                          className={agent.isOnline ? "bg-green-500" : ""}
                        >
                          {agent.isOnline ? "Online" : "Away"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4" 
                onClick={connectToAgent}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <span className="animate-spin mr-2">
                      <Clock className="h-4 w-4" />
                    </span>
                    Connecting...
                  </>
                ) : (
                  'Start Chat'
                )}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="border-b p-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={assignedAgent?.avatar} alt={assignedAgent?.name} />
                  <AvatarFallback>{assignedAgent?.name?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{assignedAgent?.name}</div>
                  <div className="text-xs text-muted-foreground">{assignedAgent?.role}</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={endChat}>
                End Chat
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className={cn(
                      "flex gap-3 max-w-[80%]",
                      message.sender === 'user' ? "flex-row-reverse" : "flex-row"
                    )}>
                      <Avatar className="h-8 w-8">
                        {message.sender === 'user' ? (
                          user?.avatar ? (
                            <AvatarImage src={user.avatar} alt={user.name} />
                          ) : (
                            <AvatarFallback>{user?.name?.charAt(0) || '?'}</AvatarFallback>
                          )
                        ) : (
                          <>
                            <AvatarImage src={assignedAgent?.avatar} alt={assignedAgent?.name} />
                            <AvatarFallback>{assignedAgent?.name?.charAt(0) || 'A'}</AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <div className={cn(
                        "rounded-lg px-4 py-2",
                        message.sender === 'user'
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}>
                        <div className="whitespace-pre-wrap">{message.text}</div>
                        <div className="text-xs mt-1 opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isAgentTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={assignedAgent?.avatar} alt={assignedAgent?.name} />
                        <AvatarFallback>{assignedAgent?.name?.charAt(0) || 'A'}</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-4 py-2 bg-muted">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                          <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

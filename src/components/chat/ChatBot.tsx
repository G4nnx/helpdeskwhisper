
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, ArrowRight, Lightbulb } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
  relatedArticles?: {
    id: string;
    title: string;
  }[];
};

// Predefined responses based on keywords
const botResponses: Record<string, {
  response: string;
  relatedArticles?: { id: string; title: string }[];
}> = {
  'password': {
    response: "To reset your password, go to the login page and click on 'Forgot Password'. You'll receive an email with instructions to create a new password.",
    relatedArticles: [
      { id: 'kb-001', title: 'How to Reset Your Password' }
    ]
  },
  'network': {
    response: "Network issues can often be resolved by restarting your router or checking your cable connections. If problems persist, try running network troubleshooting from your device settings.",
    relatedArticles: [
      { id: 'kb-002', title: 'Troubleshooting Network Connectivity Issues' }
    ]
  },
  'email': {
    response: "For email setup on mobile devices, you'll need your company email address, password, and server settings. Our knowledge base has detailed guides for both iOS and Android devices.",
    relatedArticles: [
      { id: 'kb-003', title: 'Setting Up Email on Your Mobile Device' }
    ]
  },
  'printer': {
    response: "Printer issues often involve connectivity, drivers, or paper jams. Have you checked if the printer is online and properly connected to the network?",
    relatedArticles: [
      { id: 'kb-004', title: 'Printer Setup and Troubleshooting' }
    ]
  },
  'vpn': {
    response: "To access the company VPN, you need to install our VPN client and configure it with your credentials. Detailed setup instructions are available in our knowledge base.",
    relatedArticles: [
      { id: 'kb-005', title: 'VPN Access Guide' }
    ]
  },
  'wifi': {
    response: "To connect to the company WiFi, select 'CompanyWiFi' from your device's network list and enter your company email credentials when prompted.",
    relatedArticles: [
      { id: 'kb-002', title: 'Troubleshooting Network Connectivity Issues' }
    ]
  },
  'software': {
    response: "To request new software, please create a ticket with the software name, version, and business justification. Your manager's approval will be required.",
    relatedArticles: []
  },
  'ticket': {
    response: "You can create a new support ticket from the Tickets page. Click on 'New Ticket', fill in the details, and submit your request.",
    relatedArticles: []
  }
};

// Fallback response when no keywords match
const fallbackResponses = [
  "I'm not sure I understand your question. Could you please rephrase or provide more details?",
  "I don't have information on that specific topic. Would you like to create a support ticket for assistance from our IT team?",
  "That's beyond my current capabilities. For more complex issues, I recommend checking our knowledge base or contacting live support.",
  "I'm still learning! For this inquiry, it might be better to speak with a support agent. Would you like me to connect you?",
  "I don't have enough information to help with that. Could you be more specific about the issue you're experiencing?"
];

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm the IT Support Bot. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      relatedArticles: [
        { id: 'kb-001', title: 'How to Reset Your Password' },
        { id: 'kb-002', title: 'Troubleshooting Network Connectivity Issues' },
        { id: 'kb-004', title: 'Printer Setup and Troubleshooting' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const generateBotResponse = (userMessage: string): Promise<{
    response: string;
    relatedArticles?: { id: string; title: string }[];
  }> => {
    return new Promise((resolve) => {
      // Simulate processing time
      setTimeout(() => {
        const lowercaseMsg = userMessage.toLowerCase();
        
        // Check for keyword matches
        for (const [keyword, response] of Object.entries(botResponses)) {
          if (lowercaseMsg.includes(keyword)) {
            return resolve(response);
          }
        }
        
        // Fallback response if no keywords match
        const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        resolve({ response: randomFallback });
      }, 1500);
    });
  };
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    const botLoadingMessage: ChatMessage = {
      id: `loading-${Date.now().toString()}`,
      text: '',
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage, botLoadingMessage]);
    setInputValue('');
    
    const botResponse = await generateBotResponse(inputValue);
    
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages];
      const loadingIndex = updatedMessages.findIndex(msg => msg.id === botLoadingMessage.id);
      
      if (loadingIndex !== -1) {
        updatedMessages[loadingIndex] = {
          id: Date.now().toString(),
          text: botResponse.response,
          sender: 'bot',
          timestamp: new Date(),
          relatedArticles: botResponse.relatedArticles
        };
      }
      
      return updatedMessages;
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const viewArticle = (articleId: string) => {
    navigate(`/knowledge-base?article=${articleId}`);
  };
  
  return (
    <Card className="h-[600px] flex flex-col">
      <CardContent className="flex flex-col h-full p-0">
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
                        <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                      )
                    ) : (
                      <>
                        <AvatarFallback className="bg-primary">
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  
                  <div className={cn(
                    "rounded-lg px-4 py-2 max-w-full",
                    message.sender === 'user' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}>
                    {message.isLoading ? (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                      </div>
                    ) : (
                      <>
                        <div className="whitespace-pre-wrap">{message.text}</div>
                        
                        {message.relatedArticles && message.relatedArticles.length > 0 && (
                          <div className="mt-3 pt-2 border-t">
                            <p className="text-xs font-medium mb-2 flex items-center gap-1">
                              <Lightbulb className="h-3 w-3" />
                              Related Articles:
                            </p>
                            <div className="space-y-1">
                              {message.relatedArticles.map((article) => (
                                <button
                                  key={article.id}
                                  className="text-xs flex items-center justify-between w-full p-1 hover:bg-primary/10 rounded text-left transition-colors"
                                  onClick={() => viewArticle(article.id)}
                                >
                                  <span>{article.title}</span>
                                  <ArrowRight className="h-3 w-3" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
      </CardContent>
    </Card>
  );
};

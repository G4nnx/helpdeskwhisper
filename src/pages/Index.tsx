
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LaptopIcon, ArrowRight, Lightbulb, Headphones, Clock, Ticket } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-tr from-blue-50 to-indigo-50 py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 animate-slide-in-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                IT Support Helpdesk
              </h1>
              <p className="text-xl text-slate-700 mb-8 max-w-lg">
                Streamline your IT support process with our comprehensive helpdesk solution. Manage tickets, knowledge, and assets in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate('/login')}
                  size="lg"
                  className="group"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-lg blur-xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-md flex items-center">
                      <Ticket className="w-8 h-8 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium">Ticketing</p>
                        <p className="text-sm text-slate-500">Track issues</p>
                      </div>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-md flex items-center">
                      <Clock className="w-8 h-8 text-amber-500 mr-3" />
                      <div>
                        <p className="font-medium">SLA</p>
                        <p className="text-sm text-slate-500">Monitor time</p>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-md flex items-center">
                      <Lightbulb className="w-8 h-8 text-purple-500 mr-3" />
                      <div>
                        <p className="font-medium">Knowledge</p>
                        <p className="text-sm text-slate-500">Find solutions</p>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-md flex items-center">
                      <Headphones className="w-8 h-8 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium">Support</p>
                        <p className="text-sm text-slate-500">Get help</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for IT Teams</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to manage and streamline your IT support operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Ticket className="w-10 h-10 text-blue-500" />,
                title: 'Ticketing System',
                description: 'Track and manage support requests with customizable workflows and automatic notifications.',
              },
              {
                icon: <Lightbulb className="w-10 h-10 text-purple-500" />,
                title: 'Knowledge Base',
                description: 'Create and organize help articles to empower users to find solutions to common problems.',
              },
              {
                icon: <LaptopIcon className="w-10 h-10 text-green-500" />,
                title: 'Asset Management',
                description: 'Keep track of hardware, software, and other IT assets throughout their lifecycle.',
              },
              {
                icon: <Clock className="w-10 h-10 text-amber-500" />,
                title: 'SLA Management',
                description: 'Define and monitor service level agreements to ensure timely response and resolution.',
              },
              {
                icon: <Headphones className="w-10 h-10 text-red-500" />,
                title: 'Live Chat Support',
                description: 'Provide real-time assistance to users with integrated chat and automated responses.',
              },
              {
                icon: <ArrowRight className="w-10 h-10 text-teal-500" />,
                title: 'Reporting & Analytics',
                description: 'Gain insights into support performance with comprehensive dashboards and reports.',
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 border rounded-lg hover:shadow-md transition-all animate-slide-in-bottom"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container px-4 mx-auto text-center animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your IT support?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations that use our platform to deliver exceptional IT support experiences.
          </p>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-white text-blue-500 hover:bg-blue-50"
            onClick={() => navigate('/login')}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <LaptopIcon className="w-6 h-6 mr-2" />
              <span className="text-xl font-bold">IT Support Helpdesk</span>
            </div>
            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} IT Support Helpdesk. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

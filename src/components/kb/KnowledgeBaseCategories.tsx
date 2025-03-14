
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, MonitorSmartphone, Network, Printer, Lock, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type CategoryItemProps = {
  title: string;
  icon: React.ReactNode;
  count: number;
  onClick: () => void;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ title, icon, count, onClick }) => (
  <div 
    className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-accent transition-colors"
    onClick={onClick}
  >
    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-sm font-medium">{title}</div>
    </div>
    <div className="text-xs text-muted-foreground">{count}</div>
  </div>
);

export const KnowledgeBaseCategories: React.FC = () => {
  const navigate = useNavigate();
  
  // In a real app, these would come from the backend
  const categories = [
    { title: 'Account & Passwords', icon: <Lock className="h-4 w-4" />, count: 12 },
    { title: 'Network & Connectivity', icon: <Network className="h-4 w-4" />, count: 8 },
    { title: 'Email & Communication', icon: <FileText className="h-4 w-4" />, count: 15 },
    { title: 'Hardware & Devices', icon: <MonitorSmartphone className="h-4 w-4" />, count: 22 },
    { title: 'Printers & Scanning', icon: <Printer className="h-4 w-4" />, count: 7 },
    { title: 'General Help', icon: <HelpCircle className="h-4 w-4" />, count: 18 },
  ];
  
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3">Browse by Category</h3>
        <div className="space-y-1">
          {categories.map((category, index) => (
            <CategoryItem 
              key={index}
              title={category.title}
              icon={category.icon}
              count={category.count}
              onClick={() => {
                // In a real app, this would filter articles by category
                console.log(`Filtering by category: ${category.title}`);
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

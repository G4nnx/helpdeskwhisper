
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CalendarCheck, Tag } from 'lucide-react';
import { format } from 'date-fns';

export type AssetStatus = 'available' | 'in-use' | 'maintenance' | 'retired';
export type AssetType = 'laptop' | 'desktop' | 'printer' | 'phone' | 'server' | 'other';

export type Asset = {
  id: string;
  name: string;
  type: AssetType;
  model: string;
  serialNumber: string;
  status: AssetStatus;
  assignedTo?: {
    id: string;
    name: string;
  };
  purchaseDate: Date;
  lastMaintenance?: Date;
  notes?: string;
};

interface AssetCardProps {
  asset: Asset;
  className?: string;
  onClick?: () => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, className, onClick }) => {
  const statusColors: Record<AssetStatus, string> = {
    'available': 'bg-green-100 text-green-800 border-green-200',
    'in-use': 'bg-blue-100 text-blue-800 border-blue-200',
    'maintenance': 'bg-amber-100 text-amber-800 border-amber-200',
    'retired': 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const typeIcons: Record<AssetType, React.ReactNode> = {
    'laptop': '💻',
    'desktop': '🖥️',
    'printer': '🖨️',
    'phone': '📱',
    'server': '🖥️',
    'other': '📦',
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/50",
        "animate-scale-in",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge className={cn(statusColors[asset.status], "capitalize")}>
            {asset.status.replace('-', ' ')}
          </Badge>
          <div className="text-xl">{typeIcons[asset.type]}</div>
        </div>
        <CardTitle className="text-base font-medium line-clamp-1">
          {asset.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Model</p>
            <p>{asset.model}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">S/N</p>
            <p className="truncate">{asset.serialNumber}</p>
          </div>
        </div>
        
        {asset.assignedTo && (
          <div>
            <p className="text-xs text-muted-foreground">Assigned to</p>
            <p className="text-sm">{asset.assignedTo.name}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-2 flex items-center justify-between text-xs text-muted-foreground border-t">
        <div className="flex items-center gap-1">
          <CalendarCheck className="w-3 h-3" />
          <span>Purchased: {format(asset.purchaseDate, 'MMM yyyy')}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag className="w-3 h-3" />
          <span>{asset.type}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

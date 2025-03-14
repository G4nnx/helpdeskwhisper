
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Clock, ThumbsUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  categories: string[];
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  helpfulCount: number;
};

interface ArticleCardProps {
  article: Article;
  className?: string;
  onClick?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, className, onClick }) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/50 cursor-pointer",
        "animate-scale-in",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {article.categories.map((category) => (
            <Badge key={category} variant="outline" className="bg-primary/5">
              {category}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-base font-medium line-clamp-2">
          {article.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between text-xs text-muted-foreground border-t">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{formatDistanceToNow(article.updatedAt, { addSuffix: true })}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-3 h-3" />
            <span>{article.helpfulCount}</span>
          </div>
        </div>
        <div>
          <span>By {article.author.name}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

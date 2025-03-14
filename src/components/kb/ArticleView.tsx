
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ThumbsUp, Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/components/kb/ArticleCard';
import { formatDistanceToNow } from 'date-fns';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Articles
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-2 flex-wrap mb-4">
            {article.categories.map((category) => (
              <Badge key={category} variant="outline" className="bg-primary/5">
                {category}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6 border-b pb-4">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Updated {formatDistanceToNow(article.updatedAt, { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              <span>{article.helpfulCount} found this helpful</span>
            </div>
          </div>
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
          />
          
          <div className="mt-8 pt-4 border-t flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Was this article helpful?
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => console.log('Article marked as helpful')}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                Yes, it helped
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

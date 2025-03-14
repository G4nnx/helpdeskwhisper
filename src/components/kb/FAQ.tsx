
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type FAQItem = {
  question: string;
  answer: string;
};

interface FAQProps {
  faqItems: FAQItem[];
  searchQuery?: string;
}

export const FAQ: React.FC<FAQProps> = ({ faqItems, searchQuery = '' }) => {
  // Filter FAQ items based on search query
  const filteredFAQs = searchQuery.trim() === ''
    ? faqItems
    : faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">
        Frequently Asked Questions
        {searchQuery && ` (${filteredFAQs.length} results)`}
      </h2>
      
      {filteredFAQs.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          {filteredFAQs.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-base">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No FAQ entries found matching your search.</p>
        </div>
      )}
    </div>
  );
};

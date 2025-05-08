
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuoteFormActionsProps {
  isSubmitting: boolean;
}

const QuoteFormActions = ({ isSubmitting }: QuoteFormActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <CardFooter className="flex justify-between px-0">
      <Button type="button" variant="outline" onClick={() => navigate(-1)}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
          </>
        ) : (
          'Create Quote'
        )}
      </Button>
    </CardFooter>
  );
};

export default QuoteFormActions;

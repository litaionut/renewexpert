
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceRequest } from '../types';

interface QuoteHeaderProps {
  request: ServiceRequest;
}

const QuoteHeader = ({ request }: QuoteHeaderProps) => {
  return (
    <CardHeader>
      <CardTitle className="text-xl">Create Quote for {request?.project_name}</CardTitle>
    </CardHeader>
  );
};

export default QuoteHeader;

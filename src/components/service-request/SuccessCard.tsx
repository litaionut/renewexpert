
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SuccessCardProps {
  onDashboardClick: () => void;
}

const SuccessCard: React.FC<SuccessCardProps> = ({ onDashboardClick }) => {
  return (
    <div className="container py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-green-600">
            Service Request Submitted!
          </CardTitle>
          <CardDescription className="text-center">
            Your service request has been successfully submitted. You will receive an email confirmation shortly.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={onDashboardClick}>Go to Dashboard</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessCard;

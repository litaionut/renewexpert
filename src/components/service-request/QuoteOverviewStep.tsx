
import React, { useRef } from 'react';
import { Euro } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface QuoteOverviewStepProps {
  quote: {
    basePrice: number;
    urgencyFee: number;
    sizeFee: number;
    deliverablesFee: number;
    discount: number;
    total: number;
  };
  formData: {
    paymentOption: string;
    agreeToTerms: boolean;
  };
  signatureRef: React.RefObject<HTMLCanvasElement>;
  isSignaturePadEmpty: boolean;
  handleCheckboxChange: (name: string, checked: boolean) => void;
}

const QuoteOverviewStep: React.FC<QuoteOverviewStepProps> = ({
  quote,
  formData,
  signatureRef,
  isSignaturePadEmpty,
  handleCheckboxChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-md p-5 border">
        <h3 className="font-medium text-lg flex items-center">
          <Euro className="h-5 w-5 mr-2" />
          Quote Overview
        </h3>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between py-2">
            <span>Base Price</span>
            <span>€{quote.basePrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Farm Size Fee</span>
            <span>€{quote.sizeFee.toLocaleString()}</span>
          </div>
          {quote.urgencyFee > 0 && (
            <div className="flex justify-between py-2">
              <span>{formData.paymentOption === 'urgent' ? 'Urgent' : 'Priority'} Timeline Fee</span>
              <span>€{quote.urgencyFee.toLocaleString()}</span>
            </div>
          )}
          {quote.deliverablesFee > 0 && (
            <div className="flex justify-between py-2">
              <span>Additional Deliverables</span>
              <span>€{quote.deliverablesFee.toLocaleString()}</span>
            </div>
          )}
          {quote.discount > 0 && (
            <div className="flex justify-between py-2 text-green-600">
              <span>Full Payment Discount (10%)</span>
              <span>-€{quote.discount.toLocaleString()}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between py-2 font-semibold text-lg">
            <span>Total Quote</span>
            <span>€{quote.total.toLocaleString()}</span>
          </div>
          {formData.paymentOption === 'split' && (
            <div className="text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>First Payment (50%)</span>
                <span>€{(quote.total / 2).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Final Payment (50%)</span>
                <span>€{(quote.total / 2).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Please sign below to accept the quote</Label>
        <div className="border rounded-md p-4 space-y-2">
          <canvas 
            ref={signatureRef}
            width="500"
            height="150"
            className="w-full border rounded-md bg-white cursor-crosshair"
          />
          <div className="text-right">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              id="clear-signature"
              className="text-xs"
            >
              Clear Signature
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mt-4">
        <Checkbox 
          id="agreeToTerms" 
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => 
            handleCheckboxChange('agreeToTerms', checked === true)
          }
          required
        />
        <Label htmlFor="agreeToTerms" className="text-sm">
          I agree to the terms and conditions, and confirm that the information provided is correct.
        </Label>
      </div>
    </div>
  );
};

export default QuoteOverviewStep;


import { Euro } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { UseFormReturn } from 'react-hook-form';

interface QuoteSummaryProps {
  form: UseFormReturn<any>;
}

const QuoteSummary = ({ form }: QuoteSummaryProps) => {
  return (
    <div className="bg-gray-50 rounded-md p-5 border">
      <h3 className="font-medium text-lg flex items-center">
        <Euro className="h-5 w-5 mr-2" />
        Quote Summary
      </h3>
      
      <div className="mt-4 space-y-2">
        <div className="flex justify-between py-2">
          <span>Base Price</span>
          <span>€{form.getValues('basePrice').toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Farm Size Fee</span>
          <span>€{form.getValues('sizeFee').toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Urgency Fee</span>
          <span>€{form.getValues('urgencyFee').toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Deliverables Fee</span>
          <span>€{form.getValues('deliverablesFee').toLocaleString()}</span>
        </div>
        {form.getValues('discount') > 0 && (
          <div className="flex justify-between py-2 text-green-600">
            <span>Discount</span>
            <span>-€{form.getValues('discount').toLocaleString()}</span>
          </div>
        )}
        <Separator />
        <div className="flex justify-between py-2 font-semibold text-lg">
          <span>Total Quote</span>
          <span>€{form.getValues('totalAmount').toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default QuoteSummary;

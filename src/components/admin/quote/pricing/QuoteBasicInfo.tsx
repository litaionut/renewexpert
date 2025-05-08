
import { UseFormReturn } from 'react-hook-form';
import PriceInput from './PriceInput';
import PaymentOptionSelect from './PaymentOptionSelect';
import { QuoteFormData } from '../schemas/quoteValidation';

interface QuoteBasicInfoProps {
  form: UseFormReturn<any>;
  handlePaymentOptionChange: (value: string) => void;
}

const QuoteBasicInfo = ({ form, handlePaymentOptionChange }: QuoteBasicInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PriceInput
        form={form}
        name="basePrice"
        label="Base Price"
      />
      
      <PriceInput
        form={form}
        name="urgencyFee"
        label="Urgency Fee"
      />
      
      <PriceInput
        form={form}
        name="sizeFee"
        label="Size Fee"
      />
      
      <PriceInput
        form={form}
        name="deliverablesFee"
        label="Deliverables Fee"
        readOnly
        description="Auto-calculated based on selected deliverables"
      />

      <PaymentOptionSelect 
        form={form}
        onPaymentOptionChange={handlePaymentOptionChange}
      />

      <PriceInput
        form={form}
        name="discount"
        label="Discount"
      />
    </div>
  );
};

export default QuoteBasicInfo;

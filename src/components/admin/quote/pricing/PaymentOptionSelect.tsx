
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';

interface PaymentOptionSelectProps {
  form: UseFormReturn<any>;
  onPaymentOptionChange: (value: string) => void;
}

const PaymentOptionSelect = ({ form, onPaymentOptionChange }: PaymentOptionSelectProps) => {
  return (
    <div>
      <Label>Payment Option</Label>
      <Select
        value={form.getValues("paymentOption")}
        onValueChange={onPaymentOptionChange}
      >
        <SelectTrigger className="w-full mt-1">
          <SelectValue placeholder="Select payment option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="split">Split Payment (50/50)</SelectItem>
          <SelectItem value="full">Full Payment (10% discount)</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground mt-1">
        Full payment offers a 10% discount on the total amount
      </p>
    </div>
  );
};

export default PaymentOptionSelect;

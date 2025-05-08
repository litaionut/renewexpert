
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface PriceInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  readOnly?: boolean;
  description?: string;
}

const PriceInput = ({ form, name, label, readOnly, description }: PriceInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">€</span>
              <Input {...field} type="number" className="pl-8" readOnly={readOnly} />
            </div>
          </FormControl>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PriceInput;

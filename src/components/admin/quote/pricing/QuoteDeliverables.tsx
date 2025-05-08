
import { FormField, FormItem, FormControl, FormDescription, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';

interface QuoteDeliverablesProps {
  form: UseFormReturn<any>;
  updateDeliverablesFee: () => void;
}

const QuoteDeliverables = ({ form, updateDeliverablesFee }: QuoteDeliverablesProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Deliverables</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="includeKeyFigures"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 border p-4 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    updateDeliverablesFee();
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Key Figures (€500)</FormLabel>
                <FormDescription>Essential metrics and KPIs</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="includeDetailedReport"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 border p-4 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    updateDeliverablesFee();
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Detailed Report (€1000)</FormLabel>
                <FormDescription>Comprehensive analysis</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="includeRawData"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 border p-4 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    updateDeliverablesFee();
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Raw Data (€800)</FormLabel>
                <FormDescription>Processed datasets in CSV/Excel</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="includePresentation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 border p-4 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    updateDeliverablesFee();
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Presentation (€1200)</FormLabel>
                <FormDescription>Executive summary presentation</FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default QuoteDeliverables;

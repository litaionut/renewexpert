
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ServiceType } from '@/types';
import { calculateQuote } from '@/utils/quoteCalculations';
import { FormField } from '@/components/ui/form';
import QuoteBasicInfo from './quote/pricing/QuoteBasicInfo';
import QuoteDeliverables from './quote/pricing/QuoteDeliverables'; 
import QuoteSummary from './quote/pricing/QuoteSummary';
import type { ServiceRequest } from './quote/types';

const formSchema = z.object({
  basePrice: z.coerce.number().min(0, "Base price is required"),
  urgencyFee: z.coerce.number().min(0, "Urgency fee is required"),
  sizeFee: z.coerce.number().min(0, "Size fee is required"),
  deliverablesFee: z.coerce.number().min(0, "Deliverables fee is required"),
  discount: z.coerce.number().min(0, "Discount is required"),
  totalAmount: z.coerce.number().min(0, "Total amount is required"),
  paymentOption: z.enum(["split", "full"]),
  includeKeyFigures: z.boolean().default(false),
  includeDetailedReport: z.boolean().default(false),
  includeRawData: z.boolean().default(false),
  includePresentation: z.boolean().default(false),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const QuoteForm = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basePrice: 0,
      urgencyFee: 0,
      sizeFee: 0,
      deliverablesFee: 0,
      discount: 0,
      totalAmount: 0,
      paymentOption: "split",
      includeKeyFigures: false,
      includeDetailedReport: false,
      includeRawData: false,
      includePresentation: false,
      notes: "",
    },
  });

  const { data: request, isLoading: isLoadingRequest } = useQuery({
    queryKey: ['service-request', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_requests')
        .select(`
          *,
          profiles:client_id (name)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Ensure data is correctly typed to match ServiceRequest
      const serviceRequest = data as unknown as ServiceRequest;
      
      const quoteValues = calculateQuote({
        serviceType: serviceRequest.service_type as ServiceType,
        farmSize: serviceRequest.farm_size,
        urgency: serviceRequest.urgency,
        deliverables: {
          keyFigures: true,
          detailedReport: false,
          rawData: false,
          presentation: false,
        },
        paymentOption: "split",
      });
      
      form.setValue('basePrice', quoteValues.basePrice);
      form.setValue('urgencyFee', quoteValues.urgencyFee);
      form.setValue('sizeFee', quoteValues.sizeFee);
      form.setValue('deliverablesFee', quoteValues.deliverablesFee);
      form.setValue('discount', quoteValues.discount);
      form.setValue('totalAmount', quoteValues.total);
      
      return serviceRequest;
    },
  });

  const updateDeliverablesFee = () => {
    let fee = 0;
    if (form.getValues('includeKeyFigures')) fee += 500;
    if (form.getValues('includeDetailedReport')) fee += 1000;
    if (form.getValues('includeRawData')) fee += 800;
    if (form.getValues('includePresentation')) fee += 1200;
    
    form.setValue('deliverablesFee', fee);
  };

  const handlePaymentOptionChange = (value: string) => {
    form.setValue('paymentOption', value as "split" | "full");
    
    if (value === 'full') {
      const basePrice = form.getValues('basePrice');
      const urgencyFee = form.getValues('urgencyFee');
      const sizeFee = form.getValues('sizeFee');
      const deliverablesFee = form.getValues('deliverablesFee');
      
      const subtotal = basePrice + urgencyFee + sizeFee + deliverablesFee;
      form.setValue('discount', subtotal * 0.1);
    } else {
      form.setValue('discount', 0);
    }
  };

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (['basePrice', 'urgencyFee', 'sizeFee', 'deliverablesFee', 'discount'].includes(name || '')) {
        const basePrice = form.getValues('basePrice') || 0;
        const urgencyFee = form.getValues('urgencyFee') || 0;
        const sizeFee = form.getValues('sizeFee') || 0;
        const deliverablesFee = form.getValues('deliverablesFee') || 0;
        const discount = form.getValues('discount') || 0;
        
        const total = basePrice + urgencyFee + sizeFee + deliverablesFee - discount;
        form.setValue('totalAmount', total);
      }
    });
    
    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, [form]);

  const onSubmit = async (values: FormData) => {
    if (!id) return;
    
    setIsSubmitting(true);
    
    try {
      const deliverables = {
        keyFigures: values.includeKeyFigures,
        detailedReport: values.includeDetailedReport,
        rawData: values.includeRawData,
        presentation: values.includePresentation,
      };
      
      const { data: quoteData, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          service_request_id: id,
          base_price: values.basePrice,
          urgency_fee: values.urgencyFee,
          size_fee: values.sizeFee,
          deliverables_fee: values.deliverablesFee,
          discount: values.discount,
          total_amount: values.totalAmount,
          payment_option: values.paymentOption,
          deliverables: deliverables,
          status: 'pending',
        })
        .select();
        
      if (quoteError) throw quoteError;
      
      const { error: updateError } = await supabase
        .from('service_requests')
        .update({ status: 'quoted' })
        .eq('id', id);
        
      if (updateError) throw updateError;
      
      toast({
        title: "Quote Created",
        description: "The quote has been successfully created and sent to the client.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingRequest) {
    return <div className="p-8 text-center">Loading request details...</div>;
  }

  if (!request) {
    return <div className="p-8 text-center">Service request not found</div>;
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Create Quote for {request.project_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Client</p>
            <p className="text-sm text-muted-foreground">{request.profiles?.name || "Unknown"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Project Type</p>
            <p className="text-sm text-muted-foreground">{request.project_type}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Service Type</p>
            <p className="text-sm text-muted-foreground">{request.service_type}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Farm Size</p>
            <p className="text-sm text-muted-foreground">{request.farm_size} MW</p>
          </div>
          <div>
            <p className="text-sm font-medium">Location</p>
            <p className="text-sm text-muted-foreground">{request.project_location || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Urgency</p>
            <p className="text-sm text-muted-foreground">{request.urgency}</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <QuoteBasicInfo form={form} handlePaymentOptionChange={handlePaymentOptionChange} />
            
            <QuoteDeliverables form={form} updateDeliverablesFee={updateDeliverablesFee} />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <div>
                    <Label>Notes for Client</Label>
                    <Textarea
                      placeholder="Add any additional notes or comments for the client..."
                      className="resize-none mt-2"
                      {...field}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      These notes will be visible to the client
                    </p>
                  </div>
                )}
              />
            </div>

            <QuoteSummary form={form} />

            <CardFooter className="flex justify-between px-0">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Quote"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuoteForm;

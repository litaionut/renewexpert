import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ServiceType } from '@/types';
import { calculateQuote } from '@/utils/quoteCalculations';
import { formSchema } from '../schemas/quoteFormSchema';
import type { FormData } from '../schemas/quoteFormSchema';

export const useQuoteForm = () => {
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
      const { data: requestData, error: requestError } = await supabase
        .from('service_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (requestError) throw requestError;

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', requestData.client_id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      }
      
      const quoteValues = calculateQuote({
        serviceType: requestData.service_type as ServiceType,
        farmSize: requestData.farm_size,
        urgency: requestData.urgency,
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
      
      return {
        ...requestData,
        profiles: { 
          name: profileData?.name || "Unknown" 
        }
      };
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (['basePrice', 'urgencyFee', 'sizeFee', 'deliverablesFee', 'discount'].includes(name || '')) {
        const total = calculateTotalAmount(form.getValues());
        form.setValue('totalAmount', total);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  const handlePaymentOptionChange = (value: string) => {
    form.setValue('paymentOption', value as "split" | "full");
    const subtotal = calculateSubtotal(form.getValues());
    const discount = value === 'full' ? subtotal * 0.1 : 0;
    form.setValue('discount', discount);
  };

  const updateDeliverablesFee = () => {
    let fee = 0;
    if (form.getValues('includeKeyFigures')) fee += 500;
    if (form.getValues('includeDetailedReport')) fee += 1000;
    if (form.getValues('includeRawData')) fee += 800;
    if (form.getValues('includePresentation')) fee += 1200;
    
    form.setValue('deliverablesFee', fee);
  };

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
      
      const { error: quoteError } = await supabase
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
          deliverables,
          status: 'pending',
        });
        
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
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    request,
    isLoadingRequest,
    isSubmitting,
    updateDeliverablesFee,
    handlePaymentOptionChange,
    onSubmit,
  };
};

const calculateTotalAmount = (values: FormData) => {
  const {
    basePrice = 0,
    urgencyFee = 0,
    sizeFee = 0,
    deliverablesFee = 0,
    discount = 0
  } = values;
  return basePrice + urgencyFee + sizeFee + deliverablesFee - discount;
};

const calculateSubtotal = (values: FormData) => {
  const {
    basePrice = 0,
    urgencyFee = 0,
    sizeFee = 0,
    deliverablesFee = 0
  } = values;
  return basePrice + urgencyFee + sizeFee + deliverablesFee;
};

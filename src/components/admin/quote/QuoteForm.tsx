
import React from 'react';
import { Form } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import QuoteBasicInfo from './pricing/QuoteBasicInfo';
import QuoteDeliverables from './pricing/QuoteDeliverables';
import QuoteSummary from './pricing/QuoteSummary';
import QuoteHeader from './layout/QuoteHeader';
import RequestDetails from './layout/RequestDetails';
import QuoteFormActions from './layout/QuoteFormActions';
import { useQuoteForm } from './hooks/useQuoteForm';

const QuoteForm = () => {
  const {
    form,
    request,
    isLoadingRequest,
    isSubmitting,
    updateDeliverablesFee,
    handlePaymentOptionChange,
    onSubmit,
  } = useQuoteForm();

  if (isLoadingRequest) {
    return <div className="p-8 text-center">Loading request details...</div>;
  }

  if (!request) {
    return <div className="p-8 text-center">Service request not found</div>;
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <QuoteHeader request={request} />
      <CardContent>
        <RequestDetails request={request} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <QuoteBasicInfo 
              form={form} 
              handlePaymentOptionChange={handlePaymentOptionChange} 
            />
            <QuoteDeliverables 
              form={form} 
              updateDeliverablesFee={updateDeliverablesFee} 
            />
            <QuoteSummary form={form} />
            <QuoteFormActions isSubmitting={isSubmitting} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuoteForm;

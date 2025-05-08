
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { calculateQuote } from '@/utils/quoteCalculations';
import ProjectInfoStep from '@/components/service-request/ProjectInfoStep';
import ProjectDetailsStep from '@/components/service-request/ProjectDetailsStep';
import ServiceRequirementsStep from '@/components/service-request/ServiceRequirementsStep';
import QuoteOverviewStep from '@/components/service-request/QuoteOverviewStep';
import SuccessCard from '@/components/service-request/SuccessCard';
import useServiceRequestForm from '@/hooks/useServiceRequestForm';

const ServiceRequestPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    formData,
    isSubmitting,
    error,
    success,
    step,
    isSignaturePadEmpty,
    handleChange,
    handleNumberChange,
    handleSelectChange,
    handleRadioChange,
    handleCheckboxChange,
    handleDateChange,
    nextStep,
    prevStep,
    handleSubmit,
    isStepValid,
    signatureRef,
  } = useServiceRequestForm();
  
  // Calculate the quote based on form data
  const quote = calculateQuote(formData);

  if (success) {
    return <SuccessCard onDashboardClick={() => navigate('/dashboard')} />;
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">New Service Request</h1>
          <p className="text-muted-foreground">
            Fill out the form below to request a service quote for your renewable energy project
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <div className="space-y-1">
                <CardTitle>Step {step} of 4</CardTitle>
                <CardDescription>
                  {step === 1 && "Project Information"}
                  {step === 2 && "Project Details"}
                  {step === 3 && "Service Requirements"}
                  {step === 4 && "Review & Submit"}
                </CardDescription>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-2 w-10 rounded-full ${
                      s === step ? 'bg-brand-teal' : s < step ? 'bg-brand-teal-light' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <ProjectInfoStep
                  formData={formData}
                  handleChange={handleChange}
                  handleNumberChange={handleNumberChange}
                  handleSelectChange={handleSelectChange}
                />
              )}

              {step === 2 && (
                <ProjectDetailsStep
                  formData={formData}
                  handleChange={handleChange}
                  handleDateChange={handleDateChange}
                />
              )}

              {step === 3 && (
                <ServiceRequirementsStep
                  formData={formData}
                  handleCheckboxChange={handleCheckboxChange}
                  handleRadioChange={handleRadioChange}
                />
              )}

              {step === 4 && (
                <QuoteOverviewStep
                  quote={quote}
                  formData={formData}
                  signatureRef={signatureRef}
                  isSignaturePadEmpty={isSignaturePadEmpty}
                  handleCheckboxChange={handleCheckboxChange}
                />
              )}

              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                )}
                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="ml-auto"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="ml-auto"
                    disabled={isSubmitting || !isStepValid()}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceRequestPage;

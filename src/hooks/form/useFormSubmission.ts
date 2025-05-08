
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (formData: any, userId: string) => {
    setIsSubmitting(true);
    setError('');

    try {
      const { data, error: insertError } = await supabase
        .from('service_requests')
        .insert({
          project_name: formData.projectName,
          project_type: formData.projectType,
          farm_size: formData.farmSize,
          service_type: formData.serviceType,
          project_location: formData.projectLocation,
          coordinates: formData.coordinates,
          description: formData.description,
          deadline: formData.deadline?.toISOString(),
          urgency: formData.urgency,
          status: 'pending',
          client_id: userId
        })
        .select()
        .single();

      if (insertError) throw insertError;

      toast({
        title: "Request Submitted",
        description: "Your service request has been successfully submitted.",
      });

      setSuccess(true);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    error,
    success,
    handleSubmit,
  };
};


import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ServiceType, ProjectType } from '@/types';
import { useFormNavigation } from './form/useFormNavigation';
import { useFormSubmission } from './form/useFormSubmission';
import { useSignaturePad } from './form/useSignaturePad';

const useServiceRequestForm = () => {
  const { user } = useAuth();
  const { step, nextStep, prevStep } = useFormNavigation(4); // Updated total steps to 4
  const { isSubmitting, error, success, handleSubmit: submitFormData } = useFormSubmission();
  const { signatureRef, isSignaturePadEmpty } = useSignaturePad();

  const [formData, setFormData] = useState({
    projectName: '',
    projectType: '' as ProjectType,
    farmSize: 0,
    serviceType: '' as ServiceType,
    description: '',
    coordinates: '',
    deadline: null as Date | null,
    additionalInfo: '',
    urgency: 'standard',
    paymentOption: 'split',
    deliverables: {
      keyFigures: false,
      detailedReport: false,
      rawData: false,
      presentation: false,
    },
    agreeToTerms: false,
    signature: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (name.includes('deliverables.')) {
      const deliverableName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        deliverables: {
          ...prev.deliverables,
          [deliverableName]: checked
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: checked }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, deadline: date }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!formData.projectName && 
               !!formData.projectType && 
               formData.farmSize > 0 && 
               !!formData.serviceType;
      case 2:
        return !!formData.description; // Only description is required in step 2
      case 3:
        return !!formData.urgency &&
               !!formData.paymentOption;
      case 4:
        return !isSignaturePadEmpty && formData.agreeToTerms;
      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    await submitFormData(formData, user.id);
  };

  return {
    formData,
    isSubmitting,
    error,
    success,
    step,
    isSignaturePadEmpty,
    signatureRef,
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
  };
};

export default useServiceRequestForm;

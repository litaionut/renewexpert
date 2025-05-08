
import { ServiceType } from '@/types';

export const calculateQuote = (formData: {
  serviceType: ServiceType;
  farmSize: number;
  urgency: string;
  deliverables: {
    keyFigures: boolean;
    detailedReport: boolean;
    rawData: boolean;
    presentation: boolean;
  };
  paymentOption: string;
}) => {
  if (!formData.serviceType) {
    return {
      basePrice: 0,
      urgencyFee: 0,
      sizeFee: 0,
      deliverablesFee: 0,
      discount: 0,
      total: 0
    };
  }
  
  // Base price based on service type
  let basePrice = 0;
  switch (formData.serviceType) {
    case 'feasibility': basePrice = 2500; break;
    case 'assessment': basePrice = 3500; break;
    case 'dueDiligence': basePrice = 4500; break;
    case 'siteSelection': basePrice = 3000; break;
    case 'performanceAnalysis': basePrice = 4000; break;
    default: basePrice = 2500;
  }
  
  // Farm size fee (100€ per MW, simplified calculation)
  const sizeFee = formData.farmSize * 100;
  
  // Urgency fee
  let urgencyFee = 0;
  switch (formData.urgency) {
    case 'urgent': urgencyFee = basePrice * 0.5; break; // +50% for urgent (48h)
    case 'priority': urgencyFee = basePrice * 0.25; break; // +25% for priority (1 week)
    default: urgencyFee = 0; // standard (30 days)
  }
  
  // Deliverables fee
  let deliverablesFee = 0;
  if (formData.deliverables.keyFigures) deliverablesFee += 500;
  if (formData.deliverables.detailedReport) deliverablesFee += 1000;
  if (formData.deliverables.rawData) deliverablesFee += 800;
  if (formData.deliverables.presentation) deliverablesFee += 1200;
  
  // Payment discount
  const subtotal = basePrice + sizeFee + urgencyFee + deliverablesFee;
  const discount = formData.paymentOption === 'full' ? subtotal * 0.1 : 0; // 10% discount for full payment
  
  // Calculate total
  const total = subtotal - discount;
  
  return {
    basePrice,
    urgencyFee,
    sizeFee,
    deliverablesFee,
    discount,
    total
  };
};

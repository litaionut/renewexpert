
import { calculateQuote } from '../quoteCalculations';
import { ServiceType } from '@/types';

describe('calculateQuote', () => {
  it('should calculate quote for feasibility study with standard urgency', () => {
    const result = calculateQuote({
      serviceType: 'feasibility' as ServiceType,
      farmSize: 10,
      urgency: 'standard',
      deliverables: {
        keyFigures: true,
        detailedReport: false,
        rawData: false,
        presentation: false
      },
      paymentOption: 'split'
    });

    expect(result).toEqual({
      basePrice: 2500,
      urgencyFee: 0,
      sizeFee: 1000, // 10 MW * 100
      deliverablesFee: 500, // Only key figures
      discount: 0, // No discount for split payment
      total: 4000
    });
  });

  it('should calculate quote with urgent timeline and full payment', () => {
    const result = calculateQuote({
      serviceType: 'assessment' as ServiceType,
      farmSize: 20,
      urgency: 'urgent',
      deliverables: {
        keyFigures: true,
        detailedReport: true,
        rawData: true,
        presentation: true
      },
      paymentOption: 'full'
    });

    const basePrice = 3500;
    const urgencyFee = basePrice * 0.5; // 50% urgency fee
    const sizeFee = 20 * 100; // 20 MW * 100
    const deliverablesFee = 3500; // All deliverables
    const subtotal = basePrice + urgencyFee + sizeFee + deliverablesFee;
    const discount = subtotal * 0.1; // 10% discount for full payment

    expect(result).toEqual({
      basePrice,
      urgencyFee,
      sizeFee,
      deliverablesFee,
      discount,
      total: subtotal - discount
    });
  });

  it('should return zero values when no service type is provided', () => {
    const result = calculateQuote({
      serviceType: '' as ServiceType,
      farmSize: 10,
      urgency: 'standard',
      deliverables: {
        keyFigures: true,
        detailedReport: false,
        rawData: false,
        presentation: false
      },
      paymentOption: 'split'
    });

    expect(result).toEqual({
      basePrice: 0,
      urgencyFee: 0,
      sizeFee: 0,
      deliverablesFee: 0,
      discount: 0,
      total: 0
    });
  });
});

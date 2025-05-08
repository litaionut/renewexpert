
import { 
  calculateTotalAmount, 
  calculateDeliverablesPrice, 
  calculatePaymentDiscount 
} from '../priceCalculations';

describe('calculateTotalAmount', () => {
  it('should correctly calculate total with all fees and discount', () => {
    const result = calculateTotalAmount({
      basePrice: 2500,
      urgencyFee: 1250,
      sizeFee: 500,
      deliverablesFee: 1000,
      discount: 525
    });
    expect(result).toBe(4725); // 2500 + 1250 + 500 + 1000 - 525
  });

  it('should handle zero values', () => {
    const result = calculateTotalAmount({
      basePrice: 0,
      urgencyFee: 0,
      sizeFee: 0,
      deliverablesFee: 0,
      discount: 0
    });
    expect(result).toBe(0);
  });
});

describe('calculateDeliverablesPrice', () => {
  it('should calculate price with all deliverables', () => {
    const result = calculateDeliverablesPrice({
      keyFigures: true,
      detailedReport: true,
      rawData: true,
      presentation: true
    });
    expect(result).toBe(3500); // 500 + 1000 + 800 + 1200
  });

  it('should calculate price with some deliverables', () => {
    const result = calculateDeliverablesPrice({
      keyFigures: true,
      detailedReport: false,
      rawData: true,
      presentation: false
    });
    expect(result).toBe(1300); // 500 + 800
  });

  it('should return 0 with no deliverables', () => {
    const result = calculateDeliverablesPrice({
      keyFigures: false,
      detailedReport: false,
      rawData: false,
      presentation: false
    });
    expect(result).toBe(0);
  });
});

describe('calculatePaymentDiscount', () => {
  it('should apply 10% discount for full payment', () => {
    const result = calculatePaymentDiscount(1000, 'full');
    expect(result).toBe(100);
  });

  it('should return 0 discount for split payment', () => {
    const result = calculatePaymentDiscount(1000, 'split');
    expect(result).toBe(0);
  });

  it('should handle zero subtotal', () => {
    const result = calculatePaymentDiscount(0, 'full');
    expect(result).toBe(0);
  });
});

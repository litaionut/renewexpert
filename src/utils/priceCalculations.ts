
interface PriceCalculationOptions {
  basePrice: number;
  urgencyFee: number;
  sizeFee: number;
  deliverablesFee: number;
  discount: number;
}

export const calculateTotalAmount = ({
  basePrice,
  urgencyFee,
  sizeFee,
  deliverablesFee,
  discount
}: PriceCalculationOptions): number => {
  return basePrice + urgencyFee + sizeFee + deliverablesFee - discount;
};

export const calculateDeliverablesPrice = (deliverables: {
  keyFigures: boolean;
  detailedReport: boolean;
  rawData: boolean;
  presentation: boolean;
}): number => {
  let fee = 0;
  if (deliverables.keyFigures) fee += 500;
  if (deliverables.detailedReport) fee += 1000;
  if (deliverables.rawData) fee += 800;
  if (deliverables.presentation) fee += 1200;
  return fee;
};

export const calculatePaymentDiscount = (subtotal: number, paymentOption: 'split' | 'full'): number => {
  return paymentOption === 'full' ? subtotal * 0.1 : 0;
};

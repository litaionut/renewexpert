
import { z } from "zod";

export const quoteFormSchema = z.object({
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

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

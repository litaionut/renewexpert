
export interface ServiceRequest {
  id: string;
  project_name: string;
  client_id: string;
  service_type: string;
  project_type: string;
  farm_size: number;
  urgency: string;
  project_location: string | null;
  status: string;
  created_at: string;
  profiles?: {
    name?: string | null;
  } | null;
  description?: string | null;
  attachments?: string[] | null;
  expert_id?: string | null;
  coordinates?: string | null;
  deadline?: string | null;
  updated_at?: string;
}

export interface QuoteFormData {
  basePrice: number;
  urgencyFee: number;
  sizeFee: number;
  deliverablesFee: number;
  discount: number;
  totalAmount: number;
  paymentOption: "split" | "full";
  includeKeyFigures: boolean;
  includeDetailedReport: boolean;
  includeRawData: boolean;
  includePresentation: boolean;
  notes?: string;
}

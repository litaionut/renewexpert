
// Types for our application

export type ProjectStatus = 'pending' | 'in-progress' | 'review' | 'completed' | 'cancelled';
export type ProjectType = 'wind' | 'solar' | 'hybrid' | 'other';
export type ServiceType = 
  | 'feasibility' 
  | 'assessment' 
  | 'dueDiligence' 
  | 'siteSelection' 
  | 'performanceAnalysis'
  | 'other';

export type UrgencyLevel = 'low' | 'normal' | 'high' | 'urgent' | 'priority' | 'standard';

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  serviceType: ServiceType;
  location: string;
  coordinates?: string;
  clientId: string;
  expertId?: string;
  status: ProjectStatus;
  startDate: string;
  dueDate: string;
  completedDate?: string;
  urgency: UrgencyLevel;
  attachments?: string[];
  progress: number;
}

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Document {
  id: string;
  projectId: string;
  name: string;
  type: string;
  uploadedBy: string;
  uploadedDate: string;
  url: string;
}

export interface Quote {
  id: string;
  projectId: string;
  amount: number;
  currency: string;
  breakdown: {
    item: string;
    amount: number;
  }[];
  status: 'pending' | 'accepted' | 'rejected' | 'paid';
  createdDate: string;
  expiryDate: string;
  paymentSchedule: 'upfront' | 'milestone' | 'completion';
  discountApplied?: boolean;
  paymentOption?: 'split' | 'full';
}


import { Project, Message } from '../types';

// Mock projects data
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Wind Farm Feasibility Study',
    description: 'Comprehensive feasibility study for a 50MW wind farm project in coastal region. Includes site assessment, wind resource analysis, and preliminary environmental impact.',
    type: 'wind',
    serviceType: 'feasibility',
    location: 'Coastal Region, Denmark',
    coordinates: '57.1234, 9.9876',
    clientId: '1', // John Client
    expertId: '2', // Jane Expert
    status: 'in-progress',
    startDate: '2025-04-20',
    dueDate: '2025-05-20',
    urgency: 'normal',
    progress: 40,
  },
  {
    id: '2',
    title: 'Solar Plant Technical Due Diligence',
    description: 'Technical due diligence for a 25MW solar PV plant acquisition. Review of technical documents, site visits, and performance assessment.',
    type: 'solar',
    serviceType: 'dueDiligence',
    location: 'Southwest Region, Spain',
    clientId: '1', // John Client
    expertId: '2', // Jane Expert
    status: 'completed',
    startDate: '2025-03-15',
    dueDate: '2025-04-15',
    completedDate: '2025-04-12',
    urgency: 'high',
    progress: 100,
  },
  {
    id: '3',
    title: 'Hybrid Renewable Energy System Assessment',
    description: 'Technical assessment of a hybrid wind-solar-battery system for an island community. Focus on system integration, reliability, and economic viability.',
    type: 'hybrid',
    serviceType: 'assessment',
    location: 'Island Community, Greece',
    clientId: '1', // John Client
    expertId: '2', // Jane Expert
    status: 'review',
    startDate: '2025-04-01',
    dueDate: '2025-05-15',
    urgency: 'normal',
    progress: 80,
  },
  {
    id: '4',
    title: 'Wind Turbine Performance Optimization',
    description: 'Analysis and recommendations for improving performance of existing 2MW wind turbines at an operational wind farm.',
    type: 'wind',
    serviceType: 'performanceAnalysis',
    location: 'Mountain Region, Germany',
    clientId: '3', // Another client
    expertId: '2', // Jane Expert
    status: 'in-progress',
    startDate: '2025-04-10',
    dueDate: '2025-05-10',
    urgency: 'normal',
    progress: 35,
  },
];

// Mock messages data
export const mockMessages: Message[] = [
  {
    id: '1',
    projectId: '1',
    senderId: '1', // John Client
    senderName: 'John Client',
    content: 'Hi, I wanted to check if there are any additional documents you need for the wind farm feasibility study?',
    timestamp: '2025-04-21 10:30 AM',
    read: true,
  },
  {
    id: '2',
    projectId: '1',
    senderId: '2', // Jane Expert
    senderName: 'Jane Expert',
    content: 'Hello John, thanks for checking in. Could you provide any existing environmental surveys for the site if available? It would help with our preliminary assessment.',
    timestamp: '2025-04-21 11:45 AM',
    read: true,
  },
  {
    id: '3',
    projectId: '1',
    senderId: '1', // John Client
    senderName: 'John Client',
    content: 'I\'ll check with our environmental team and get back to you by tomorrow with any available documents.',
    timestamp: '2025-04-21 1:15 PM',
    read: true,
  },
  {
    id: '4',
    projectId: '3',
    senderId: '2', // Jane Expert
    senderName: 'Jane Expert',
    content: 'I\'ve completed the initial assessment for the hybrid system. The draft report is now available for your review in the Reports section.',
    timestamp: '2025-05-09 3:20 PM',
    read: false,
  },
  {
    id: '5',
    projectId: '3',
    senderId: '1', // John Client
    senderName: 'John Client',
    content: 'Thank you! I\'ll take a look at it right away and provide feedback.',
    timestamp: '2025-05-09 4:05 PM',
    read: true,
  },
];

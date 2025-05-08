import { Wind, Sun, FileText, Calendar, PieChart, MapPin, Search, Activity, Shield } from 'lucide-react';

export const primaryServices = [
  {
    id: 'wind',
    title: 'Wind Energy Consultancy',
    icon: Wind,
    description: 'Expert consultancy services using advanced tools like windPRO, WAsP, and CFD modeling for comprehensive wind energy assessments.',
    features: [
      'Wind resource assessment',
      'Site Prospecting & Layout Optimization',
      'Preliminary Evaluation (Mesoscale-Only)',
      'Wind Measurement Campaigns',
      'Energy Yield Assessments (EYAs)',
      'Environmental & Visual Impact Studies',
      'Post-Construction Performance Checks',
      'Second Opinion Reviews',
    ],
  },
];

export const services = [
  {
    id: 'prospecting',
    title: 'Site Prospecting & Layout Optimization',
    icon: MapPin,
    description: 'Identify optimal wind and solar project areas, develop optimized layouts, and consider local constraints including noise and shadow flicker.',
  },
  {
    id: 'preliminary',
    title: 'Preliminary Evaluation (Mesoscale-Only)',
    icon: Search,
    description: 'Rapid feasibility assessment using high-resolution mesoscale datasets to estimate energy yield, wake and other losses, and P50/P90 uncertainties without on-site measurements.',
  },
  {
    id: 'measurement',
    title: 'Wind Measurement Campaigns',
    icon: Activity,
    description: 'Plan and validate wind measurement setups, ensuring compliance with international standards (IEC, TR6, MEASNET).',
  },
  {
    id: 'eya',
    title: 'Energy Yield Assessments (EYAs)',
    icon: PieChart,
    description: 'Accurate forecasts based on on-site data (mast, LiDAR/Sodar), SCADA data, mesoscale modeling, and detailed uncertainty analysis (P50, P75, P90).',
  },
  {
    id: 'solar-yield',
    title: 'Solar Yield Assessments',
    icon: Sun,
    description: 'Detailed photovoltaic performance modeling using satellite or measured irradiance data, glare calculation, shading analysis, and uncertainty quantification (P50, P75, P90).',
  },
  {
    id: 'performance',
    title: 'Post-Construction Performance Checks',
    icon: Calendar,
    description: 'Analyze operational data (SCADA), categorize losses, quantify downtime, and forecast long-term energy production.',
  },
  {
    id: 'environmental',
    title: 'Environmental & Visual Impact Studies',
    icon: Shield,
    description: 'Conduct noise, shadow flicker, glare evaluations, and photomontages to assess project impacts.',
  },
  {
    id: 'review',
    title: 'Second Opinion Reviews',
    icon: FileText,
    description: 'Independent validation and analysis of third-party studies to ensure accuracy, reliability, and best-practice methodologies.',
  },
];


import React from 'react';
import ServicesHero from '@/components/services/ServicesHero';
import AdditionalServices from '@/components/services/AdditionalServices';

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white">
      <ServicesHero />
      <div className="w-full h-px bg-gray-100"></div>
      <AdditionalServices />
    </div>
  );
};

export default ServicesPage;

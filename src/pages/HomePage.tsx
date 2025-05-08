
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ProcessSection from '@/components/home/ProcessSection';
import PrimaryServices from '@/components/home/PrimaryServices';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <PrimaryServices />
      <div className="container mx-auto my-12">
        <div className="w-full h-px bg-gray-200"></div>
      </div>
      <AboutSection />
      <div className="container mx-auto my-12">
        <div className="w-full h-px bg-gray-200"></div>
      </div>
      <ProcessSection />
    </div>
  );
};

export default HomePage;

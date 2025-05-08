
import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import AboutContent from '@/components/about/AboutContent';
import ApproachSection from '@/components/about/ApproachSection';
import TeamSection from '@/components/about/TeamSection';
import CtaSection from '@/components/about/CtaSection';

const AboutPage: React.FC = () => {
  return (
    <>
      <AboutHero />
      <AboutContent />
      <ApproachSection />
      <TeamSection />
      <CtaSection />
    </>
  );
};

export default AboutPage;

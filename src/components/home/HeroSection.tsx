
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="container max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">
          Renewable Energy Expertise
        </h1>
        <div className="w-16 h-0.5 bg-black mx-auto mb-8"></div>
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-gray-700 mb-8">
            Your platform for connecting with renewable energy experts. 
          </p>
          <p>
            Whether you're evaluating land, optimizing layouts, planning a measurement campaign, or just need a second opinion — 
            we're here to help.
          </p>
          <p className="text-xl font-serif mb-16">
            Simple. Fast. Done.
          </p>
          <div className="inline-block border-t border-b border-gray-300 py-4 px-6">
            <Button 
              className="bg-transparent hover:bg-gray-100 text-gray-900 border border-gray-400 rounded-none px-8 py-6 font-serif"
              asChild
            >
              <Link to="/service-request">
                Request a Study
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServicesHero = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-8">Our Services</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            We deliver specialized consultancy services to support wind and solar energy projects, 
            covering everything from site selection to detailed post-construction analyses.
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

export default ServicesHero;

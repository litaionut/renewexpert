
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif mb-6">Ready to Work With Us?</h2>
          <p className="mb-8 text-muted-foreground font-serif">
            Start your renewable energy project with expert guidance and support from RenewExpert.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" className="rounded-none border-black hover:bg-black hover:text-white transition-colors" asChild>
              <Link to="/service-request">Request Service</Link>
            </Button>
            <Button variant="outline" className="rounded-none border-black hover:bg-black hover:text-white transition-colors" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

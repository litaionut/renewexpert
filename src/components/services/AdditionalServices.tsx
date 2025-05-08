
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { services } from '@/data/services-data';

const AdditionalServices = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container max-w-3xl">
        <div className="space-y-6">
          {services.map(service => (
            <div
              key={service.id}
              className="group p-8 bg-white border border-gray-100 hover:border-gray-200 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <service.icon className="h-5 w-5 text-gray-600" />
                </div>
                <h3 className="text-xl font-serif">{service.title}</h3>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-8">
            Not sure what you need or need something not on the list? Reach out — we're flexible.
          </p>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;


import React from 'react';
import { ArrowRight, ListCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { primaryServices } from '@/data/services-data';

const PrimaryServices = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif mb-16 text-center">Our Services</h2>
        <div className="max-w-2xl mx-auto">
          {primaryServices.map(service => (
            <div key={service.id} className="flex flex-col items-center">
              <p className="text-gray-600 mb-8 text-center">
                {service.description}
              </p>

              <div className="max-w-lg mx-auto mb-8">
                <ul className="space-y-4">
                  {service.features.map((feature, index) => (
                    <li 
                      key={index} 
                      className="text-gray-700 flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gradient-to-r from-gray-50 to-transparent group"
                    >
                      <span className="block p-1.5 rounded-full bg-gray-100 text-gray-700 group-hover:bg-gray-2000 transition-colors">
                        <ListCheck className="h-4 w-4" />
                      </span>
                      <span className="text-sm leading-tight pt-1">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="ghost" asChild className="hover:translate-x-1 transition-transform">
                <Link to="/services">
                  More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrimaryServices;

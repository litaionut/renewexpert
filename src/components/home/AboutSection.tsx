
import React from 'react';
import { Award, Star, Clock, Shield, FileCheck, Layout } from 'lucide-react';

const benefits = [
  { text: 'Connect with experts', icon: Star },
  { text: 'Fast turnaround times', icon: Clock },
  { text: 'Fair and transparent pricing', icon: Award },
  { text: 'Client login and dashboard', icon: Shield },
  { text: 'Accurate and professional reports', icon: FileCheck },
  { text: 'User friendly platform design', icon: Layout },
];

const AboutSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif mb-6">A Practical Approach</h2>
          <div className="w-16 h-0.5 bg-black mx-auto mb-8"></div>
          <div className="prose mx-auto">
            <p className="text-gray-600 max-w-2xl mx-auto">
              RenewExpert was founded by engineers and consultants who believe technical studies 
              should be accessible, clear, and fast — not buried in overhead costs or long lead times.            
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-serif mb-12">Our Strengths</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={index}
                  className="group p-4 bg-white border border-gray-100 rounded-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors duration-300">
                      <IconComponent 
                        className="w-6 h-6 text-gray-700 stroke-[1.25] opacity-80" 
                        strokeWidth={1.25} 
                      />
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">{benefit.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

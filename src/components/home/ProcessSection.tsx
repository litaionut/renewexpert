
import React from 'react';
import { cn } from "@/lib/utils";

const steps = [
  {
    title: 'Request a Study',
    description: 'Complete our detailed service request form with your project requirements.',
  },
  {
    title: 'Sign the Quote',
    description: 'Get a transparent quote with project details breakdown and project timeline.',
  },
  {
    title: 'Wait for Approval',
    description: "We approve your quote online, and we'll kick off the work immediately.",
  },
  {
    title: 'Track Progress',
    description: 'Monitor your project\'s progress through our real-time dashboard.',
  },
  {
    title: 'Get Results',
    description: 'Access your final reports and documentation securely through our platform.',
  },
];

const ProcessSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif mb-4 tracking-wider">Working With Us</h2>
          <div className="w-16 h-0.5 bg-black mx-auto mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We respond fast — most quotes delivered within 48 hours. You'll receive a clear, 
            structured report accessible via our secure platform.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          <div className="border-t border-gray-200 pt-8">
            {steps.map((step, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-10 h-10 border border-gray-300 flex items-center justify-center">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
                
                {index !== steps.length - 1 && (
                  <div className="ml-5 mt-2 mb-2 w-px h-6 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

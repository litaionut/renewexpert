
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const ApproachSection = () => {
  const approaches = [
    {
      title: "Simple",
      description: "We've streamlined the entire process from request to delivery, eliminating unnecessary complexity and bureaucracy.",
      points: ["Clear communication", "Straightforward pricing", "Intuitive platform"]
    },
    {
      title: "Fast",
      description: "We respond quickly to your needs, with most quotes delivered within 48 hours and efficient project execution.",
      points: ["Rapid response times", "Streamlined workflows", "Efficient delivery"]
    },
    {
      title: "Done",
      description: "We deliver comprehensive, high-quality results that directly address your specific requirements.",
      points: ["Thorough analysis", "Actionable insights", "Complete documentation"]
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-serif mb-4">Our Approach</h2>
          <p className="text-muted-foreground font-serif">
            We believe in simplicity, transparency, and delivering exceptional value through focused expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approaches.map((approach, index) => (
            <ApproachCard key={index} {...approach} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ApproachCard = ({ title, description, points }: { title: string; description: string; points: string[] }) => {
  return (
    <Card className="p-8 bg-white border border-gray-100">
      <h3 className="text-xl font-serif mb-4">{title}</h3>
      <p className="text-muted-foreground font-serif mb-6">{description}</p>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <span className="font-serif text-muted-foreground">{point}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ApproachSection;

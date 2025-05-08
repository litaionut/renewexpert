
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wind, Sun, Globe, FileText } from 'lucide-react';

const AboutContent = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-serif">Who We Are</h2>
            <div className="space-y-6 text-muted-foreground font-serif">
              <p>
                We're a small, fully remote team of freelance specialists. Because we have no offices to lease and no fixed payroll to feed, every euro you spend goes directly into expert time and industry-leading software—windPRO, WAsP, advanced CFD tools, and more as our toolkit expands.
              </p>
              <p>
                From prospecting and layout design to post-construction performance checks, we deliver end-to-end consultancy for wind and solar projects—tailored precisely to your site and your goals.
              </p>
              <p>
                Our new platform is the next step — offering developers, investors, and engineers a smarter way to access reliable wind and solar assessments without the friction of slow bureaucracy.
              </p>
            </div>
            <div>
              <Button variant="outline" className="rounded-none border-black hover:bg-black hover:text-white transition-colors" asChild>
                <Link to="/service-request">Work With Us</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <ServiceCard
              icon={<Wind />}
              title="Wind Energy"
              description="Expert analysis and consultancy for all stages of wind energy projects."
            />
            <ServiceCard
              icon={<Sun />}
              title="Solar Energy"
              description="Comprehensive solar energy consulting from site selection to optimization."
            />
            <ServiceCard
              icon={<Globe />}
              title="Global Reach"
              description="Fully remote team serving clients across Europe and beyond."
            />
            <ServiceCard
              icon={<FileText />}
              title="Expert Reports"
              description="Clear, professional documentation to support your decision-making."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <Card className="p-8 bg-white border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-6">
        <div className="h-6 w-6 text-gray-600">{icon}</div>
      </div>
      <h3 className="text-xl font-serif mb-3">{title}</h3>
      <p className="text-muted-foreground font-serif">{description}</p>
    </Card>
  );
};

export default AboutContent;


import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';

const TeamSection = () => {
  const team = [
    {
      name: "Anna Johnson",
      role: "Wind Energy Specialist",
      bio: "15+ years of experience in wind resource assessment and energy yield analysis.",
    },
    {
      name: "Marcus Chen",
      role: "Solar Energy Expert",
      bio: "Specializes in solar project design, optimization and performance analysis.",
    },
    {
      name: "Elena Rodriguez",
      role: "Environmental Specialist",
      bio: "Expert in environmental impact assessments for renewable energy projects.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-6 mx-auto">
            <Users className="h-6 w-6 text-gray-600" />
          </div>
          <h2 className="text-3xl font-serif mb-4">Our Experts</h2>
          <p className="text-muted-foreground font-serif">
            Meet some of the renewable energy specialists who make RenewExpert possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/join-network" className="font-serif text-gray-600 hover:text-gray-900 transition-colors">
            Interested in joining our network? Learn more →
          </Link>
        </div>
      </div>
    </section>
  );
};

const TeamMemberCard = ({ name, role, bio }: { name: string; role: string; bio: string }) => {
  return (
    <Card className="p-8 bg-white border border-gray-100">
      <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 mx-auto">
        <span className="text-xl font-serif text-gray-600">{name.charAt(0)}</span>
      </div>
      <h3 className="text-xl font-serif text-center mb-2">{name}</h3>
      <p className="text-gray-600 text-center text-sm mb-4 font-serif">{role}</p>
      <p className="text-muted-foreground text-center font-serif">{bio}</p>
    </Card>
  );
};

export default TeamSection;

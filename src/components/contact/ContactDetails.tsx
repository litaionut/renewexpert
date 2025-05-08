
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Clock, Users } from 'lucide-react';

const ContactDetails = () => {
  return (
    <>
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="font-serif">Contact Details</CardTitle>
          <CardDescription className="text-gray-600">Reach out to us directly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="font-serif">Email</h4>
              <p className="text-sm text-gray-600">hello@renewexpert.com</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="font-serif">Location</h4>
              <p className="text-sm text-gray-600">Fully remote across Europe</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="font-serif">Availability</h4>
              <p className="text-sm text-gray-600">Flexible hours • Rapid response</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-8 border-gray-200">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center mb-2">
            <Users className="h-5 w-5 text-gray-600 mr-2" />
            <CardTitle className="font-serif">Join Our Network</CardTitle>
          </div>
          <CardDescription className="text-gray-600">For engineers and consultants</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-4">
            Are you a freelancer, engineer, or consultant in wind or solar energy? We're always looking for curious minds and bold thinkers. Let's team up and power the future—together!
          </p>
          <p className="font-serif">Email us at:</p>
          <p className="text-gray-900">partners@renewexpert.com</p>
        </CardContent>
      </Card>
    </>
  );
};

export default ContactDetails;

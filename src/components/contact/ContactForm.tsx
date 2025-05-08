
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    submitted: false,
    submitting: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, submitting: true });
    
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormState({
      ...formState,
      submitted: true,
      submitting: false
    });
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="font-serif">Send Us a Message</CardTitle>
        <CardDescription className="text-gray-600">We'll get back to you as soon as possible</CardDescription>
      </CardHeader>
      <CardContent>
        {formState.submitted ? (
          <div className="text-center py-8">
            <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-serif mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for reaching out. We'll respond to your message shortly.
            </p>
            <Button 
              onClick={() => setFormState({ ...formState, submitted: false })}
              variant="outline"
              className="border-gray-400 rounded-none font-serif"
            >
              Send Another Message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-serif">Name</Label>
                <Input 
                  id="name" 
                  value={formState.name} 
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="border-gray-200 rounded-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-serif">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={formState.email} 
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                  className="border-gray-200 rounded-none"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject" className="font-serif">Subject</Label>
              <Input 
                id="subject" 
                value={formState.subject} 
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                placeholder="How can we help you?"
                required
                className="border-gray-200 rounded-none"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="font-serif">Message</Label>
              <Textarea 
                id="message" 
                value={formState.message} 
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Please provide details about your inquiry..."
                rows={5}
                required
                className="border-gray-200 rounded-none"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-transparent hover:bg-gray-100 text-gray-900 border border-gray-400 rounded-none px-8 py-6 font-serif"
              disabled={formState.submitting}
            >
              {formState.submitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactForm;

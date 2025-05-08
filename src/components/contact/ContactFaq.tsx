
import React from 'react';
import { Card } from '@/components/ui/card';

const ContactFaq = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-serif mb-4">Frequently Asked Questions</h2>
          <div className="w-16 h-0.5 bg-black mx-auto mb-6"></div>
          <p className="text-gray-600">
            Common questions about our services and approach
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 border-gray-200">
            <h3 className="font-serif mb-2">How quickly can I get a quote?</h3>
            <p className="text-gray-600">
              Most quotes are delivered within 48 hours after submitting your service request through our platform.
            </p>
          </Card>
          
          <Card className="p-6 border-gray-200">
            <h3 className="font-serif mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">
              We accept all major credit cards and bank transfers. Payments are securely processed through our platform.
            </p>
          </Card>
          
          <Card className="p-6 border-gray-200">
            <h3 className="font-serif mb-2">How do I access my completed reports?</h3>
            <p className="text-gray-600">
              All reports and documentation are delivered through our secure platform. You'll receive a notification when they're ready to download.
            </p>
          </Card>
          
          <Card className="p-6 border-gray-200">
            <h3 className="font-serif mb-2">Can I request revisions to my report?</h3>
            <p className="text-gray-600">
              Yes, we offer revision options for all our services. Details are provided in your quote and project agreement.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactFaq;

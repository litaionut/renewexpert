
import React from 'react';
import ContactHero from '@/components/contact/ContactHero';
import ContactDetails from '@/components/contact/ContactDetails';
import ContactForm from '@/components/contact/ContactForm';
import ContactFaq from '@/components/contact/ContactFaq';

const ContactPage: React.FC = () => {
  return (
    <>
      <ContactHero />
      
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <ContactDetails />
            </div>
            <div className="md:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <ContactFaq />
    </>
  );
};

export default ContactPage;

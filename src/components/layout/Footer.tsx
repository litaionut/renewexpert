
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/logo/Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col space-y-4">
              <Logo variant="footer" />
              <p className="text-sm text-white/80 font-serif">
                Simple. Fast. Done.
              </p>
              <p className="text-sm text-white/80">
                We don't pretend to be the biggest. Just fast, reliable, and fair — so you can move forward with confidence.
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif mb-6 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/services#wind" className="text-white/80 hover:text-white transition-colors">
                  Wind Energy
                </Link>
              </li>
              <li>
                <Link to="/services#solar" className="text-white/80 hover:text-white transition-colors">
                  Solar Energy
                </Link>
              </li>
              <li>
                <Link to="/services#hybrid" className="text-white/80 hover:text-white transition-colors">
                  Hybrid Systems
                </Link>
              </li>
              <li>
                <Link to="/services#consultancy" className="text-white/80 hover:text-white transition-colors">
                  Consultancy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/join-network" className="text-white/80 hover:text-white transition-colors">
                  Join Our Network
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/privacy" className="text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/80 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/gdpr" className="text-white/80 hover:text-white transition-colors">
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-white/60 font-serif">
              © {currentYear} RenewExpert. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="#" className="text-white/60 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
              <Link to="#" className="text-white/60 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

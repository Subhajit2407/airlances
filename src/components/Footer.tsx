
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/about#careers' },
        { label: 'Press', href: '/about#press' },
        { label: 'Blog', href: '/about#blog' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/contact' },
        { label: 'Safety', href: '/about#safety' },
        { label: 'Cancellation options', href: '/contact#cancellation' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/about#privacy' },
        { label: 'Terms', href: '/about#terms' },
        { label: 'Sitemap', href: '/sitemap' },
      ],
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="font-playfair font-semibold text-xl inline-block mb-4">
              <span className="text-accent">Airlace</span>
            </Link>
            <p className="font-poppins text-muted-foreground max-w-md">
              Find unique accommodations across India's diverse landscapes. From mountain retreats to beach villas, we have everything you need for your perfect stay.
            </p>
            
            <div className="mt-6 flex items-center space-x-4">
              <Link 
                to="/host" 
                className="font-poppins inline-flex items-center px-4 py-2 rounded-full bg-secondary text-sm font-medium hover:bg-gray-100 transition-all focus-ring"
              >
                Become a host
                <ArrowUpRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-playfair text-sm font-semibold">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="font-poppins text-muted-foreground hover:text-primary text-sm transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="font-poppins text-sm text-muted-foreground">
            &copy; {currentYear} Airlace India. All rights reserved.
          </p>
          
          <div className="flex items-center mt-4 md:mt-0">
            <Link to="/about#privacy" className="font-poppins text-sm text-muted-foreground hover:text-primary mx-3 transition-all">
              Privacy
            </Link>
            <Link to="/about#terms" className="font-poppins text-sm text-muted-foreground hover:text-primary mx-3 transition-all">
              Terms
            </Link>
            <Link to="/sitemap" className="font-poppins text-sm text-muted-foreground hover:text-primary mx-3 transition-all">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

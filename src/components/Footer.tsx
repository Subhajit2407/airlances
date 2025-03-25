
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Safety', href: '#' },
        { label: 'Cancellation options', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Sitemap', href: '#' },
      ],
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="/" className="font-semibold text-xl inline-block mb-4">
              <span className="text-accent">air</span>place
            </a>
            <p className="text-muted-foreground max-w-md">
              Find unique accommodations around the world. From cozy apartments to luxury villas, we have everything you need for your perfect stay.
            </p>
            
            <div className="mt-6 flex items-center space-x-4">
              <a 
                href="#" 
                className="inline-flex items-center px-4 py-2 rounded-full bg-secondary text-sm font-medium hover:bg-gray-100 transition-all focus-ring"
              >
                Become a host
                <ArrowUpRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
          
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary text-sm transition-all"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Airplace Inc. All rights reserved.
          </p>
          
          <div className="flex items-center mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary mx-3 transition-all">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary mx-3 transition-all">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary mx-3 transition-all">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

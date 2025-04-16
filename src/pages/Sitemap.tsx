
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Sitemap = () => {
  const sitemapSections = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", path: "/" },
        { name: "Places", path: "/places" },
        { name: "Experiences", path: "/experiences" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
      ]
    },
    {
      title: "User Account",
      links: [
        { name: "Profile", path: "/profile" },
        { name: "My Bookings", path: "/profile?tab=bookings" },
        { name: "Favorites", path: "/profile?tab=favorites" },
        { name: "Account Settings", path: "/profile?tab=settings" },
      ]
    },
    {
      title: "Shopping",
      links: [
        { name: "Cart", path: "/cart" },
        { name: "Checkout", path: "/checkout" },
      ]
    },
    {
      title: "Popular Destinations",
      links: [
        { name: "Himalayan Retreats", path: "/places?category=himalayan" },
        { name: "Kerala Backwaters", path: "/places?category=backwaters" },
        { name: "Goa Beaches", path: "/places?category=beaches" },
        { name: "Rajasthan Palaces", path: "/places?category=heritage" },
        { name: "Wildlife Sanctuaries", path: "/places?category=wildlife" },
        { name: "Northeast Valleys", path: "/places?category=northeast" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", path: "/about#terms" },
        { name: "Privacy Policy", path: "/about#privacy" },
        { name: "Cancellation Policy", path: "/contact#cancellation" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/contact" },
        { name: "FAQs", path: "/about#faq" },
        { name: "Contact Support", path: "/contact" },
      ]
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-8 animate-fade-up">Sitemap</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up delay-100">
            {sitemapSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h2 className="text-xl font-playfair font-medium border-b border-gray-200 pb-2">{section.title}</h2>
                
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.path} 
                        className="flex items-center text-muted-foreground hover:text-accent transition-colors group"
                      >
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sitemap;

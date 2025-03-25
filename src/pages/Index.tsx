
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { properties, newProperties } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Properties */}
      <FeaturedProperties />
      
      {/* New Listings */}
      <section className="py-16 px-6 bg-gradient-to-b from-purple-50 to-blue-50 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-purple-100/40 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-blue-100/30 rounded-full blur-3xl -z-0"></div>
        
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-medium mb-2 text-gradient-primary">New this week</h2>
          <p className="text-muted-foreground mb-8">Recently added properties for your next adventure</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} className={`hover-glow ${
                index % 4 === 0 ? "card-blue" : 
                index % 4 === 1 ? "card-purple" : 
                index % 4 === 2 ? "card-teal" : 
                "card-orange"
              }`} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/places" className="inline-flex items-center text-accent hover:text-accent/80 font-medium">
              View all new properties <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Promotion Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-accent to-blue-600 rounded-2xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M40.9,-49.5C55.1,-39.5,70.3,-28.3,75.9,-13.2C81.4,1.9,77.4,21,67.3,33.4C57.3,45.8,41.3,51.6,25.9,57.1C10.6,62.6,-4.2,67.9,-17.4,64.5C-30.7,61.1,-42.6,49.1,-52.8,35.1C-63,21.1,-71.7,5.1,-71.2,-11C-70.7,-27.1,-61.1,-43.4,-47.6,-53.9C-34.1,-64.4,-17,-69.2,-1.8,-67C13.5,-64.9,26.9,-59.5,40.9,-49.5Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            <div className="max-w-lg relative z-10">
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-4">
                Become a host
              </h3>
              <p className="text-white/90 mb-6">
                Earn extra income and unlock new opportunities by sharing your space.
              </p>
              <button className="bg-white text-accent hover:bg-blue-50 px-6 py-3 rounded-full font-medium transition-all focus-ring">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* All Properties */}
      <section className="py-16 px-6 bg-gradient-soft">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-medium mb-2 text-gradient-purple">Explore all places</h2>
          <p className="text-muted-foreground mb-8">Find the perfect place for your next stay</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.slice(0, 8).map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} className={`hover-glow ${
                index % 4 === 0 ? "card-blue" : 
                index % 4 === 1 ? "card-purple" : 
                index % 4 === 2 ? "card-teal" : 
                "card-orange"
              }`} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/places" className="inline-flex items-center px-6 py-3 rounded-full bg-accent text-white hover:bg-accent/90 transition-all font-medium">
              View all properties <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

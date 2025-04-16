
import React from 'react';
import SearchBar from './SearchBar';
import { ArrowRight, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-16 md:pt-24 pb-20 md:pb-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-100 -z-10"></div>
      
      {/* Decorative elements with Indian-inspired colors */}
      <div className="absolute top-1/3 left-10 w-40 h-40 bg-orange-200/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-60 h-60 bg-pink-200/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute top-10 right-1/4 w-20 h-20 bg-green-400/20 rounded-full blur-xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-8 w-8 mr-2 text-accent animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold">Airlaces</h1>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold leading-tight md:leading-tight lg:leading-tight mb-4 md:mb-6 animate-fade-up bg-gradient-to-r from-amber-600 to-rose-500 bg-clip-text text-transparent">
            Discover the World's Travel Treasures
          </h1>
          <p className="font-poppins text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 animate-fade-up delay-100">
            Experience the beauty of diverse landscapes, from the Himalayas in the North to beach resorts of Bali and beyond.
          </p>
          
          <SearchBar className="delay-200" />
          
          <div className="mt-8 animate-fade-up delay-300">
            <Link to="/places" className="font-poppins inline-flex items-center text-accent hover:text-accent/80 font-medium hover-lift">
              Explore Featured Destinations <ArrowRight className="ml-2 h-4 w-4 animate-float" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Enhanced floating shapes with brand-inspired colors */}
      <div className="absolute left-10 bottom-10 w-12 h-12 bg-orange-400/30 rounded-full animate-float"></div>
      <div className="absolute right-1/3 bottom-20 w-8 h-8 bg-green-400/30 rounded-full animate-float delay-300"></div>
      <div className="absolute right-10 top-32 w-16 h-16 bg-blue-400/20 rounded-full animate-float delay-500"></div>
    </section>
  );
};

export default Hero;

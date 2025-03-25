
import React from 'react';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <section className="relative pt-16 md:pt-24 pb-20 md:pb-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-40 h-40 bg-blue-200/50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-10 w-60 h-60 bg-purple-200/50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-10 right-1/4 w-20 h-20 bg-accent/20 rounded-full blur-xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight md:leading-tight lg:leading-tight mb-4 md:mb-6 animate-fade-up bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Find your perfect place to stay
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 animate-fade-up delay-100">
            Discover unique accommodations with all the comforts of home, all around the world.
          </p>
          
          <SearchBar className="delay-200" />
        </div>
      </div>
      
      {/* Floating shapes */}
      <div className="absolute left-10 bottom-10 w-12 h-12 bg-accent/30 rounded-full animate-float"></div>
      <div className="absolute right-1/3 bottom-20 w-8 h-8 bg-blue-400/30 rounded-full animate-float delay-300"></div>
      <div className="absolute right-10 top-32 w-16 h-16 bg-purple-400/20 rounded-full animate-float delay-500"></div>
    </section>
  );
};

export default Hero;

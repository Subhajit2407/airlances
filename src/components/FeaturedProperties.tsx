
import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { properties } from '@/lib/data';
import PropertyCard from './PropertyCard';

const FeaturedProperties = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-purple-50/50 -z-10"></div>
      <div className="absolute top-1/4 right-1/3 w-32 h-32 rounded-full bg-blue-100/30 blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Featured places to stay</h2>
            <p className="text-muted-foreground mt-1">Handpicked properties for your next getaway</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={scrollLeft}
              className="p-2 rounded-full border border-gray-200 hover:bg-accent hover:text-white hover:border-accent transition-all focus-ring"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-2 rounded-full border border-gray-200 hover:bg-accent hover:text-white hover:border-accent transition-all focus-ring"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-none"
        >
          {properties.filter(p => p.isFeatured).map((property, index) => (
            <div key={property.id} className="min-w-[300px] md:min-w-[340px]">
              <PropertyCard property={property} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

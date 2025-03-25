
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
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-medium">Featured places to stay</h2>
            <p className="text-muted-foreground mt-1">Handpicked properties for your next getaway</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={scrollLeft}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-all focus-ring"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-all focus-ring"
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

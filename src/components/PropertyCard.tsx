
import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Property } from '@/lib/data';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  className?: string;
  index?: number; // Used for staggered animations
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, className, index = 0 }) => {
  const animationDelay = `delay-${(index % 5) * 100}`;

  return (
    <div 
      className={cn(
        "group rounded-xl overflow-hidden transition-all hover:shadow-md animate-fade-up",
        animationDelay,
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all focus-ring">
          <Heart className="w-4 h-4 text-gray-700" />
        </button>
        
        {/* New Tag */}
        {property.isNew && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium">
            New
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="pt-4 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-base text-primary truncate">{property.title}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-accent fill-accent mr-1" />
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground truncate">{property.location}</p>
        
        <div className="flex items-center justify-between pt-1">
          <p className="text-sm">
            <span className="font-semibold">${property.price}</span>
            <span className="text-muted-foreground"> / night</span>
          </p>
          
          <div className="text-xs text-muted-foreground">
            {property.beds} {property.beds === 1 ? 'bed' : 'beds'} &middot; {property.baths} {property.baths === 1 ? 'bath' : 'baths'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

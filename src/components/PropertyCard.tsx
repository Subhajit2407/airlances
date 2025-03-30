
import React from 'react';
import { Star, Heart, MapPin } from 'lucide-react';
import { Property } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
  className?: string;
  index?: number; // Used for staggered animations
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, className, index = 0 }) => {
  const animationDelay = `delay-${(index % 5) * 100}`;
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link 
      to={`/property/${property.id}`}
      className={cn(
        "group rounded-xl overflow-hidden transition-all hover-glow hover-lift animate-fade-up",
        "bg-white relative",
        animationDelay,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with enhanced hover effect */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className={cn(
            "object-cover w-full h-full transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
          loading="lazy"
        />
        
        {/* Favorite Button with animation */}
        <button 
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all focus-ring z-10",
            "hover:bg-white hover:shadow-md transform transition-transform duration-300",
            isHovered ? "scale-110" : "scale-100"
          )}
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation when clicking the heart
            console.log('Added to favorites:', property.title);
          }}
          aria-label="Add to favorites"
        >
          <Heart className="w-4 h-4 text-gray-700 hover:text-rose-500 hover:fill-rose-500" />
        </button>
        
        {/* New Tag with pulse animation */}
        {property.isNew && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium animate-pulse">
            New
          </div>
        )}
        
        {/* Location tag with map pin */}
        <div className={cn(
          "absolute bottom-3 left-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs flex items-center opacity-0 transform translate-y-2 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : ""
        )}>
          <MapPin className="w-3 h-3 mr-1" /> {property.location.split(',')[0]}
        </div>
      </div>
      
      {/* Content */}
      <div className="pt-4 space-y-1 p-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-base text-primary truncate group-hover:text-accent transition-colors">{property.title}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground truncate">{property.location}</p>
        
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm">
            <span className="font-semibold text-accent">₹{Math.round(property.price * 83)}</span>
            <span className="text-muted-foreground"> / night</span>
          </p>
          
          <div className="text-xs text-muted-foreground">
            {property.beds} {property.beds === 1 ? 'bed' : 'beds'} &middot; {property.baths} {property.baths === 1 ? 'bath' : 'baths'}
          </div>
        </div>
        
        {/* Amenity tags appearing on hover */}
        <div className={cn(
          "flex flex-wrap gap-1 mt-2 transition-opacity duration-300 opacity-0 h-0 overflow-hidden",
          isHovered ? "opacity-100 h-auto" : ""
        )}>
          {property.amenities.slice(0, 3).map((amenity, i) => (
            <span 
              key={i} 
              className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && 
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
              +{property.amenities.length - 3}
            </span>
          }
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;

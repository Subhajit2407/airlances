
import React, { useState } from 'react';
import { Star, Heart, MapPin, Calendar, User, ShoppingBag } from 'lucide-react';
import { Property } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface PropertyCardProps {
  property: Property;
  className?: string;
  index?: number; // Used for staggered animations
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, className, index = 0 }) => {
  const animationDelay = `delay-${(index % 5) * 100}`;
  const [isHovered, setIsHovered] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookingOpen(true);
  };

  const calculatePrice = () => {
    if (!checkIn || !checkOut) return property.price;
    
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    return property.price * nights;
  };

  const handleAddToCart = () => {
    const calculatedPrice = calculatePrice();
    
    addToCart({
      id: property.id,
      property,
      checkIn,
      checkOut,
      guests,
      price: calculatedPrice
    });
    
    toast("Added to cart", {
      description: `${property.title} has been added to your cart.`
    });
    
    setBookingOpen(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    navigate(`/property/${property.id}`);
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className={cn(
          "group rounded-xl overflow-hidden transition-all hover-glow hover-lift animate-fade-up cursor-pointer",
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
              e.stopPropagation();
              toast("Added to favorites", {
                description: `${property.title} has been added to your favorites.`
              });
            }}
            aria-label="Add to favorites"
          >
            <Heart className="w-4 h-4 text-gray-700 hover:text-rose-500 hover:fill-rose-500" />
          </button>
          
          {/* Book Now Button */}
          <button
            onClick={handleBookNow}
            className={cn(
              "absolute bottom-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium",
              "opacity-0 transform translate-y-2 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : ""
            )}
          >
            Book Now
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
            <h3 className="font-playfair font-medium text-base text-primary truncate group-hover:text-accent transition-colors">{property.title}</h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
              <span className="text-sm font-medium">{property.rating}</span>
            </div>
          </div>
          
          <p className="font-poppins text-sm text-muted-foreground truncate">{property.location}</p>
          
          <div className="flex items-center justify-between pt-2">
            <p className="font-poppins text-sm">
              <span className="font-semibold text-accent">₹{property.price}</span>
              <span className="text-muted-foreground"> / night</span>
            </p>
            
            <div className="font-poppins text-xs text-muted-foreground">
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
                className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full font-poppins"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && 
              <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-poppins">
                +{property.amenities.length - 3}
              </span>
            }
          </div>
        </div>
      </div>
      
      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book {property.title}</DialogTitle>
            <DialogDescription>
              {property.location}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="check-in">Check in</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="check-in" 
                    type="date" 
                    className="pl-10" 
                    min={today}
                    value={checkIn} 
                    onChange={(e) => setCheckIn(e.target.value)} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="check-out">Check out</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="check-out" 
                    type="date" 
                    className="pl-10" 
                    min={checkIn || tomorrow}
                    value={checkOut} 
                    onChange={(e) => setCheckOut(e.target.value)} 
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="guests" 
                  type="number" 
                  min={1} 
                  max={10} 
                  className="pl-10" 
                  value={guests} 
                  onChange={(e) => setGuests(parseInt(e.target.value))} 
                />
              </div>
            </div>
            <div className="bg-secondary/40 p-4 rounded-lg">
              <div className="flex justify-between">
                <span>₹{property.price} × {checkIn && checkOut ? 
                  Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))) : 1} night(s)</span>
                <span>₹{calculatePrice()}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between font-medium">
                <span>Total</span>
                <span>₹{calculatePrice()}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setBookingOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddToCart}
              disabled={!checkIn || !checkOut || guests < 1}
              className="gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyCard;

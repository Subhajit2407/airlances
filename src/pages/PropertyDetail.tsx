import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, Star, MapPin, Calendar, Users, Wifi, Utensils, Mountain, Plus, Check } from 'lucide-react';
import { properties } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

  useEffect(() => {
    setLoading(true);
    const foundProperty = properties.find(p => p.id === id);
    
    if (foundProperty) {
      setProperty(foundProperty);
      document.title = `${foundProperty.title} - Airlace`;
    } else {
      toast({
        title: "Property not found",
        description: "We couldn't find the property you're looking for.",
        variant: "destructive"
      });
      navigate('/places');
    }
    
    setLoading(false);
  }, [id, navigate, toast]);

  const calculatePrice = () => {
    if (!checkIn || !checkOut || !property) return property?.price || 0;
    
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    return property.price * nights;
  };

  const handleAddToCart = () => {
    if (!property) return;
    
    const calculatedPrice = calculatePrice();
    
    addToCart({
      id: property.id,
      property,
      checkIn,
      checkOut,
      guests,
      price: calculatedPrice
    });
    
    toast({
      title: "Added to cart",
      description: `${property.title} has been added to your cart.`,
    });

    navigate('/cart');
  };

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      toast({
        title: "Select dates",
        description: "Please select check-in and check-out dates.",
        variant: "destructive"
      });
      return;
    }
    
    handleAddToCart();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <p className="mb-8">We couldn't find the property you're looking for.</p>
            <Button onClick={() => navigate('/places')}>Browse Properties</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-playfair font-semibold">{property.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                <span className="font-medium">{property.rating}</span>
                <span className="text-muted-foreground mx-1">•</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                <span>{property.location}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 rounded-xl overflow-hidden aspect-video md:aspect-auto">
            <div className="relative h-full">
              <img 
                src={property.imageUrl} 
                alt={property.title}
                className="w-full h-full object-cover rounded-xl" 
              />
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all hover:bg-white"
              >
                <Heart className={cn(
                  "w-5 h-5", 
                  isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-700"
                )} />
              </button>
            </div>
            <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl overflow-hidden">
                  <img 
                    src={property.imageUrl} 
                    alt={`${property.title} view ${i+1}`}
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border-b pb-6 mb-6">
                <h2 className="text-xl md:text-2xl font-medium mb-4">
                  {property.beds} bedroom accommodation in {property.location.split(',')[0]}
                </h2>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>{property.beds} {property.beds === 1 ? 'bed' : 'beds'}</div>
                  <div>{property.baths} {property.baths === 1 ? 'bath' : 'baths'}</div>
                  <div>Accommodates {property.beds * 2} guests</div>
                </div>
              </div>
              
              <div className="border-b pb-6 mb-6">
                <h3 className="text-xl font-medium mb-4">About this place</h3>
                <p className="text-muted-foreground mb-4">
                  Experience the beauty of {property.location} in this charming {property.beds}-bedroom accommodation. 
                  Nestled in a serene environment, this property offers a perfect blend of comfort and authenticity. 
                  Wake up to panoramic views and enjoy the peaceful surroundings.
                </p>
                <p className="text-muted-foreground">
                  The space features modern amenities while preserving the local architectural charm. 
                  It's an ideal base for exploring nearby attractions and immersing yourself in the local culture.
                </p>
              </div>
              
              <div className="border-b pb-6 mb-6">
                <h3 className="text-xl font-medium mb-4">What this place offers</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity: string, i: number) => (
                    <div key={i} className="flex items-center">
                      {amenity === 'Wifi' && <Wifi className="w-5 h-5 mr-3 text-accent" />}
                      {amenity === 'Kitchen' && <Utensils className="w-5 h-5 mr-3 text-accent" />}
                      {amenity === 'Mountain View' && <Mountain className="w-5 h-5 mr-3 text-accent" />}
                      {!['Wifi', 'Kitchen', 'Mountain View'].includes(amenity) && 
                        <Check className="w-5 h-5 mr-3 text-accent" />
                      }
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Location</h3>
                <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-accent opacity-70" />
                  <span className="text-muted-foreground ml-2">Map view of {property.location}</span>
                </div>
                <p className="text-muted-foreground">
                  Located in {property.location}, this property offers easy access to local attractions,
                  markets, and natural landmarks. The area is known for its scenic beauty and cultural heritage.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 border rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-semibold">₹{property.price}</span>
                    <span className="text-muted-foreground"> / night</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                    <span className="font-medium">{property.rating}</span>
                  </div>
                </div>
                
                <div className="border rounded-xl overflow-hidden mb-4">
                  <div className="grid grid-cols-2 border-b">
                    <div className="p-4 border-r">
                      <Label htmlFor="check-in" className="text-xs font-medium">CHECK-IN</Label>
                      <Input 
                        id="check-in" 
                        type="date" 
                        className="border-0 p-0 h-auto text-base focus-visible:ring-0 focus-visible:ring-offset-0" 
                        min={today}
                        value={checkIn} 
                        onChange={(e) => setCheckIn(e.target.value)} 
                      />
                    </div>
                    <div className="p-4">
                      <Label htmlFor="check-out" className="text-xs font-medium">CHECK-OUT</Label>
                      <Input 
                        id="check-out" 
                        type="date" 
                        className="border-0 p-0 h-auto text-base focus-visible:ring-0 focus-visible:ring-offset-0" 
                        min={checkIn || tomorrow}
                        value={checkOut} 
                        onChange={(e) => setCheckOut(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <Label htmlFor="guests" className="text-xs font-medium">GUESTS</Label>
                    <div className="flex items-center">
                      <Input 
                        id="guests" 
                        type="number" 
                        className="border-0 p-0 h-auto text-base focus-visible:ring-0 focus-visible:ring-offset-0" 
                        min={1} 
                        max={property.beds * 2}
                        value={guests} 
                        onChange={(e) => setGuests(parseInt(e.target.value))} 
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mb-4"
                  size="lg"
                  onClick={handleBookNow}
                  disabled={!checkIn || !checkOut}
                >
                  Book Now
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full mb-6"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!checkIn || !checkOut}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">₹{property.price} × {
                      checkIn && checkOut 
                        ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))) 
                        : 1
                    } nights</span>
                    <span>₹{calculatePrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service fee</span>
                    <span>₹{Math.round(calculatePrice() * 0.1)}</span>
                  </div>
                  <div className="pt-4 border-t flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{calculatePrice() + Math.round(calculatePrice() * 0.1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;


import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Trash2, Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Cart = () => {
  const { items, removeFromCart, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-8 animate-fade-up">Your Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl animate-fade-up">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-playfair font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some amazing stays to your cart</p>
              <Link to="/places">
                <Button>Browse Places</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6 animate-fade-up">
                {items.map((item) => (
                  <div 
                    key={`${item.id}-${item.checkIn}`} 
                    className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-all"
                  >
                    <div className="sm:w-1/3 aspect-[4/3] relative rounded-lg overflow-hidden">
                      <img 
                        src={item.property.imageUrl} 
                        alt={item.property.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-playfair text-lg font-medium">{item.property.title}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500 p-1"
                          aria-label="Remove from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">{item.property.location}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {formatDate(item.checkIn)} — {formatDate(item.checkOut)}
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-600">
                          <User className="w-4 h-4" />
                          {item.guests} {item.guests === 1 ? 'guest' : 'guests'}
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-sm">
                          ₹{item.property.price} × {Math.ceil((new Date(item.checkOut).getTime() - new Date(item.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
                        </div>
                        <div className="font-semibold text-accent">₹{item.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearCart} 
                  className="text-gray-500"
                >
                  Clear Cart
                </Button>
              </div>
              
              <div className="animate-fade-up delay-100">
                <div className="bg-white p-6 rounded-xl border border-gray-100 sticky top-24">
                  <h3 className="font-playfair text-lg font-medium mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taxes</span>
                      <span>₹{Math.round(getCartTotal() * 0.12)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-3 border-t border-gray-100">
                      <span>Total</span>
                      <span className="text-accent">₹{getCartTotal() + Math.round(getCartTotal() * 0.12)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full gap-2" 
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By proceeding, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;

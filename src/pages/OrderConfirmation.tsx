
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Landmark, FileText } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  
  // Generate random order number
  const orderNumber = React.useMemo(() => {
    return `AIR${Math.floor(1000000 + Math.random() * 9000000)}`;
  }, []);
  
  // Redirect if user navigates directly to this page without checkout
  useEffect(() => {
    const hasCompletedCheckout = localStorage.getItem('lastOrder');
    if (!hasCompletedCheckout) {
      localStorage.setItem('lastOrder', orderNumber);
    }
  }, [orderNumber]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-up">
            <div className="mx-auto w-16 h-16 bg-green-100 flex items-center justify-center rounded-full mb-4">
              <CheckCircle className="text-green-600 w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">Thank you for booking with Airlace</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100 mb-8 animate-fade-up delay-100">
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-playfair text-xl font-medium">Order Summary</h2>
                <span className="text-sm font-medium">{orderNumber}</span>
              </div>
              
              <div className="space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Order Date</span>
                  <span>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span>Credit Card ****1234</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span>booking@airlace.com</span>
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-playfair text-lg font-medium">Booking Instructions</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-3">
                <p>
                  <span className="font-medium">Booking Confirmation:</span> An email with your booking details has been sent to your registered email address.
                </p>
                <p>
                  <span className="font-medium">Property Contact:</span> The property host will contact you with check-in instructions 24 hours before your arrival.
                </p>
                <p>
                  <span className="font-medium">Need Help?:</span> For any questions regarding your booking, please contact our 24/7 customer service at <span className="text-accent">1800-AIRLACE</span>.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up delay-200">
            <Button variant="outline" className="gap-2 h-auto py-6 flex-col items-center justify-center" asChild>
              <Link to="/">
                <Home className="w-5 h-5 mb-1" />
                <span>Return Home</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="gap-2 h-auto py-6 flex-col items-center justify-center" asChild>
              <Link to="/profile">
                <Landmark className="w-5 h-5 mb-1" />
                <span>My Bookings</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="gap-2 h-auto py-6 flex-col items-center justify-center" asChild>
              <Link to="/contact">
                <FileText className="w-5 h-5 mb-1" />
                <span>Support</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;

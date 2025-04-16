
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, CreditCard, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';
import { format } from 'date-fns';

const CheckoutSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Zip code is required"),
  paymentMethod: z.enum(["credit", "debit", "upi", "netbanking"]),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
  upiId: z.string().optional(),
  bankName: z.string().optional(),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof CheckoutSchema>;

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<CheckoutFormData>>({
    paymentMethod: "credit",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if cart is empty
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
      toast.error("Your cart is empty");
    }
  }, [items, navigate]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field if exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'paymentMethod'];
      
      // Add payment method specific validations
      if (formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') {
        requiredFields.push('cardName', 'cardNumber', 'cardExpiry', 'cardCvv');
      } else if (formData.paymentMethod === 'upi') {
        requiredFields.push('upiId');
      } else if (formData.paymentMethod === 'netbanking') {
        requiredFields.push('bankName');
      }
      
      // Validate all required fields
      const newErrors: Record<string, string> = {};
      requiredFields.forEach(field => {
        if (!formData[field as keyof CheckoutFormData]) {
          newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
        }
      });
      
      // Additional validations
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      
      if (formData.phone && !/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Invalid phone number';
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
      }
      
      // Simulate payment processing
      setTimeout(() => {
        // Successful payment
        clearCart();
        navigate('/order-confirmation');
        toast.success("Order placed successfully!");
        setIsSubmitting(false);
      }, 2000);
      
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("There was a problem processing your payment. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-8 animate-fade-up">Checkout</h1>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8 animate-fade-up">
              {/* Personal Information */}
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="font-playfair text-xl font-medium mb-4">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      name="fullName" 
                      value={formData.fullName || ''} 
                      onChange={handleChange} 
                      placeholder="John Doe"
                      className={errors.fullName ? "border-red-300" : ""}
                    />
                    {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email || ''} 
                      onChange={handleChange}
                      placeholder="john@example.com" 
                      className={errors.email ? "border-red-300" : ""}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone || ''} 
                      onChange={handleChange}
                      placeholder="10-digit mobile number" 
                      className={errors.phone ? "border-red-300" : ""}
                    />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>
              </div>
              
              {/* Billing Address */}
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="font-playfair text-xl font-medium mb-4">Billing Address</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formData.address || ''} 
                      onChange={handleChange}
                      placeholder="Street address" 
                      className={errors.address ? "border-red-300" : ""}
                    />
                    {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        value={formData.city || ''} 
                        onChange={handleChange}
                        placeholder="City" 
                        className={errors.city ? "border-red-300" : ""}
                      />
                      {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state" 
                        name="state" 
                        value={formData.state || ''} 
                        onChange={handleChange}
                        placeholder="State" 
                        className={errors.state ? "border-red-300" : ""}
                      />
                      {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input 
                        id="zipCode" 
                        name="zipCode" 
                        value={formData.zipCode || ''} 
                        onChange={handleChange}
                        placeholder="ZIP Code" 
                        className={errors.zipCode ? "border-red-300" : ""}
                      />
                      {errors.zipCode && <p className="text-xs text-red-500">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="font-playfair text-xl font-medium mb-4">Payment Method</h2>
                
                <RadioGroup 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => setFormData({...formData, paymentMethod: value as any})}
                  className="space-y-3 mb-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="debit" id="debit" />
                    <Label htmlFor="debit">Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking">Net Banking</Label>
                  </div>
                </RadioGroup>
                
                {/* Credit/Debit Card Details */}
                {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') && (
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input 
                        id="cardName" 
                        name="cardName" 
                        value={formData.cardName || ''} 
                        onChange={handleChange}
                        placeholder="John Doe" 
                        className={errors.cardName ? "border-red-300" : ""}
                      />
                      {errors.cardName && <p className="text-xs text-red-500">{errors.cardName}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        name="cardNumber" 
                        value={formData.cardNumber || ''} 
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456" 
                        className={errors.cardNumber ? "border-red-300" : ""}
                      />
                      {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input 
                          id="cardExpiry" 
                          name="cardExpiry" 
                          value={formData.cardExpiry || ''} 
                          onChange={handleChange}
                          placeholder="MM/YY" 
                          className={errors.cardExpiry ? "border-red-300" : ""}
                        />
                        {errors.cardExpiry && <p className="text-xs text-red-500">{errors.cardExpiry}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input 
                          id="cardCvv" 
                          name="cardCvv" 
                          value={formData.cardCvv || ''} 
                          onChange={handleChange}
                          placeholder="123" 
                          className={errors.cardCvv ? "border-red-300" : ""}
                        />
                        {errors.cardCvv && <p className="text-xs text-red-500">{errors.cardCvv}</p>}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* UPI Details */}
                {formData.paymentMethod === 'upi' && (
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input 
                        id="upiId" 
                        name="upiId" 
                        value={formData.upiId || ''} 
                        onChange={handleChange}
                        placeholder="name@upi" 
                        className={errors.upiId ? "border-red-300" : ""}
                      />
                      {errors.upiId && <p className="text-xs text-red-500">{errors.upiId}</p>}
                    </div>
                  </div>
                )}
                
                {/* Net Banking Details */}
                {formData.paymentMethod === 'netbanking' && (
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Select Bank</Label>
                      <select 
                        id="bankName" 
                        name="bankName" 
                        value={formData.bankName || ''} 
                        onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                        className={`w-full px-3 py-2 border rounded-md ${errors.bankName ? "border-red-300" : "border-gray-300"}`}
                      >
                        <option value="">Select a bank</option>
                        <option value="SBI">State Bank of India</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="Axis">Axis Bank</option>
                        <option value="PNB">Punjab National Bank</option>
                      </select>
                      {errors.bankName && <p className="text-xs text-red-500">{errors.bankName}</p>}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Additional Notes */}
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="font-playfair text-xl font-medium mb-4">Additional Notes</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Special Requests or Comments</Label>
                  <Textarea 
                    id="notes" 
                    name="notes" 
                    value={formData.notes || ''} 
                    onChange={handleChange}
                    placeholder="Any special requests or notes for your booking"
                    rows={3}
                  />
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="animate-fade-up delay-100">
              <div className="bg-white p-6 rounded-xl border border-gray-100 sticky top-24">
                <h2 className="font-playfair text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.checkIn}`} className="flex gap-4 py-3 border-b border-gray-100">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.property.imageUrl} 
                          alt={item.property.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.property.title}</h3>
                        <p className="text-xs text-muted-foreground">{formatDate(item.checkIn)} - {formatDate(item.checkOut)}</p>
                        <p className="text-sm font-medium mt-1">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
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
                  type="submit" 
                  className="w-full gap-2" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Complete Payment
                    </>
                  )}
                </Button>
                
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                  <AlertCircle className="w-4 h-4" />
                  <span>Your payment information is secure</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;

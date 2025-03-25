
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 -z-10"></div>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 animate-fade-up">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up delay-100">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-scale-in">
              <h2 className="text-2xl font-medium mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-col space-y-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-8 animate-scale-in delay-100">
                <h2 className="text-2xl font-medium mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3" />
                    <span>contact@airplace.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3" />
                    <span>123 Airplace Street, San Francisco, CA 94103</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-8 animate-scale-in delay-200">
                <h2 className="text-2xl font-medium mb-4">Office Hours</h2>
                <p className="mb-4">Our support team is available during the following hours:</p>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;

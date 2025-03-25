
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Globe, Shield, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-blue-50 -z-10"></div>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 animate-fade-up">About Airplace</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up delay-100">
              Our mission is to create a world where anyone can belong anywhere.
            </p>
          </div>
        </section>
        
        {/* Story Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-fade-up">
              <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2023, Airplace began as a simple idea: what if you could book a home anywhere in the world with just a few clicks?
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We've come a long way since our humble beginnings, and have now grown to millions of listings in over 100,000 cities worldwide.
              </p>
              <Button className="mt-4 bg-accent hover:bg-accent/90">
                Learn more about our journey <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="order-1 md:order-2 animate-fade-up delay-100">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                  alt="Cozy Home Interior" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-12">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  title: "Community",
                  description: "We believe in the power of connecting people through travel.",
                  color: "bg-gradient-to-br from-blue-500 to-blue-600"
                },
                {
                  icon: Globe,
                  title: "Diversity",
                  description: "We celebrate and respect the diversity of our global community.",
                  color: "bg-gradient-to-br from-teal-500 to-teal-600"
                },
                {
                  icon: Shield,
                  title: "Trust & Safety",
                  description: "We're committed to building a platform of trust and safety.",
                  color: "bg-gradient-to-br from-purple-500 to-purple-600"
                },
                {
                  icon: Award,
                  title: "Quality",
                  description: "We strive for excellence in every aspect of our service.",
                  color: "bg-gradient-to-br from-orange-500 to-orange-600"
                }
              ].map((value, index) => (
                <div key={value.title} className="animate-fade-up" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                  <div className={`rounded-xl p-6 text-white ${value.color}`}>
                    <value.icon className="h-12 w-12 mb-4" />
                    <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Co-founder",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
              },
              {
                name: "Michael Chen",
                role: "CTO & Co-founder",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
              },
              {
                name: "Olivia Rodriguez",
                role: "Head of Design",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80"
              }
            ].map((member, index) => (
              <div key={member.name} className="animate-fade-up" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;

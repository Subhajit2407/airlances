
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Star, Clock, MapPin, Users, ChevronRight } from 'lucide-react';

const ExperienceCard = ({ experience }: { experience: any }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md animate-scale-in">
      <div className="relative aspect-[3/2] overflow-hidden">
        <img 
          src={experience.image} 
          alt={experience.title} 
          className="w-full h-full object-cover object-center transition-transform group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
          <Star className="h-3 w-3 text-yellow-500 mr-1" /> {experience.rating}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-medium group-hover:text-accent transition-colors">{experience.title}</h3>
          <p className="text-lg font-medium">${experience.price}</p>
        </div>
        <p className="text-muted-foreground mb-3">{experience.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="text-xs bg-gray-100 rounded-full px-2 py-1 flex items-center">
            <Clock className="h-3 w-3 mr-1" /> {experience.duration}
          </div>
          <div className="text-xs bg-gray-100 rounded-full px-2 py-1 flex items-center">
            <MapPin className="h-3 w-3 mr-1" /> {experience.location}
          </div>
          <div className="text-xs bg-gray-100 rounded-full px-2 py-1 flex items-center">
            <Users className="h-3 w-3 mr-1" /> Up to {experience.maxGuests} guests
          </div>
        </div>
        <Button className="w-full bg-accent hover:bg-accent/90">View Details</Button>
      </div>
    </div>
  );
};

const Experiences = () => {
  const experiences = [
    {
      id: 1,
      title: "Sunset Kayaking Adventure",
      description: "Paddle through calm waters as the sun sets over the horizon, creating a magical atmosphere.",
      price: 79,
      rating: 4.9,
      duration: "2 hours",
      location: "San Francisco Bay",
      maxGuests: 8,
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 2,
      title: "Local Wine Tasting Tour",
      description: "Visit three boutique wineries and sample award-winning wines with a professional sommelier.",
      price: 125,
      rating: 4.8,
      duration: "4 hours",
      location: "Napa Valley",
      maxGuests: 12,
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 3,
      title: "Pasta Making Workshop",
      description: "Learn traditional Italian pasta making techniques from an experienced local chef.",
      price: 95,
      rating: 4.9,
      duration: "3 hours",
      location: "Little Italy, New York",
      maxGuests: 10,
      image: "https://images.unsplash.com/photo-1607528971899-2e89e6c0ec69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 4,
      title: "Street Art Walking Tour",
      description: "Explore vibrant murals and graffiti art with a knowledgeable local guide.",
      price: 45,
      rating: 4.7,
      duration: "2.5 hours",
      location: "Brooklyn, New York",
      maxGuests: 15,
      image: "https://images.unsplash.com/photo-1551732998-9573f695fdbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 5,
      title: "Sunrise Mountain Yoga",
      description: "Start your day with a rejuvenating yoga session as the sun rises over the mountains.",
      price: 35,
      rating: 4.9,
      duration: "1.5 hours",
      location: "Boulder, Colorado",
      maxGuests: 20,
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 6,
      title: "Jazz Club Hop",
      description: "Visit three of the city's best jazz clubs with privileged access and a local music expert.",
      price: 110,
      rating: 4.8,
      duration: "4 hours",
      location: "New Orleans",
      maxGuests: 10,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80"
    }
  ];

  const categories = [
    "Adventure", "Food & Drink", "Arts & Culture", "Nature", "Sports", "Wellness", "History", "Music"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 -z-10"></div>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 animate-fade-up">
              Unforgettable Experiences
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up delay-100">
              Discover unique activities led by local experts, from cooking classes to outdoor adventures.
            </p>
          </div>
        </section>
        
        {/* Categories */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-medium mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Button 
                key={category}
                variant="outline"
                className="h-auto py-4 justify-between animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {category}
                <ChevronRight className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </section>
        
        {/* Featured Experiences */}
        <section className="bg-gradient-to-r from-teal-50 to-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-medium">Featured Experiences</h2>
              <Button variant="link" className="text-accent">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experiences.slice(0, 3).map(experience => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </div>
        </section>
        
        {/* All Experiences */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-medium mb-8">All Experiences</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map(experience => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Experiences;

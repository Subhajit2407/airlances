
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Users, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Experience {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  duration: string;
}

const experiences: Experience[] = [
  {
    id: '1',
    title: 'Tea Plantation Tour & Tasting',
    location: 'Darjeeling, West Bengal',
    description: 'Walk through historic tea gardens and learn the art of tea making from local experts.',
    price: 1200,
    currency: '₹',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647',
    category: 'Cultural',
    duration: '3 hours'
  },
  {
    id: '2',
    title: 'Living Root Bridge Trek',
    location: 'Nongriat, Meghalaya',
    description: 'Trek to see ancient living root bridges created by the Khasi tribes over generations.',
    price: 1500,
    currency: '₹',
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1575490274908-dff69a687045',
    category: 'Adventure',
    duration: '4 hours'
  },
  {
    id: '3',
    title: 'Majuli Mask Making Workshop',
    location: 'Majuli Island, Assam',
    description: 'Learn the traditional art of mask making from skilled Assamese craftsmen.',
    price: 900,
    currency: '₹',
    rating: 4.7,
    reviews: 82,
    image: 'https://images.unsplash.com/photo-1569902827337-ef0b99afc126',
    category: 'Cultural',
    duration: '2 hours'
  },
  {
    id: '4',
    title: 'Brahmaputra River Cruise',
    location: 'Guwahati, Assam',
    description: 'Enjoy a sunset cruise along the mighty Brahmaputra river with traditional music.',
    price: 2200,
    currency: '₹',
    rating: 4.6,
    reviews: 74,
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
    category: 'Wildlife',
    duration: '3 hours'
  },
  {
    id: '5',
    title: 'Naga Cuisine Cooking Class',
    location: 'Kohima, Nagaland',
    description: 'Learn to cook authentic Naga dishes using traditional methods and ingredients.',
    price: 1800,
    currency: '₹',
    rating: 4.9,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f',
    category: 'Food & Drink',
    duration: '4 hours'
  },
  {
    id: '6',
    title: 'Kathakali Dance Performance',
    location: 'Kochi, Kerala',
    description: 'Witness a traditional Kathakali dance performance with elaborate costumes and makeup.',
    price: 850,
    currency: '₹',
    rating: 4.8,
    reviews: 192,
    image: 'https://images.unsplash.com/photo-1584888890457-767db945973e',
    category: 'Cultural',
    duration: '2 hours'
  },
  {
    id: '7',
    title: 'Loktak Lake Floating Homestay',
    location: 'Moirang, Manipur',
    description: 'Experience life on a floating phumdis (island) on the unique Loktak Lake.',
    price: 2800,
    currency: '₹',
    rating: 4.9,
    reviews: 43,
    image: 'https://images.unsplash.com/photo-1527824404775-dce343118ebc',
    category: 'Adventure',
    duration: 'Overnight'
  },
  {
    id: '8',
    title: 'Tribal Heritage Tour',
    location: 'Ziro Valley, Arunachal Pradesh',
    description: 'Visit traditional Apatani tribe villages and learn about their unique culture.',
    price: 1600,
    currency: '₹',
    rating: 4.7,
    reviews: 58,
    image: 'https://images.unsplash.com/photo-1569949629840-8ade41698772',
    category: 'Cultural',
    duration: '5 hours'
  }
];

const ExperienceCard: React.FC<{ experience: Experience }> = ({ experience }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover-lift">
      <div className="aspect-video overflow-hidden">
        <img 
          src={experience.image} 
          alt={experience.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" 
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-1 rounded-full">
            {experience.category}
          </span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm ml-1 font-medium">{experience.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({experience.reviews})</span>
          </div>
        </div>
        
        <h3 className="font-playfair font-medium text-lg mb-1">{experience.title}</h3>
        
        <div className="flex items-center text-muted-foreground mb-2 text-sm">
          <MapPin className="w-3 h-3 mr-1" />
          {experience.location}
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{experience.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Calendar className="w-3 h-3 mr-1" />
            {experience.duration}
          </div>
          <div className="text-right">
            <span className="text-lg font-semibold">{experience.currency}{experience.price}</span>
            <span className="text-xs text-muted-foreground"> / person</span>
          </div>
        </div>
        
        <Button className="w-full mt-4">Book Experience</Button>
      </div>
    </div>
  );
};

const Experiences = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filterExperiences = (category: string = '') => {
    return experiences.filter(exp => 
      (category === '' || exp.category === category) &&
      (searchTerm === '' || exp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exp.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-16 px-6 bg-gradient-to-r from-amber-50 to-orange-100">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-3">Amazing Experiences</h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">Discover authentic Indian cultural experiences, from tea plantation tours to tribal heritage walks.</p>
            
            <div className="relative max-w-lg">
              <Input
                type="text"
                placeholder="Search experiences by name or location"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 py-6"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </section>
        
        {/* Experiences Tabs */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="all">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="cultural">Cultural</TabsTrigger>
                  <TabsTrigger value="adventure">Adventure</TabsTrigger>
                  <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
                  <TabsTrigger value="food">Food & Drink</TabsTrigger>
                </TabsList>
                
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filterExperiences().map(experience => (
                    <ExperienceCard key={experience.id} experience={experience} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="cultural" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filterExperiences('Cultural').map(experience => (
                    <ExperienceCard key={experience.id} experience={experience} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="adventure" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filterExperiences('Adventure').map(experience => (
                    <ExperienceCard key={experience.id} experience={experience} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="wildlife" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filterExperiences('Wildlife').map(experience => (
                    <ExperienceCard key={experience.id} experience={experience} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="food" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filterExperiences('Food & Drink').map(experience => (
                    <ExperienceCard key={experience.id} experience={experience} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Experiences;

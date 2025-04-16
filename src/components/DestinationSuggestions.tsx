
import React from 'react';
import { Sparkles, Castle, Bird, Palmtree, Mountain, Waves, Coffee, Tent } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DestinationCategory {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

const DestinationSuggestions = () => {
  const categories: DestinationCategory[] = [
    {
      name: "Northeast Hills",
      description: "Misty mountains and lush valleys",
      icon: <Mountain className="h-6 w-6" />,
      color: "bg-green-100 text-green-700",
      link: "/places?category=hills"
    },
    {
      name: "Backwaters",
      description: "Serene waterways of Kerala",
      icon: <Coffee className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-700",
      link: "/places?category=backwaters"
    },
    {
      name: "Beaches",
      description: "Coastal retreats and sunsets",
      icon: <Waves className="h-6 w-6" />,
      color: "bg-cyan-100 text-cyan-700", 
      link: "/places?category=beaches"
    },
    {
      name: "Wildlife",
      description: "Natural habitats and safaris",
      icon: <Bird className="h-6 w-6" />,
      color: "bg-amber-100 text-amber-700",
      link: "/places?category=wildlife"
    },
    {
      name: "Heritage Sites",
      description: "Historical monuments and architecture",
      icon: <Castle className="h-6 w-6" />,
      color: "bg-orange-100 text-orange-700",
      link: "/places?category=heritage"
    },
    {
      name: "Tropical Getaways",
      description: "Island escapes and palm retreats",
      icon: <Palmtree className="h-6 w-6" />,
      color: "bg-emerald-100 text-emerald-700",
      link: "/places?category=tropical"
    },
    {
      name: "Tea Gardens",
      description: "Rolling tea plantations",
      icon: <Coffee className="h-6 w-6" />,
      color: "bg-lime-100 text-lime-700",
      link: "/places?category=tea"
    },
    {
      name: "Camping Spots",
      description: "Wilderness stays under starlit skies",
      icon: <Tent className="h-6 w-6" />,
      color: "bg-indigo-100 text-indigo-700",
      link: "/places?category=camping"
    }
  ];

  return (
    <section className="py-12 px-6 bg-gradient-hills">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <Sparkles className="mr-2 h-5 w-5 text-accent" />
          <h2 className="text-2xl font-playfair font-medium">Suggested Explorations</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className="bg-white rounded-xl p-4 hover:shadow-md transition-all hover-lift"
            >
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-3 ${category.color}`}>
                {category.icon}
              </div>
              <h3 className="font-medium mb-1 font-playfair">{category.name}</h3>
              <p className="text-sm text-muted-foreground font-poppins">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationSuggestions;

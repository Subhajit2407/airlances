
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Check, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DestinationSuggestions from '@/components/DestinationSuggestions';
import { useLocation } from 'react-router-dom';

const Places = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );

  const filterOptions = [
    "Beachfront", "Mountain view", "Pool", "Hot tub", "Pet friendly", 
    "Wifi", "Kitchen", "Free parking", "Air conditioning", "Washer & dryer",
    "hills", "backwaters", "beaches", "wildlife", "heritage", "tropical", "tea", "camping"
  ];

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    
    // For demonstration purposes - in real app, properties would have these attributes
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Search Section */}
        <section className="relative py-12 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-6 animate-fade-up">Find Your Perfect Place</h1>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6 animate-fade-up delay-100">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by location or property name"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 py-6 bg-white"
                />
              </div>
              
              <Button 
                onClick={() => setFiltersVisible(!filtersVisible)}
                variant="outline" 
                className="md:w-auto"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
            
            {filtersVisible && (
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6 animate-scale-in">
                <h3 className="text-lg font-medium mb-4">Filters</h3>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Price Range (per night)</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Amenities</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {filterOptions.map(filter => (
                      <Button
                        key={filter}
                        variant="outline"
                        onClick={() => toggleFilter(filter)}
                        className={selectedFilters.includes(filter) 
                          ? "bg-accent text-white border-accent" 
                          : ""}
                      >
                        {selectedFilters.includes(filter) && <Check className="mr-2 h-4 w-4" />}
                        {filter}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Destination Suggestions */}
        <DestinationSuggestions />
        
        {/* Properties Grid */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'place' : 'places'} to stay
            </h2>
            <div className="text-muted-foreground">
              Sort by: <span className="font-medium text-primary">Recommended</span>
            </div>
          </div>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl mb-2">No properties found matching your criteria</p>
              <p className="text-muted-foreground">Try adjusting your filters or search term</p>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Places;

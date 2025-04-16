
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Check, Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DestinationSuggestions from '@/components/DestinationSuggestions';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Places = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const locationParam = queryParams.get('location');

  const [searchTerm, setSearchTerm] = useState(locationParam || '');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );

  useEffect(() => {
    // Update search term when location param changes
    if (locationParam) {
      setSearchTerm(locationParam);
    }
  }, [locationParam]);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search params
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set('location', searchTerm);
    }
    if (selectedFilters.length > 0) {
      params.set('category', selectedFilters[0]);
    }
    
    navigate(`/places?${params.toString()}`);
    toast(`Showing stays${searchTerm ? ' in ' + searchTerm : ''}`);
  };

  const filteredProperties = properties.filter(property => {
    // Enhanced search by location
    const matchesSearch = !searchTerm ? true : (
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (searchTerm.toLowerCase() === 'goa' && property.location.toLowerCase().includes('goa'))
    );
    
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    
    // Enhanced filter matching
    const matchesFilters = selectedFilters.length === 0 || 
      selectedFilters.some(filter => {
        const filterLower = filter.toLowerCase();
        return property.amenities.some(amenity => 
          amenity.toLowerCase().includes(filterLower) ||
          amenity.toLowerCase() === filterLower
        ) ||
        property.location.toLowerCase().includes(filterLower) ||
        (property.region && property.region.toLowerCase().includes(filterLower));
      });
    
    return matchesSearch && matchesPrice && matchesFilters;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Search Section */}
        <section className="relative py-12 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-6 animate-fade-up">
              {searchTerm 
                ? `Places to stay in ${searchTerm}` 
                : 'Find Your Perfect Place'}
            </h1>
            
            <form onSubmit={handleSearch} className="animate-fade-up delay-100">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
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
                  type="button"
                  variant="outline" 
                  className="md:w-auto"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                
                <Button type="submit" className="md:w-auto">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </form>
            
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
                  <h4 className="text-sm font-medium mb-2">Amenities & Categories</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {filterOptions.map(filter => (
                      <Button
                        key={filter}
                        variant="outline"
                        onClick={() => toggleFilter(filter)}
                        className={selectedFilters.includes(filter) 
                          ? "bg-accent text-white border-accent" 
                          : ""}
                        type="button"
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

        {/* Popular Destinations Quick Filters - Only show when no search applied */}
        {!searchTerm && <DestinationSuggestions />}
        
        {/* Properties Grid */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'place' : 'places'} to stay
              {searchTerm && (
                <span className="flex items-center text-base font-normal text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" /> {searchTerm}
                </span>
              )}
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
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search term</p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedFilters([]);
                navigate('/places');
              }}>
                Clear all filters
              </Button>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Places;


import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, X, Loader2, History, Bookmark, Plane, Hotel, Coffee, Navigation, Compass, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from 'sonner';

interface SearchResult {
  id: string;
  title: string;
  location: string;
  type: 'destination' | 'experience' | 'stay';
  path: string;
}

// Enhanced mock data with more Indian cities and international destinations
const mockSearchResults = (query: string): SearchResult[] => {
  // This simulates a search API response based on the query
  if (!query || query.length < 2) return [];
  
  // These would come from an API in a real implementation
  const results: SearchResult[] = [
    // Major Indian cities
    { id: 'delhi1', title: 'Delhi', location: 'National Capital Territory', type: 'destination', path: '/places?location=Delhi' },
    { id: 'delhi2', title: 'Old Delhi Heritage Walk', location: 'Delhi', type: 'experience', path: '/experiences' },
    { id: 'delhi3', title: 'Luxury Hotel in Connaught Place', location: 'Delhi', type: 'stay', path: '/property/7' },
    
    // Mumbai
    { id: 'mumbai1', title: 'Mumbai', location: 'Maharashtra', type: 'destination', path: '/places?location=Mumbai' },
    { id: 'mumbai2', title: 'Gateway of India', location: 'Mumbai, Maharashtra', type: 'destination', path: '/places' },
    
    // Kolkata
    { id: 'kolkata1', title: 'Kolkata', location: 'West Bengal', type: 'destination', path: '/places?location=Kolkata' },
    
    // Chennai
    { id: 'chennai1', title: 'Chennai', location: 'Tamil Nadu', type: 'destination', path: '/places?location=Chennai' },
    
    // Northeast destinations
    { id: '1', title: 'Majuli Island', location: 'Assam', type: 'destination', path: '/places' },
    { id: '2', title: 'Tawang Monastery', location: 'Arunachal Pradesh', type: 'destination', path: '/places' },
    { id: '3', title: 'Living Root Bridges', location: 'Meghalaya', type: 'destination', path: '/places' },
    { id: '4', title: 'Loktak Lake', location: 'Manipur', type: 'destination', path: '/places' },
    { id: '5', title: 'Dzükou Valley', location: 'Nagaland', type: 'destination', path: '/places' },
    
    // South destinations
    { id: '6', title: 'Backwaters', location: 'Kerala', type: 'destination', path: '/places?category=backwaters' },
    { id: '7', title: 'Mysore Palace', location: 'Karnataka', type: 'destination', path: '/places' },
    { id: '8', title: 'Meenakshi Temple', location: 'Tamil Nadu', type: 'destination', path: '/places' },
    
    // North destinations
    { id: '9', title: 'Taj Mahal', location: 'Agra, Uttar Pradesh', type: 'destination', path: '/places' },
    { id: '10', title: 'Golden Temple', location: 'Amritsar, Punjab', type: 'destination', path: '/places' },
    { id: '11', title: 'Leh Ladakh', location: 'Jammu & Kashmir', type: 'destination', path: '/places' },
    { id: '12', title: 'Jaipur City Palace', location: 'Rajasthan', type: 'destination', path: '/places' },
    
    // West destinations
    { id: '13', title: 'Gateway of India', location: 'Mumbai, Maharashtra', type: 'destination', path: '/places' },
    { id: '14', title: 'Goa Beaches', location: 'Goa', type: 'destination', path: '/places?category=beaches' },
    
    // Central destinations
    { id: '15', title: 'Khajuraho Temples', location: 'Madhya Pradesh', type: 'destination', path: '/places' },
    
    // Experiences
    { id: '21', title: 'Tea Plantation Tours', location: 'Assam', type: 'experience', path: '/experiences' },
    { id: '22', title: 'Hornbill Festival', location: 'Nagaland', type: 'experience', path: '/experiences' },
    { id: '23', title: 'Houseboat Stay', location: 'Kerala', type: 'experience', path: '/experiences' },
    { id: '24', title: 'Desert Safari', location: 'Rajasthan', type: 'experience', path: '/experiences' },
    { id: '25', title: 'Yoga Retreat', location: 'Rishikesh', type: 'experience', path: '/experiences' },
    
    // Stays
    { id: '31', title: 'Riverfront Cottage', location: 'Majuli, Assam', type: 'stay', path: '/property/1' },
    { id: '32', title: 'Mountain Retreat', location: 'Tawang', type: 'stay', path: '/property/2' },
    { id: '33', title: 'Floating Homestay', location: 'Loktak Lake', type: 'stay', path: '/property/3' },
    { id: '34', title: 'Heritage Haveli', location: 'Jaipur', type: 'stay', path: '/property/4' },
    { id: '35', title: 'Beachfront Villa', location: 'Goa', type: 'stay', path: '/property/5' },
    { id: '36', title: 'Hillside Cottage', location: 'Shillong, Meghalaya', type: 'stay', path: '/property/6' },
    
    // New International Destinations
    { id: 'intl1', title: 'Singapore', location: 'Southeast Asia', type: 'destination', path: '/places?location=Singapore' },
    { id: 'intl2', title: 'Dubai', location: 'United Arab Emirates', type: 'destination', path: '/places?location=Dubai' },
    { id: 'intl3', title: 'Bangkok', location: 'Thailand', type: 'destination', path: '/places?location=Bangkok' },
    { id: 'intl4', title: 'Bali', location: 'Indonesia', type: 'destination', path: '/places?location=Bali' },
    { id: 'intl5', title: 'Tokyo', location: 'Japan', type: 'destination', path: '/places?location=Tokyo' },
    { id: 'intl6', title: 'Paris', location: 'France', type: 'destination', path: '/places?location=Paris' },
    { id: 'intl7', title: 'London', location: 'United Kingdom', type: 'destination', path: '/places?location=London' },
    { id: 'intl8', title: 'New York', location: 'United States', type: 'destination', path: '/places?location=New York' },
    
    // More Indian Cities
    { id: 'ind1', title: 'Bangalore', location: 'Karnataka', type: 'destination', path: '/places?location=Bangalore' },
    { id: 'ind2', title: 'Hyderabad', location: 'Telangana', type: 'destination', path: '/places?location=Hyderabad' },
    { id: 'ind3', title: 'Ahmedabad', location: 'Gujarat', type: 'destination', path: '/places?location=Ahmedabad' },
    { id: 'ind4', title: 'Pune', location: 'Maharashtra', type: 'destination', path: '/places?location=Pune' },
    { id: 'ind5', title: 'Chandigarh', location: 'Punjab & Haryana', type: 'destination', path: '/places?location=Chandigarh' },
    { id: 'ind6', title: 'Lucknow', location: 'Uttar Pradesh', type: 'destination', path: '/places?location=Lucknow' },
    { id: 'ind7', title: 'Kochi', location: 'Kerala', type: 'destination', path: '/places?location=Kochi' },
    { id: 'ind8', title: 'Varanasi', location: 'Uttar Pradesh', type: 'destination', path: '/places?location=Varanasi' },
    { id: 'ind9', title: 'Darjeeling', location: 'West Bengal', type: 'destination', path: '/places?location=Darjeeling' },
    { id: 'ind10', title: 'Pondicherry', location: 'Tamil Nadu', type: 'destination', path: '/places?location=Pondicherry' },
  ];
  
  // Filter based on query - make case insensitive search more robust
  const lowerQuery = query.toLowerCase();
  return results.filter(result => 
    result.title.toLowerCase().includes(lowerQuery) || 
    result.location.toLowerCase().includes(lowerQuery)
  ).slice(0, 15); // Limit to 15 results
};

// Maximum number of recent searches to store
const MAX_RECENT_SEARCHES = 5;

const SearchBar = ({ className }: { className?: string }) => {
  const [activeTab, setActiveTab] = useState('location');
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('airlaces-recent-searches');
    return saved ? JSON.parse(saved) : [];
  });
  const [trendingSearches, setTrendingSearches] = useState<SearchResult[]>([
    { id: 'trend1', title: 'Goa', location: 'India', type: 'destination', path: '/places?location=Goa' },
    { id: 'trend2', title: 'Kerala Backwaters', location: 'Kerala', type: 'destination', path: '/places?category=backwaters' },
    { id: 'trend3', title: 'Singapore', location: 'Southeast Asia', type: 'destination', path: '/places?location=Singapore' },
    { id: 'trend4', title: 'Dubai', location: 'UAE', type: 'destination', path: '/places?location=Dubai' },
  ]);
  
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'location', label: 'Where', icon: MapPin },
    { id: 'dates', label: 'When', icon: Calendar },
    { id: 'guests', label: 'Who', icon: Users },
  ];

  // Save recent searches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('airlaces-recent-searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Effect for search
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery.length < 2) {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll use our mock function with a timeout to simulate API latency
        setTimeout(() => {
          const searchResults = mockSearchResults(debouncedQuery);
          setResults(searchResults);
          setIsLoading(false);
        }, 600);
      } catch (error) {
        console.error("Search error:", error);
        toast("Search failed. Please try again.");
        setIsLoading(false);
      }
    };
    
    performSearch();
  }, [debouncedQuery]);

  // Add to recent searches
  const addToRecentSearches = (result: SearchResult) => {
    setRecentSearches(prev => {
      // Remove if already exists (to move it to the top)
      const filtered = prev.filter(item => item.id !== result.id);
      // Add to the beginning and limit to MAX_RECENT_SEARCHES
      return [result, ...filtered].slice(0, MAX_RECENT_SEARCHES);
    });
  };

  const handleSelect = (result: SearchResult) => {
    addToRecentSearches(result);
    navigate(result.path);
    setIsOpen(false);
    setQuery('');
    toast(`Exploring ${result.title} in ${result.location}`);

    // Track search analytics (would be an API call in production)
    console.log('Search analytics:', { 
      term: query, 
      selectedResult: result.title,
      timestamp: new Date().toISOString()
    });
  };

  const handleOpenSearch = () => {
    setIsOpen(true);
  };

  const handleClearSearch = () => {
    setQuery('');
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    toast('Recent searches cleared');
  };

  const getIconForResult = (type: string) => {
    switch(type) {
      case 'destination': return <MapPin className="mr-2 h-4 w-4 text-accent" />;
      case 'experience': return <Coffee className="mr-2 h-4 w-4 text-green-500" />;
      case 'stay': return <Hotel className="mr-2 h-4 w-4 text-blue-500" />;
      default: return <Compass className="mr-2 h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <>
      <div className={cn(
        "glass rounded-full p-2 max-w-3xl w-full mx-auto shadow-sm animate-scale-in",
        className
      )}>
        <div className="flex items-center">
          {tabs.map((tab, index) => {
            return (
              <React.Fragment key={tab.id}>
                <button
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'location') handleOpenSearch();
                  }}
                  className={cn(
                    "flex items-center py-3 px-6 rounded-full flex-1 transition-all text-left",
                    activeTab === tab.id 
                      ? "bg-white shadow-sm text-primary" 
                      : "text-gray-600 hover:bg-white/50"
                  )}
                >
                  <tab.icon className="w-4 h-4 mr-3 text-gray-500" />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">{tab.label}</span>
                    <span className="text-sm truncate">
                      {tab.id === 'location' && (query || 'Search destinations')}
                      {tab.id === 'dates' && 'Any week'}
                      {tab.id === 'guests' && 'Add guests'}
                    </span>
                  </div>
                </button>
                
                {index < tabs.length - 1 && (
                  <div className="h-8 w-px bg-gray-200 mx-1"></div>
                )}
              </React.Fragment>
            );
          })}

          <button 
            onClick={handleOpenSearch}
            className="bg-accent hover:bg-accent/90 text-white p-4 rounded-full flex items-center justify-center transition-all focus-ring ml-2"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      <CommandDialog 
        open={isOpen} 
        onOpenChange={setIsOpen}
      >
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput 
            placeholder="Search amazing destinations across the world..." 
            value={query}
            onValueChange={setQuery}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
          {query && (
            <button onClick={handleClearSearch} className="focus:outline-none">
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        
        <CommandList>
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-accent" />
              <span className="ml-2">Searching destinations worldwide...</span>
            </div>
          )}
          
          {!isLoading && query.length > 0 && results.length === 0 && (
            <CommandEmpty>No destinations found. Try a different search term or location.</CommandEmpty>
          )}
          
          {!isLoading && results.length > 0 && (
            <>
              {results.some(result => result.type === 'destination') && (
                <CommandGroup heading="Destinations">
                  {results.filter(result => result.type === 'destination').map((result) => (
                    <CommandItem 
                      key={result.id}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center cursor-pointer"
                    >
                      {getIconForResult(result.type)}
                      <div>
                        <div className="font-medium">{result.title}</div>
                        <div className="text-xs text-muted-foreground">{result.location}</div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {results.some(result => result.type === 'experience') && (
                <CommandGroup heading="Experiences">
                  {results.filter(result => result.type === 'experience').map((result) => (
                    <CommandItem 
                      key={result.id}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center cursor-pointer"
                    >
                      {getIconForResult(result.type)}
                      <div>
                        <div className="font-medium">{result.title}</div>
                        <div className="text-xs text-muted-foreground">{result.location}</div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {results.some(result => result.type === 'stay') && (
                <CommandGroup heading="Places to Stay">
                  {results.filter(result => result.type === 'stay').map((result) => (
                    <CommandItem 
                      key={result.id}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center cursor-pointer"
                    >
                      {getIconForResult(result.type)}
                      <div>
                        <div className="font-medium">{result.title}</div>
                        <div className="text-xs text-muted-foreground">{result.location}</div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}

          {!isLoading && query.length === 0 && (
            <>
              {recentSearches.length > 0 && (
                <CommandGroup heading={
                  <div className="flex justify-between items-center w-full pr-2">
                    <span>Recent Searches</span>
                    <button 
                      onClick={clearRecentSearches}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </button>
                  </div>
                }>
                  {recentSearches.map((result) => (
                    <CommandItem 
                      key={result.id}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center cursor-pointer"
                    >
                      <History className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{result.title}</div>
                        <div className="text-xs text-muted-foreground">{result.location}</div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              <CommandGroup heading="Trending Destinations">
                {trendingSearches.map((result) => (
                  <CommandItem 
                    key={result.id}
                    onSelect={() => handleSelect(result)}
                    className="flex items-center cursor-pointer"
                  >
                    <TrendingUp className="mr-2 h-4 w-4 text-orange-500" />
                    <div>
                      <div className="font-medium">{result.title}</div>
                      <div className="text-xs text-muted-foreground">{result.location}</div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              
              <div className="py-6 px-4 text-center text-sm text-muted-foreground">
                <p>Search for destinations across the world</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                  <button 
                    onClick={() => setQuery("Delhi")}
                    className="p-2 text-left rounded-md hover:bg-accent/10"
                  >
                    <p className="font-medium">Delhi</p>
                    <p className="text-xs">National Capital Territory</p>
                  </button>
                  <button 
                    onClick={() => setQuery("Mumbai")}
                    className="p-2 text-left rounded-md hover:bg-accent/10"
                  >
                    <p className="font-medium">Mumbai</p>
                    <p className="text-xs">Maharashtra</p>
                  </button>
                  <button 
                    onClick={() => setQuery("Dubai")}
                    className="p-2 text-left rounded-md hover:bg-accent/10"
                  >
                    <p className="font-medium">Dubai</p>
                    <p className="text-xs">United Arab Emirates</p>
                  </button>
                  <button 
                    onClick={() => setQuery("Singapore")}
                    className="p-2 text-left rounded-md hover:bg-accent/10"
                  >
                    <p className="font-medium">Singapore</p>
                    <p className="text-xs">Southeast Asia</p>
                  </button>
                </div>
              </div>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;

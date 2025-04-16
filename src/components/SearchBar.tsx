
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, X, Loader2 } from 'lucide-react';
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

// Enhanced mock data with more Indian cities, especially including Delhi
const mockSearchResults = (query: string): SearchResult[] => {
  // This simulates a search API response based on the query
  if (!query || query.length < 2) return [];
  
  // These would come from an API in a real implementation
  const results: SearchResult[] = [
    // Major cities
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
  ];
  
  // Filter based on query - make case insensitive search more robust
  const lowerQuery = query.toLowerCase();
  return results.filter(result => 
    result.title.toLowerCase().includes(lowerQuery) || 
    result.location.toLowerCase().includes(lowerQuery)
  ).slice(0, 10); // Limit to 10 results
};

const SearchBar = ({ className }: { className?: string }) => {
  const [activeTab, setActiveTab] = useState('location');
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'location', label: 'Where', icon: MapPin },
    { id: 'dates', label: 'When', icon: Calendar },
    { id: 'guests', label: 'Who', icon: Users },
  ];

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

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    setIsOpen(false);
    setQuery('');
    toast(`Exploring ${result.title} in ${result.location}`);
  };

  const handleOpenSearch = () => {
    setIsOpen(true);
  };

  const handleClearSearch = () => {
    setQuery('');
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
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen} label="Search dialog" description="Search for destinations, experiences, and stays">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput 
            placeholder="Search amazing destinations across India..." 
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
              <span className="ml-2">Searching India's best places...</span>
            </div>
          )}
          
          {!isLoading && query.length > 0 && results.length === 0 && (
            <CommandEmpty>No places found. Try a different search term or location.</CommandEmpty>
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
                      <MapPin className="mr-2 h-4 w-4 text-accent" />
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
                      <Calendar className="mr-2 h-4 w-4 text-green-500" />
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
                      <Users className="mr-2 h-4 w-4 text-blue-500" />
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
            <div className="py-6 px-4 text-center text-sm text-muted-foreground">
              <p>Search for destinations across India</p>
              <div className="grid grid-cols-2 gap-2 mt-4">
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
                  onClick={() => setQuery("Kerala")}
                  className="p-2 text-left rounded-md hover:bg-accent/10"
                >
                  <p className="font-medium">Kerala</p>
                  <p className="text-xs">Backwaters</p>
                </button>
                <button 
                  onClick={() => setQuery("Goa")}
                  className="p-2 text-left rounded-md hover:bg-accent/10"
                >
                  <p className="font-medium">Goa</p>
                  <p className="text-xs">Beaches</p>
                </button>
              </div>
            </div>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;

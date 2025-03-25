
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const SearchBar = ({ className }: { className?: string }) => {
  const [activeTab, setActiveTab] = useState('location');
  
  const tabs = [
    { id: 'location', label: 'Where', icon: MapPin },
    { id: 'dates', label: 'When', icon: Calendar },
    { id: 'guests', label: 'Who', icon: Users },
  ];

  return (
    <div className={cn(
      "glass rounded-full p-2 max-w-3xl w-full mx-auto shadow-sm animate-scale-in",
      className
    )}>
      <div className="flex items-center">
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
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
                  {tab.id === 'location' && 'Anywhere'}
                  {tab.id === 'dates' && 'Any week'}
                  {tab.id === 'guests' && 'Add guests'}
                </span>
              </div>
            </button>
            
            {index < tabs.length - 1 && (
              <div className="h-8 w-px bg-gray-200 mx-1"></div>
            )}
          </React.Fragment>
        ))}

        <button 
          className="bg-accent hover:bg-accent/90 text-white p-4 rounded-full flex items-center justify-center transition-all focus-ring ml-2"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

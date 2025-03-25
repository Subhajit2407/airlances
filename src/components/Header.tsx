
import React, { useEffect, useState } from 'react';
import { Search, User, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-5 transition-all duration-300",
        scrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-4" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a 
            href="/" 
            className="font-semibold text-xl text-primary transition-all duration-200 hover:opacity-80"
          >
            <span className="text-accent">air</span>place
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-sm font-medium hover:text-accent transition-all duration-200">Home</a>
          <a href="#" className="text-sm font-medium hover:text-accent transition-all duration-200">Places</a>
          <a href="#" className="text-sm font-medium hover:text-accent transition-all duration-200">Experiences</a>
          <a href="#" className="text-sm font-medium hover:text-accent transition-all duration-200">About</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-all focus-ring">
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-100 transition-all focus-ring">
            <User className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-all focus-ring"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 animate-fade-in">
          <div className="py-4 px-6 space-y-3">
            <a href="/" className="block py-2 text-sm font-medium hover:text-accent transition-all duration-200">Home</a>
            <a href="#" className="block py-2 text-sm font-medium hover:text-accent transition-all duration-200">Places</a>
            <a href="#" className="block py-2 text-sm font-medium hover:text-accent transition-all duration-200">Experiences</a>
            <a href="#" className="block py-2 text-sm font-medium hover:text-accent transition-all duration-200">About</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

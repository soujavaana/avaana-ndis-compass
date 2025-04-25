
import React from 'react';
import { BellIcon, UserIcon, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navigate = useNavigate();
  
  const handleManagerClick = () => {
    navigate('/communication');
  };

  return (
    <header className="w-full bg-[#F4F4F0] px-3 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between border-b gap-2 md:gap-0 shadow-sm">
      <div className="w-full md:max-w-md">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-8 h-9 bg-gray-50 border-gray-200 focus:border-[#2DCE89] focus:ring-[#2DCE89]"
          />
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3 md:gap-6">
        <div className="hidden md:flex items-center">
          <span className="text-gray-500 mr-2 text-sm">Application Manager:</span>
          <button 
            onClick={handleManagerClick} 
            className="text-sm font-normal hover:text-[#2DCE89] transition-colors"
          >
            Monique Wilson
          </button>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <BellIcon size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <UserIcon size={18} />
        </Button>
      </div>
    </header>
  );
};

export default Header;

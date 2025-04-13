
import React from 'react';
import { BellIcon, UserIcon, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  const handleManagerClick = () => {
    navigate('/communication');
  };

  return (
    <header className="w-full bg-white px-3 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between border-b gap-2 md:gap-0">
      <div className="w-full md:max-w-md">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="search" 
            placeholder="Search documents..." 
            className="bg-gray-100 pl-8 h-9"
          />
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3 md:gap-6">
        <div className="hidden md:flex items-center">
          <span className="text-gray-500 mr-2 text-sm">Application Manager:</span>
          <button 
            onClick={handleManagerClick} 
            className="text-sm font-medium hover:text-avaana-primary hover:underline transition-colors"
          >
            Monique Wilson
          </button>
        </div>
        <button className="p-1.5 md:p-2 rounded-full hover:bg-gray-100">
          <BellIcon size={18} />
        </button>
        <button className="p-1.5 md:p-2 rounded-full hover:bg-gray-100">
          <UserIcon size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;

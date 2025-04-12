
import React from 'react';
import { BellIcon, UserIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  const handleManagerClick = () => {
    navigate('/communication');
  };

  return (
    <header className="w-full bg-white px-3 md:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between border-b gap-3 md:gap-0">
      <div className="w-full md:max-w-md">
        <Input 
          type="search" 
          placeholder="Search documents..." 
          className="bg-gray-100"
        />
      </div>
      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3 md:gap-6">
        <div className="hidden md:flex items-center">
          <span className="text-gray-500 mr-2">Application Manager:</span>
          <button 
            onClick={handleManagerClick} 
            className="font-medium hover:text-avaana-primary hover:underline transition-colors"
          >
            Monique Wilson
          </button>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <BellIcon size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <UserIcon size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;

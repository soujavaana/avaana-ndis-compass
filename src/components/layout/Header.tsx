
import React from 'react';
import { BellIcon, UserIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="w-full bg-white px-6 py-4 flex items-center justify-between border-b">
      <div className="w-full max-w-md">
        <Input 
          type="search" 
          placeholder="Search documents..." 
          className="bg-gray-100"
        />
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Application Manager:</span>
          <span className="font-medium">Monique Wilson</span>
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

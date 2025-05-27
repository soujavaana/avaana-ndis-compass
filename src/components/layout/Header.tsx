
import React from 'react';
import { BellIcon, UserIcon, SearchIcon, MapPinIcon, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define the minimal profile data type
interface ProfileData {
  id?: string;
  first_name?: string | null;
  last_name?: string | null;
  business_name?: string | null;
  entity_type?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
}

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  // Fetch current user's profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user) {
          // Get profile data
          const {
            data,
            error
          } = await supabase.from('profiles')
            .select('id, first_name, last_name, business_name, entity_type, address, city, state')
            .eq('id', user.id)
            .single();
            
          if (error) {
            console.error('Error fetching profile:', error);
          } else {
            setProfile(data);
          }
        }
      } catch (error) {
        console.error('Error in fetchProfile:', error);
      }
    };
    fetchProfile();
  }, [user]);
  
  const handleManagerClick = () => {
    navigate('/communication');
  };
  
  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Get user or business name for display
  const displayName = profile?.business_name || 
    (profile?.first_name && profile?.last_name ? `${profile.first_name} ${profile.last_name}` : 
    (user?.email || 'User'));

  // Get location for display
  const location = profile?.city && profile?.state ? `${profile.city}, ${profile.state}` : null;

  return (
    <header className="w-full bg-[#F4F4F0] px-3 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between border-b gap-2 md:gap-0 shadow-sm">
      <div className="w-full md:max-w-md">
        <div className="relative">
          <div className="flex items-center relative">
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-200 focus:border-primary focus:ring-primary"
            />
            <SearchIcon size={18} className="absolute left-3 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3 md:gap-6">
        <div className="hidden md:flex items-center">
          <span className="text-gray-500 mr-2 text-sm">Welcome</span>
          <button onClick={handleManagerClick} className="text-sm font-normal hover:text-primary transition-colors">
            {displayName}
          </button>
          
          {/* Display location if available */}
          {location && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center ml-3 text-gray-500">
                    <MapPinIcon size={14} className="mr-1" />
                    <span className="text-xs">{location}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Business location</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100 text-gray-600">
          <BellIcon size={18} />
        </Button>
        
        {/* User menu dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 text-gray-600">
              <UserIcon size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleProfileClick}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

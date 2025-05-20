import React from 'react';
import { BellIcon, UserIcon, SearchIcon, MapPinIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define the minimal profile data type
interface ProfileData {
  id?: string;
  first_name?: string | null;
  last_name?: string | null;
  business_name?: string | null;
}
const Header = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  // Fetch current user's profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get current user
        const {
          data: {
            user
          }
        } = await supabase.auth.getUser();
        if (user) {
          // Get profile data
          const {
            data,
            error
          } = await supabase.from('profiles').select('id, first_name, last_name, business_name').eq('id', user.id).single();
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
  }, []);
  const handleManagerClick = () => {
    navigate('/communication');
  };

  // Get user or business name for display
  const displayName = profile?.first_name && profile?.last_name ? `${profile.first_name} ${profile.last_name}` : profile?.business_name || 'Monique Wilson'; // Default if no profile data

  return <header className="w-full bg-[#F4F4F0] px-3 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between border-b gap-2 md:gap-0 shadow-sm">
      <div className="w-full md:max-w-md">
        <div className="relative">
          
          
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3 md:gap-6">
        <div className="hidden md:flex items-center">
          <span className="text-gray-500 mr-2 text-sm">Welcome</span>
          <button onClick={handleManagerClick} className="text-sm font-normal hover:text-[#2DCE89] transition-colors">
            {displayName}
          </button>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <BellIcon size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <UserIcon size={18} />
        </Button>
      </div>
    </header>;
};
export default Header;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  ClipboardCheck, 
  FileText, 
  ShieldCheck, 
  MessageSquare, 
  Users,
  Flag,
  BarChart,
  Calculator,
  Settings,
  Network
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Profile', icon: User, path: '/profile' },
  { name: 'Registrations', icon: ClipboardCheck, path: '/registrations' },
  { name: 'Documents', icon: FileText, path: '/documents' },
  { name: 'Compliance', icon: ShieldCheck, path: '/compliance' },
  { name: 'Participants', icon: Users, path: '/participants' },
  { name: 'Business Goals', icon: Flag, path: '/business-goals' },
  { name: 'Tax & Accounting', icon: Calculator, path: '/tax-accounting' },
  { name: 'Networking', icon: Network, path: '/networking' },
  { name: 'Messages', icon: MessageSquare, path: '/communication', badge: 2 },
  { name: 'Analytics', icon: BarChart, path: '/analytics' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-avaana-primary text-white flex flex-col overflow-hidden">
      <div className="p-3 sm:p-4 border-b border-white/10 flex flex-col items-center">
        <img 
          src="https://ndis.avaana.com.au/wp-content/uploads/2024/09/Avaana-logo-colourmix.svg" 
          alt="Avaana Logo" 
          className="h-6 sm:h-8 mb-1" 
        />
        <h1 className="text-base sm:text-lg font-medium">Dashboard</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-2 sm:py-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 hover:bg-avaana-secondary transition-colors relative ${
                  location.pathname === item.path ? 'bg-avaana-secondary' : ''
                }`}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <span className="text-sm whitespace-nowrap">{item.name}</span>
                {item.badge && (
                  <span className="absolute right-3 sm:right-6 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

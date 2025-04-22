
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
  Network,
  Pin
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
    <div className="h-screen w-64 bg-[#0B4A3B] text-white flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2 px-2 py-1.5 bg-white/10 rounded-md mb-2">
          <Pin size={16} />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium truncate">Kamal Test</h3>
            <p className="text-xs text-white/70 truncate">Surry Hills</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-0.5 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors relative
                  ${location.pathname === item.path 
                    ? 'bg-white/15 text-white' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <span className="text-sm">{item.name}</span>
                {item.badge && (
                  <span className="absolute right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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

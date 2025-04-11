
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
  Settings 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Your Profile', icon: User, path: '/profile' },
  { name: 'Your Registrations', icon: ClipboardCheck, path: '/registrations' },
  { name: 'Your Documents', icon: FileText, path: '/documents' },
  { name: 'Compliance', icon: ShieldCheck, path: '/compliance' },
  { name: 'Participants', icon: Users, path: '/participants' },
  { name: 'Business Goals', icon: Flag, path: '/business-goals' },
  { name: 'Messages', icon: MessageSquare, path: '/communication', badge: 2 },
  { name: 'Analytics', icon: BarChart, path: '/analytics' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-avaana-primary text-white flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/eb0ab4e0-8f8d-4a73-bdd3-3cd47db54801.png" 
            alt="Avaana Logo" 
            className="h-8" 
          />
          <h1 className="text-lg font-medium">Business Dashboard</h1>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 hover:bg-avaana-secondary transition-colors relative ${
                  location.pathname === item.path ? 'bg-avaana-secondary' : ''
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
                {item.badge && (
                  <span className="absolute right-6 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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

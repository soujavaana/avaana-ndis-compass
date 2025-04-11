
import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <div className="h-screen w-64 bg-avaana-primary text-white flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center space-x-2">
        <div className="bg-white text-avaana-primary font-bold rounded-lg p-1 text-sm">AVAANA</div>
        <h1 className="text-lg font-medium">Business Dashboard</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-6 py-3 hover:bg-avaana-secondary transition-colors relative"
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

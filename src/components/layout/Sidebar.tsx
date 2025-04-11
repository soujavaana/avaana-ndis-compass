
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  ShieldCheck, 
  MessageSquare, 
  BarChart, 
  Settings 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Documents', icon: FileText, path: '/documents' },
  { name: 'Compliance', icon: ShieldCheck, path: '/compliance' },
  { name: 'Communication', icon: MessageSquare, path: '/communication' },
  { name: 'Analytics', icon: BarChart, path: '/analytics' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-avaana-primary text-white flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h1 className="text-2xl font-bold">AVAANA NDIS</h1>
      </div>
      <nav className="flex-1">
        <ul className="py-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-6 py-4 hover:bg-avaana-secondary transition-colors"
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

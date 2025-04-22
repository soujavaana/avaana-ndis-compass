import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  ClipboardCheck, 
  FileText, 
  ShieldCheck, 
  Flag,
  MessageSquare
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Profile', icon: User, path: '/profile' },
  { name: 'Registrations', icon: ClipboardCheck, path: '/registrations' },
  { name: 'Documents', icon: FileText, path: '/documents' },
  { name: 'Compliance', icon: ShieldCheck, path: '/compliance' },
  { name: 'Messages', icon: MessageSquare, path: '/communication' },
  { name: 'Business Goals', icon: Flag, path: '/business-goals' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-white text-[#333333] flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-md mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium truncate">Kamal Test</h3>
            <p className="text-xs text-gray-600 truncate">Surry Hills</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-0.5 px-2">
          {navItems.map((item) => (
            <li key={item.name} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link flex items-center justify-start text-center w-full 
                  text-[16px] leading-[24px] cursor-pointer px-[14px] py-[6px] gap-[14px] 
                  relative no-underline whitespace-nowrap
                  ${location.pathname === item.path 
                    ? 'bg-gray-100 text-[#333333]' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#333333]'}`}
              >
                <item.icon size={18} className="flex-shrink-0" />
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

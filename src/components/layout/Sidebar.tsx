
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TestTube, 
  Shield, 
  FileText, 
  Settings,
  Network,
  FileText as FilePolicies,
  ShieldCheck,
  Database,
  Report,
  Users
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mainNavItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Tests', icon: TestTube, path: '/tests' },
  { 
    name: 'Compliance', 
    icon: Shield, 
    path: '/compliance',
    subItems: [
      { name: 'Frameworks', path: '/compliance/frameworks' },
      { name: 'Controls', path: '/compliance/controls' },
      { name: 'Policies', path: '/compliance/policies' },
      { name: 'Evidence Tasks', path: '/compliance/evidence-tasks' },
      { name: 'Cloud', path: '/compliance/cloud' },
      { name: 'Vault', path: '/compliance/vault' }
    ]
  },
  { 
    name: 'Risk', 
    icon: ShieldCheck, 
    path: '/risk',
    subItems: [
      { name: 'Vendors', path: '/risk/vendors' },
      { name: 'Risk Management', path: '/risk/management' },
    ]
  },
  { 
    name: 'Trust', 
    icon: Shield, 
    path: '/trust',
    subItems: [
      { name: 'Trust Vault', path: '/trust/vault' }
    ]
  },
  { 
    name: 'Audit', 
    icon: FileText, 
    path: '/audit',
    subItems: [
      { name: 'Audit Center', path: '/audit/center' },
      { name: 'Corrective Action', path: '/audit/corrective-action' }
    ]
  },
  { 
    name: 'People', 
    icon: Users, 
    path: '/people',
    subItems: [
      { name: 'Employees', path: '/people/employees' },
      { name: 'Training Campaigns', path: '/people/training' }
    ]
  },
  { name: 'Product Updates', icon: FileText, path: '/product-updates' },
  { name: 'Settings', icon: Settings, path: '/settings' },
  { name: 'Integrations', icon: Network, path: '/integrations' },
  { name: 'Reports', icon: Report, path: '/reports' },
  { name: 'Networking', icon: Network, path: '/networking' },
  { name: 'Profile', icon: Users, path: '/profile' },
  { name: 'Business Goals', icon: FilePolicies, path: '/business-goals' },
  { name: 'Documents', icon: FileText, path: '/documents' },
  { name: 'Registrations', icon: Database, path: '/registrations' },
  { name: 'Communication', icon: FileText, path: '/communication' },
];

const Sidebar = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isSubActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-screen w-64 bg-white text-[#333333] flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-md mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium truncate">Happy Horizons NDIS</h3>
            <p className="text-xs text-gray-600 truncate">Automation Services</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-0.5 px-2">
          {mainNavItems.map((item) => (
            <li key={item.name} className="nav-item relative">
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={`nav-link flex items-center justify-between w-full 
                      text-[16px] leading-[24px] cursor-pointer px-[14px] py-[6px] gap-[14px] 
                      relative no-underline whitespace-nowrap
                      ${isActive(item.path) 
                        ? 'bg-gray-100 text-[#333333]' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#333333]'}`}
                  >
                    <div className="flex items-center gap-[14px]">
                      <item.icon size={18} className="flex-shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    <svg 
                      width="12" 
                      height="12" 
                      viewBox="0 0 12 12" 
                      className={`transform transition-transform ${expandedItems.includes(item.name) ? 'rotate-180' : ''}`}
                    >
                      <path
                        fill="currentColor"
                        d="M6 8L1 3h10z"
                      ></path>
                    </svg>
                  </button>
                  
                  {expandedItems.includes(item.name) && (
                    <ul className="mt-1 ml-7 space-y-1">
                      {item.subItems.map(subItem => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.path}
                            className={`block text-[14px] py-[5px] px-[14px] rounded-md
                              ${isSubActive(subItem.path)
                                ? 'text-[#333333] font-medium'
                                : 'text-gray-600 hover:text-[#333333]'}`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`nav-link flex items-center justify-start text-center w-full 
                    text-[16px] leading-[24px] cursor-pointer px-[14px] py-[6px] gap-[14px] 
                    relative no-underline whitespace-nowrap
                    ${isActive(item.path) 
                      ? 'bg-gray-100 text-[#333333]' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#333333]'}`}
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  <span>{item.name}</span>
                  {item.notification && (
                    <Badge 
                      variant="destructive" 
                      className="absolute right-2 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center rounded-full p-0 text-[10px]"
                    >
                      {item.notification}
                    </Badge>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardCheck, ShieldCheck, FileText, Network, MessageSquare, Users, Boxes, AlertTriangle, Lock, FileSearch, BriefcaseBusiness } from 'lucide-react';

const mainNavItems = [{
  name: 'Home',
  icon: LayoutDashboard,
  path: '/'
}, {
  name: 'Business Profile',
  icon: Users,
  path: '/profile'
}, {
  name: 'Registrations',
  icon: Boxes,
  path: '/registrations'
}, {
  name: 'Documents',
  icon: FileText,
  path: '/documents'
}, {
  name: 'Communication',
  icon: MessageSquare,
  path: '/communication',
  badge: '1'
}, {
  name: 'Networking',
  icon: Network,
  path: '/networking'
}, {
  name: 'Business Goals',
  icon: BriefcaseBusiness,
  path: '/business-goals'
}, {
  name: 'Tests',
  icon: ClipboardCheck,
  path: '/tests'
}, {
  name: 'Compliance',
  icon: ShieldCheck,
  path: '/compliance',
  subItems: [{
    name: 'Frameworks',
    path: '/compliance/frameworks'
  }, {
    name: 'Controls',
    path: '/compliance/controls'
  }, {
    name: 'Policies',
    path: '/compliance/policies'
  }, {
    name: 'Evidence Tasks',
    path: '/compliance/evidence-tasks'
  }, {
    name: 'Cloud',
    path: '/compliance/cloud'
  }, {
    name: 'Vault',
    path: '/compliance/vault'
  }]
}, {
  name: 'Risk',
  icon: AlertTriangle,
  path: '/risk',
  subItems: [{
    name: 'Vendors',
    path: '/risk/vendors'
  }, {
    name: 'Risk Management',
    path: '/risk/management'
  }]
}, {
  name: 'Trust',
  icon: Lock,
  path: '/trust',
  subItems: [{
    name: 'Trust Vault',
    path: '/trust/vault'
  }]
}, {
  name: 'Audit',
  icon: FileSearch,
  path: '/audit',
  subItems: [{
    name: 'Audit Center',
    path: '/audit/center'
  }, {
    name: 'Corrective Action',
    path: '/audit/corrective-action'
  }]
}, {
  name: 'People',
  icon: Users,
  path: '/people',
  subItems: [{
    name: 'Employees',
    path: '/people/employees'
  }, {
    name: 'Training Campaigns',
    path: '/people/training'
  }]
}];

const Sidebar = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  React.useEffect(() => {
    const currentPath = location.pathname;

    // Find all parent items that have a matching subpath
    const parentItems = mainNavItems.filter(item => item.subItems?.some(subItem => currentPath.startsWith(subItem.path)));

    // Add all parent names to expandedItems
    const parentNames = parentItems.map(item => item.name);
    setExpandedItems(prev => {
      const newExpandedItems = new Set([...prev, ...parentNames]);
      return Array.from(newExpandedItems);
    });
  }, [location.pathname]);
  const toggleExpand = (name: string) => {
    setExpandedItems(prev => prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]);
  };
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  const isSubActive = (path: string) => {
    return location.pathname === path;
  };
  return <div className="h-screen w-64 bg-[#F4F4F0] text-[#333333] flex flex-col overflow-hidden font-avenir">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-md mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium truncate">Avaana NDIS Dashboard</h3>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-0.5 px-2">
          {mainNavItems.map(item => <li key={item.name} className="nav-item relative">
              {item.subItems ? <div>
                  <button onClick={() => toggleExpand(item.name)} className={`nav-link flex items-center justify-between w-full 
                      text-[16px] leading-[24px] cursor-pointer px-[14px] py-[6px] gap-[14px] 
                      relative no-underline whitespace-nowrap
                      ${isActive(item.path) ? 'bg-[#063e3b] text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-[#333333]'}`}>
                    <div className="flex items-center gap-[14px]">
                      <item.icon size={18} className="flex-shrink-0" />
                      <span className="text-lg">{item.name}</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 12 12" className={`transform transition-transform ${expandedItems.includes(item.name) ? 'rotate-180' : ''}`}>
                      <path fill="currentColor" d="M6 8L1 3h10z"></path>
                    </svg>
                  </button>
                  
                  {expandedItems.includes(item.name) && <ul className="mt-1 ml-7 space-y-1">
                      {item.subItems.map(subItem => <li key={subItem.name}>
                          <Link to={subItem.path} className={`block text-[14px] py-[5px] px-[14px] rounded-md
                              ${isSubActive(subItem.path) ? 'bg-[#063e3b] text-white' : 'text-gray-600 hover:text-[#333333]'}`}>
                            {subItem.name}
                          </Link>
                        </li>)}
                    </ul>}
                </div> : <Link to={item.path} className={`nav-link flex items-center justify-start text-center w-full 
                    text-[16px] leading-[24px] cursor-pointer px-[14px] py-[6px] gap-[14px] 
                    relative no-underline whitespace-nowrap
                    ${isActive(item.path) ? 'bg-[#063e3b] text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-[#333333]'}`}>
                  <item.icon size={18} className="flex-shrink-0" />
                  <span className="text-lg">{item.name}</span>
                  {item.badge && <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {item.badge}
                    </span>}
                </Link>}
            </li>)}
        </ul>
      </nav>
    </div>;
};
export default Sidebar;

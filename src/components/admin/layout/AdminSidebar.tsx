
import React from 'react';
import { NavLink, useSearchParams, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import Logo from '@/components/logo/Logo';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  tabParam?: string;
}

interface AdminSidebarProps {
  items: NavigationItem[];
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  items, 
  isOpen, 
  toggleSidebar 
}) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const currentTab = searchParams.get('tab') || 'overview';
  
  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="h-full flex flex-col">
        {/* Sidebar header */}
        <div className="flex items-center justify-center h-16 border-b">
          <Logo size="sm" />
          <span className="ml-2 text-sm font-semibold">Admin Console</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {items.map((item) => {
            // For dashboard with tabs, check if the current tab matches
            let isActive = false;
            
            if (location.pathname === item.href && item.tabParam) {
              isActive = currentTab === item.tabParam;
            } else {
              isActive = location.pathname === item.href;
            }
            
            const to = item.tabParam ? `${item.href}?tab=${item.tabParam}` : item.href;
            
            return (
              <NavLink
                key={item.name}
                to={to}
                className={({ isActive: linkActive }) => cn(
                  "flex items-center px-4 py-3 text-sm rounded-md",
                  (isActive || linkActive) ? 
                    "bg-brand-teal-light text-brand-teal" : 
                    "text-gray-700 hover:bg-gray-100"
                )}
                end={!item.tabParam}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
        
        {/* Sidebar footer */}
        <div className="p-4 border-t">
          <p className="text-xs text-gray-500">
            © 2025 Renewable Energy Consultancy
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;


import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AdminSidebar from './AdminSidebar';
import {
  LayoutDashboard,
  Users,
  FileText,
  List,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, tabParam: 'overview' },
    { name: 'Users', href: '/admin', icon: Users, tabParam: 'users' },
    { name: 'Requests', href: '/admin', icon: FileText, tabParam: 'requests' },
    { name: 'Projects', href: '/admin', icon: List, tabParam: 'projects' },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleSidebar}
            className="bg-white shadow-sm"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        
        {/* Sidebar */}
        <AdminSidebar 
          items={navigationItems}
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        
        {/* Main content */}
        <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
          <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Admin Portal</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {user?.profile?.name || 'Admin'}
              </span>
            </div>
          </div>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

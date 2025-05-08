
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from '@/components/ui/tabs';
import { LayoutDashboard, Users, FileText, List } from 'lucide-react';
import AdminDashboardOverview from './AdminDashboardOverview';
import UserManagement from '../UserManagement';
import ServiceRequestManagement from '../ServiceRequestManagement';
import ProjectManagement from '../ProjectManagement';

const AdminDashboardTabs: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'overview';

  // Update URL query parameter when tab changes
  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <div className="w-full">
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Requests</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="overview" className="space-y-6">
            <AdminDashboardOverview />
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-bold">User Management</h2>
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="requests" className="space-y-6">
            <h2 className="text-2xl font-bold">Service Request Management</h2>
            <ServiceRequestManagement />
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-6">
            <h2 className="text-2xl font-bold">Project Management</h2>
            <ProjectManagement />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminDashboardTabs;

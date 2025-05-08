
import React, { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AdminDashboardTabs from '@/components/admin/dashboard/AdminDashboardTabs';
import { Loader2 } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Set default tab to overview if no tab is specified
  useEffect(() => {
    if (!searchParams.get('tab')) {
      setSearchParams({ tab: 'overview' });
    }
  }, [searchParams, setSearchParams]);
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-brand-teal" />
        <span className="ml-2 text-xl">Loading...</span>
      </div>
    );
  }
  
  // Redirect non-admin users to homepage
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="container py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-3">Admin Dashboard</h1>
        <p className="text-gray-600 font-serif">
          Manage users, service requests, and projects
        </p>
      </div>
      
      <AdminDashboardTabs />
    </div>
  );
};

export default AdminDashboardPage;

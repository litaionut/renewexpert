import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Clock, CheckCircle, Plus } from 'lucide-react';
import { ProjectStatus } from '@/types';
import { mockProjects } from '@/data/mock-data';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Filter projects based on user role
  const userProjects = mockProjects.filter(project => 
    user?.profile?.role === 'client' ? project.clientId === user.id : project.expertId === user.id
  );

  const activeProjects = userProjects.filter(
    project => project.status !== 'completed' && project.status !== 'cancelled'
  );
  const completedProjects = userProjects.filter(project => project.status === 'completed');

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'review':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <Clock className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="container py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h1 className="text-4xl font-serif mb-3">My Dashboard</h1>
          <p className="text-gray-600 font-serif">
            Welcome back, {user?.profile?.name || 'User'}
          </p>
        </div>
        
        <Button variant="outline" className="mt-4 md:mt-0 rounded-none border-gray-400" asChild>
          <Link to="/service-request">
            <Plus className="mr-2 h-4 w-4" /> New Service Request
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="rounded-none border-gray-200 hover:border-gray-300 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-serif">{activeProjects.length}</CardTitle>
            <CardDescription className="text-gray-600">Active Projects</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="rounded-none border-gray-200 hover:border-gray-300 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-serif">{completedProjects.length}</CardTitle>
            <CardDescription className="text-gray-600">Completed Projects</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="rounded-none border-gray-200 hover:border-gray-300 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-serif">{user?.role === 'expert' ? '7' : '0'}</CardTitle>
            <CardDescription className="text-gray-600">Pending Requests</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="space-y-16">
        <div>
          <h2 className="text-2xl font-serif mb-8 pb-2 border-b border-gray-200">Active Projects</h2>
          {activeProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeProjects.map(project => (
                <Card key={project.id} className="rounded-none border-gray-200 hover:border-gray-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-serif text-lg">{project.title}</h3>
                      <div className="flex items-center space-x-2 text-sm">
                        {getStatusIcon(project.status)}
                        <span className="text-gray-600 capitalize">{project.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-2">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <div>Due: {project.dueDate}</div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900" asChild>
                        <Link to={`/projects/${project.id}`}>
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="rounded-none border-gray-200">
              <CardContent className="p-12 text-center">
                <p className="text-gray-600 mb-6">You don't have any active projects.</p>
                <Button asChild variant="outline" className="rounded-none border-gray-400">
                  <Link to="/service-request">Create a Service Request</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-serif mb-8 pb-2 border-b border-gray-200">Recently Completed</h2>
          {completedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {completedProjects.map(project => (
                <Card key={project.id} className="rounded-none border-gray-200 hover:border-gray-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-serif text-lg">{project.title}</h3>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-600">Completed</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-2">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <div>Completed: {project.completedDate}</div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900" asChild>
                        <Link to={`/projects/${project.id}`}>
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="rounded-none border-gray-200">
              <CardContent className="p-12 text-center">
                <p className="text-gray-600">No completed projects yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

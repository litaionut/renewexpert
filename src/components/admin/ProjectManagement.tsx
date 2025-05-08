
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { List, Clock, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import type { ServiceRequest } from './quote/types';
import { Database } from '@/integrations/supabase/types';

// Define the status type based on the database enum
type RequestStatus = Database['public']['Enums']['request_status'];

const ProjectManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<RequestStatus | 'all'>('all');

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', activeFilter, searchQuery],
    queryFn: async () => {
      // Fetch only approved service requests that are now considered "projects"
      let query = supabase
        .from('service_requests')
        .select(`
          *,
          profiles:client_id (name)
        `)
        .in('status', ['approved', 'in_progress', 'completed'])
        .order('created_at', { ascending: false });
      
      // Apply status filter if not "all"
      if (activeFilter !== 'all') {
        query = query.eq('status', activeFilter);
      }
      
      // Apply search query if provided
      if (searchQuery) {
        query = query.ilike('project_name', `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching projects",
          description: error.message
        });
        throw error;
      }
      
      return data as unknown as ServiceRequest[];
    },
  });

  const filterOptions = [
    { label: 'All', value: 'all' as 'all' },
    { label: 'Approved', value: 'approved' as RequestStatus },
    { label: 'In Progress', value: 'in_progress' as RequestStatus },
    { label: 'Completed', value: 'completed' as RequestStatus }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8"><Clock className="h-8 w-8 animate-spin text-brand-teal" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="h-5 w-5" />
          Active Projects
        </CardTitle>
        <CardDescription>
          Manage ongoing and completed projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="w-full md:w-[300px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="hidden sm:flex"
              title="Advanced filters"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map(option => (
              <Badge 
                key={option.value}
                variant={activeFilter === option.value ? "default" : "outline"} 
                className="cursor-pointer" 
                onClick={() => setActiveFilter(option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.project_name}</TableCell>
                <TableCell>{project.profiles?.name || 'Unknown'}</TableCell>
                <TableCell>{project.service_type}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(project.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/projects/${project.id}`)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {(!projects || projects.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  {searchQuery ? 'No projects match your search' : 'No active projects found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProjectManagement;

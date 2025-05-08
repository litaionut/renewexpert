
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import type { ServiceRequest } from './quote/types';
import { Database } from '@/integrations/supabase/types';

// Define the status type based on the database enum
type RequestStatus = Database['public']['Enums']['request_status'];

const ServiceRequestManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<RequestStatus>('pending');

  const { data: requests, isLoading } = useQuery({
    queryKey: ['service-requests', activeFilter],
    queryFn: async () => {
      const query = supabase
        .from('service_requests')
        .select(`
          *,
          profiles:client_id (name)
        `)
        .order('created_at', { ascending: false });
      
      // Filter service requests based on the active filter
      // Only show pending and quoted requests here, projects are handled in ProjectManagement
      if (activeFilter !== 'all' as any) {
        query.eq('status', activeFilter);
      } else {
        query.in('status', ['pending', 'quoted', 'rejected']);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching service requests",
          description: error.message
        });
        throw error;
      }
      
      return data as unknown as ServiceRequest[];
    },
  });

  const filterOptions = [
    { label: 'All', value: 'all' as any },
    { label: 'Pending', value: 'pending' as RequestStatus },
    { label: 'Quoted', value: 'quoted' as RequestStatus },
    { label: 'Rejected', value: 'rejected' as RequestStatus }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'quoted':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
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
          <FileText className="h-5 w-5" />
          Service Requests
        </CardTitle>
        <CardDescription>
          Review and manage incoming service requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
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
            {requests?.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.project_name}</TableCell>
                <TableCell>{request.profiles?.name || 'Unknown'}</TableCell>
                <TableCell>{request.service_type}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(request.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/requests/${request.id}`)}
                  >
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {(!requests || requests.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No service requests matching the selected filter
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ServiceRequestManagement;

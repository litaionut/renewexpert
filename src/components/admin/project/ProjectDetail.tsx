
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Clipboard, 
  MessageSquare, 
  FileText, 
  BarChart,
  Clock 
} from 'lucide-react';
import { Database } from '@/integrations/supabase/types';
import ProjectHeader from './ProjectHeader';
import ProjectDetailsTab from './tabs/ProjectDetailsTab';
import ProjectMessagesTab from './tabs/ProjectMessagesTab';
import ProjectDocumentsTab from './tabs/ProjectDocumentsTab';
import ProjectTimelineTab from './tabs/ProjectTimelineTab';

interface ProjectDetailProps {
  projectId: string;
}

// Define the RequestStatus type based on the database enum
type RequestStatus = Database['public']['Enums']['request_status'];

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { data: project, isLoading, refetch } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      // Update the query to be more specific with the joins
      const { data, error } = await supabase
        .from('service_requests')
        .select(`
          *,
          client:profiles!service_requests_client_id_fkey(id, name),
          expert:profiles!service_requests_expert_id_fkey(id, name)
        `)
        .eq('id', projectId)
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching project",
          description: error.message
        });
        throw error;
      }
      
      // Transform the data to match the expected ProjectInfo structure
      const transformedData = {
        ...data,
        client: data.client ? data.client[0] : null,
        expert: data.expert ? data.expert[0] : null
      };
      
      return transformedData;
    },
  });

  const handleStatusChange = async (newStatus: RequestStatus) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('service_requests')
        .update({ status: newStatus })
        .eq('id', projectId);

      if (error) throw error;
      
      toast({
        title: "Status updated",
        description: `Project status updated to ${newStatus.replace('_', ' ')}`
      });
      
      refetch();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating status",
        description: error.message
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8"><Clock className="h-8 w-8 animate-spin text-brand-teal" /></div>;
  }

  if (!project) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium">Project not found</h3>
        <p className="text-sm text-muted-foreground mt-2">
          The requested project could not be found or you don't have permission to view it.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProjectHeader 
        project={project} 
        isUpdating={isUpdating} 
        onStatusChange={handleStatusChange} 
      />
      
      <Tabs defaultValue="details">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="details" className="flex items-center gap-2">
            <Clipboard className="h-4 w-4" />
            <span className="hidden sm:inline">Details</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Messages</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-4">
          <ProjectDetailsTab project={project} />
        </TabsContent>
        
        <TabsContent value="messages" className="mt-4">
          <ProjectMessagesTab projectId={project.id} />
        </TabsContent>
        
        <TabsContent value="documents" className="mt-4">
          <ProjectDocumentsTab projectId={project.id} attachments={project.attachments} />
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-4">
          <ProjectTimelineTab created_at={project.created_at} status={project.status} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;

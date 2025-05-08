
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Calendar, 
  MapPin, 
  Flag,
} from 'lucide-react';
import ProjectStatusUpdate from './ProjectStatusUpdate';
import { Button } from '@/components/ui/button';
import { Database } from '@/integrations/supabase/types';

// Define the RequestStatus type based on the database enum
type RequestStatus = Database['public']['Enums']['request_status'];

interface ProjectInfo {
  id: string;
  project_name: string;
  service_type: string;
  project_type: string;
  status: RequestStatus;
  created_at: string;
  deadline?: string | null;
  project_location?: string | null;
  urgency: string;
  farm_size: number;
  client?: {
    id: string;
    name: string;
  } | null;
  expert?: {
    id: string;
    name: string;
  } | null;
  expert_id?: string | null;
}

interface ProjectHeaderProps {
  project: ProjectInfo;
  isUpdating: boolean;
  onStatusChange: (newStatus: RequestStatus) => Promise<void>;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ 
  project, 
  isUpdating,
  onStatusChange 
}) => {
  // Calculate progress based on status
  const getProgressPercentage = (status: string) => {
    switch(status) {
      case 'approved':
        return 25;
      case 'in_progress':
        return 50;
      case 'completed':
        return 100;
      default:
        return 0;
    }
  };

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

  // Extract client and expert data safely
  const clientName = project.client?.name || 'Unknown';
  const expertName = project.expert?.name || 'Not Assigned';
  const hasExpert = !!project.expert_id;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl">{project.project_name}</CardTitle>
            <CardDescription className="mt-1">
              {project.service_type} - {project.project_type}
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={getStatusColor(project.status)}>
              {project.status.replace('_', ' ')}
            </Badge>
            <ProjectStatusUpdate 
              currentStatus={project.status} 
              onStatusChange={onStatusChange}
              isUpdating={isUpdating}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Project Progress</h3>
            <Progress value={getProgressPercentage(project.status)} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Approved</span>
              <span>In Progress</span>
              <span>Completed</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Client: {clientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Created: {new Date(project.created_at).toLocaleDateString()}</span>
              </div>
              {project.deadline && (
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Expert: {expertName}
                  {!hasExpert && (
                    <Button variant="outline" size="sm" className="ml-2">
                      Assign
                    </Button>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Location: {project.project_location || 'Not specified'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Urgency: {project.urgency}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectHeader;

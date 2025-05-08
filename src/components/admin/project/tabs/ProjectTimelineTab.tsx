
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Database } from '@/integrations/supabase/types';

// Define the RequestStatus type based on the database enum
type RequestStatus = Database['public']['Enums']['request_status'];

interface ProjectTimelineTabProps {
  created_at: string;
  status: RequestStatus;
}

const ProjectTimelineTab: React.FC<ProjectTimelineTabProps> = ({ created_at, status }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <div>
              <h4 className="text-sm font-medium">Project Created</h4>
              <p className="text-xs text-muted-foreground">{new Date(created_at).toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            </div>
            <div>
              <h4 className="text-sm font-medium">Project Approved</h4>
              <p className="text-xs text-muted-foreground">
                {status === 'approved' || status === 'in_progress' || status === 'completed' 
                  ? 'Project has been approved' 
                  : 'Pending approval'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className={`h-2 w-2 rounded-full ${status === 'in_progress' || status === 'completed' ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
            </div>
            <div>
              <h4 className="text-sm font-medium">In Progress</h4>
              <p className="text-xs text-muted-foreground">
                {status === 'in_progress' || status === 'completed' 
                  ? 'Work in progress' 
                  : 'Not started yet'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className={`h-2 w-2 rounded-full ${status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            </div>
            <div>
              <h4 className="text-sm font-medium">Completed</h4>
              <p className="text-xs text-muted-foreground">
                {status === 'completed' 
                  ? 'Project completed' 
                  : 'Not completed yet'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTimelineTab;

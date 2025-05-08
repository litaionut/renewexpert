
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ProjectDetailsTabProps {
  project: {
    description: string;
    farm_size: number;
    coordinates?: string | null;
  };
}

const ProjectDetailsTab: React.FC<ProjectDetailsTabProps> = ({ project }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Project Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Description</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {project.description}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Farm Size</h3>
          <p className="text-sm text-muted-foreground">
            {project.farm_size} acres
          </p>
        </div>

        {project.coordinates && (
          <div>
            <h3 className="text-sm font-medium mb-2">Coordinates</h3>
            <p className="text-sm text-muted-foreground">
              {project.coordinates}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectDetailsTab;


import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ProjectMessagesTabProps {
  projectId: string;
}

const ProjectMessagesTab: React.FC<ProjectMessagesTabProps> = ({ projectId }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Message functionality will be implemented in a future update.
        </p>
      </CardContent>
    </Card>
  );
};

export default ProjectMessagesTab;

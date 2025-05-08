
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface ProjectDocumentsTabProps {
  projectId: string;
  attachments?: string[] | null;
}

const ProjectDocumentsTab: React.FC<ProjectDocumentsTabProps> = ({ projectId, attachments }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Project Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {attachments && attachments.length > 0 ? (
            <ul className="space-y-2">
              {attachments.map((attachment: string, index: number) => (
                <li key={index} className="flex items-center gap-2 p-2 border rounded hover:bg-muted">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">{attachment}</span>
                  <Button variant="ghost" size="sm" className="ml-auto">View</Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No documents attached to this project.
            </p>
          )}
          
          <Button variant="outline">Upload Document</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDocumentsTab;


import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Loader2 } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

// Define the RequestStatus type based on the database enum
type RequestStatus = Database['public']['Enums']['request_status'];

interface ProjectStatusUpdateProps {
  currentStatus: RequestStatus;
  onStatusChange: (status: RequestStatus) => Promise<void>;
  isUpdating: boolean;
}

const ProjectStatusUpdate: React.FC<ProjectStatusUpdateProps> = ({
  currentStatus,
  onStatusChange,
  isUpdating
}) => {
  // Define available transitions based on current status
  const getAvailableStatuses = (current: RequestStatus) => {
    switch(current) {
      case 'approved':
        return [
          { value: 'in_progress' as RequestStatus, label: 'Start Work', color: 'text-yellow-600' }
        ];
      case 'in_progress':
        return [
          { value: 'completed' as RequestStatus, label: 'Mark Complete', color: 'text-green-600' }
        ];
      case 'completed':
        return [
          { value: 'in_progress' as RequestStatus, label: 'Reopen', color: 'text-yellow-600' }
        ];
      default:
        return [];
    }
  };

  const availableStatuses = getAvailableStatuses(currentStatus);

  if (availableStatuses.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isUpdating}>
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating
            </>
          ) : (
            <>
              Update Status
              <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableStatuses.map((status) => (
          <DropdownMenuItem 
            key={status.value}
            className={`cursor-pointer ${status.color}`}
            onClick={() => onStatusChange(status.value)}
          >
            {status.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectStatusUpdate;

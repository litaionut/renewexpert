
import React from 'react';
import { ServiceRequest } from '../types';

interface RequestDetailsProps {
  request: ServiceRequest;
}

const RequestDetails = ({ request }: RequestDetailsProps) => {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-sm font-medium">Client</p>
        <p className="text-sm text-muted-foreground">{request.profiles?.name || "Unknown"}</p>
      </div>
      <div>
        <p className="text-sm font-medium">Project Type</p>
        <p className="text-sm text-muted-foreground">{request.project_type}</p>
      </div>
      <div>
        <p className="text-sm font-medium">Service Type</p>
        <p className="text-sm text-muted-foreground">{request.service_type}</p>
      </div>
      <div>
        <p className="text-sm font-medium">Farm Size</p>
        <p className="text-sm text-muted-foreground">{request.farm_size} MW</p>
      </div>
      <div>
        <p className="text-sm font-medium">Location</p>
        <p className="text-sm text-muted-foreground">{request.project_location || "Not specified"}</p>
      </div>
      <div>
        <p className="text-sm font-medium">Urgency</p>
        <p className="text-sm text-muted-foreground">{request.urgency}</p>
      </div>
    </div>
  );
};

export default RequestDetails;

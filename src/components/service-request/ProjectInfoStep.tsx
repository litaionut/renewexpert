
import React from 'react';
import { ProjectType, ServiceType } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProjectInfoStepProps {
  formData: {
    projectName: string;
    projectType: ProjectType;
    farmSize: number;
    serviceType: ServiceType;
    description: string;
    coordinates: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const ProjectInfoStep: React.FC<ProjectInfoStepProps> = ({
  formData,
  handleChange,
  handleNumberChange,
  handleSelectChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="projectName">Project Name</Label>
        <Input
          id="projectName"
          name="projectName"
          placeholder="Enter your project name"
          value={formData.projectName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="projectType">Project Type</Label>
        <Select 
          value={formData.projectType} 
          onValueChange={(value) => handleSelectChange('projectType', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wind">Wind Energy</SelectItem>
            <SelectItem value="solar">Solar Energy</SelectItem>
            <SelectItem value="hybrid">Hybrid Project</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="farmSize">Farm Size (MW)</Label>
        <Input
          id="farmSize"
          name="farmSize"
          type="number"
          min="0"
          step="0.1"
          placeholder="Enter farm size in MW"
          value={formData.farmSize || ''}
          onChange={handleNumberChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="serviceType">Study Type</Label>
        <Select 
          value={formData.serviceType} 
          onValueChange={(value) => handleSelectChange('serviceType', value as ServiceType)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select study type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="siteSelection">Site Prospecting & Layout Optimization</SelectItem>
            <SelectItem value="feasibility">Preliminary Evaluation</SelectItem>
            <SelectItem value="assessment">Wind Measurement Campaigns</SelectItem>
            <SelectItem value="dueDiligence">Energy Yield Assessments</SelectItem>
            <SelectItem value="performanceAnalysis">Post-Construction Performance Checks</SelectItem>
            <SelectItem value="other">Other (please specify in description)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Please describe your project and requirements"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
        />
        <p className="text-xs text-muted-foreground">
          Include all relevant details about your project that will help us provide an accurate quote.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="coordinates">Coordinates (Optional)</Label>
        <Input
          id="coordinates"
          name="coordinates"
          placeholder="Latitude, Longitude"
          value={formData.coordinates}
          onChange={handleChange}
        />
        <p className="text-xs text-muted-foreground">
          Optional: You can provide exact coordinates for your project site
        </p>
      </div>
    </div>
  );
};

export default ProjectInfoStep;

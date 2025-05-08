
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ProjectDetailsStepProps {
  formData: {
    description: string;
    coordinates: string;
    deadline: Date | null;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDateChange: (date: Date | null) => void;
}

const ProjectDetailsStep: React.FC<ProjectDetailsStepProps> = ({
  formData,
  handleChange,
  handleDateChange,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Please provide additional details about your project to help us understand your requirements.
      </p>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="description">Project Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe your project in detail..."
            className="min-h-[120px]"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="coordinates">Project Location Coordinates</Label>
          <Input
            id="coordinates"
            name="coordinates"
            placeholder="e.g. 51.5074° N, 0.1278° W"
            value={formData.coordinates}
            onChange={handleChange}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Optional. GPS coordinates for the project location.
          </p>
        </div>
        
        <div>
          <Label htmlFor="deadline">Preferred Completion Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="deadline"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.deadline && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.deadline ? format(formData.deadline, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.deadline || undefined}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground mt-1">
            Optional. When would you like this project to be completed?
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsStep;

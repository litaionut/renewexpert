
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface ServiceRequirementsStepProps {
  formData: {
    deliverables: {
      keyFigures: boolean;
      detailedReport: boolean;
      rawData: boolean;
      presentation: boolean;
    };
    urgency: string;
    paymentOption: string;
  };
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleRadioChange: (name: string, value: string) => void;
}

const ServiceRequirementsStep: React.FC<ServiceRequirementsStepProps> = ({
  formData,
  handleCheckboxChange,
  handleRadioChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Deliverables</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="keyFigures" 
              checked={formData.deliverables.keyFigures}
              onCheckedChange={(checked) => 
                handleCheckboxChange('deliverables.keyFigures', checked === true)
              }
            />
            <div className="space-y-1">
              <Label htmlFor="keyFigures" className="font-normal">Key Figures</Label>
              <p className="text-xs text-muted-foreground">Essential metrics and KPIs for your project</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="detailedReport" 
              checked={formData.deliverables.detailedReport}
              onCheckedChange={(checked) => 
                handleCheckboxChange('deliverables.detailedReport', checked === true)
              }
            />
            <div className="space-y-1">
              <Label htmlFor="detailedReport" className="font-normal">Detailed Report</Label>
              <p className="text-xs text-muted-foreground">Comprehensive analysis with methodology</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="rawData" 
              checked={formData.deliverables.rawData}
              onCheckedChange={(checked) => 
                handleCheckboxChange('deliverables.rawData', checked === true)
              }
            />
            <div className="space-y-1">
              <Label htmlFor="rawData" className="font-normal">Raw Data</Label>
              <p className="text-xs text-muted-foreground">Processed datasets in CSV/Excel format</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="presentation" 
              checked={formData.deliverables.presentation}
              onCheckedChange={(checked) => 
                handleCheckboxChange('deliverables.presentation', checked === true)
              }
            />
            <div className="space-y-1">
              <Label htmlFor="presentation" className="font-normal">Presentation</Label>
              <p className="text-xs text-muted-foreground">Executive summary in presentation format</p>
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <Label>Timeline</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Using div wrappers with onClick instead of RadioGroup for better styling and interaction */}
          <div 
            className={`flex flex-col items-center space-y-2 border rounded-md p-4 cursor-pointer ${formData.urgency === 'urgent' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleRadioChange('urgency', 'urgent')}
          >
            <input 
              type="radio" 
              id="urgency-urgent" 
              name="urgency" 
              value="urgent" 
              checked={formData.urgency === 'urgent'} 
              onChange={() => handleRadioChange('urgency', 'urgent')} 
              className="sr-only"
            />
            <div className={`w-full p-2 rounded-md text-center ${formData.urgency === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100'}`}>
              Urgent
            </div>
            <Label htmlFor="urgency-urgent" className="font-normal text-center">
              <span className="block text-sm">48 hours</span>
              <span className="block text-xs text-muted-foreground mt-1">+50% rush fee</span>
            </Label>
          </div>

          <div 
            className={`flex flex-col items-center space-y-2 border rounded-md p-4 cursor-pointer ${formData.urgency === 'priority' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleRadioChange('urgency', 'priority')}
          >
            <input 
              type="radio" 
              id="urgency-priority" 
              name="urgency" 
              value="priority" 
              checked={formData.urgency === 'priority'} 
              onChange={() => handleRadioChange('urgency', 'priority')} 
              className="sr-only"
            />
            <div className={`w-full p-2 rounded-md text-center ${formData.urgency === 'priority' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100'}`}>
              Priority
            </div>
            <Label htmlFor="urgency-priority" className="font-normal text-center">
              <span className="block text-sm">1 week</span>
              <span className="block text-xs text-muted-foreground mt-1">+25% priority fee</span>
            </Label>
          </div>

          <div 
            className={`flex flex-col items-center space-y-2 border rounded-md p-4 cursor-pointer ${formData.urgency === 'standard' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleRadioChange('urgency', 'standard')}
          >
            <input 
              type="radio" 
              id="urgency-standard" 
              name="urgency" 
              value="standard" 
              checked={formData.urgency === 'standard'} 
              onChange={() => handleRadioChange('urgency', 'standard')} 
              className="sr-only"
            />
            <div className={`w-full p-2 rounded-md text-center ${formData.urgency === 'standard' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
              Standard
            </div>
            <Label htmlFor="urgency-standard" className="font-normal text-center">
              <span className="block text-sm">30 days</span>
              <span className="block text-xs text-muted-foreground mt-1">Standard rate</span>
            </Label>
          </div>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <Label>Payment Option</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Using div wrappers with onClick for better interaction */}
          <div 
            className={`flex flex-col items-center space-y-2 border rounded-md p-4 cursor-pointer ${formData.paymentOption === 'split' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleRadioChange('paymentOption', 'split')}
          >
            <input 
              type="radio" 
              id="payment-split" 
              name="paymentOption" 
              value="split" 
              checked={formData.paymentOption === 'split'} 
              onChange={() => handleRadioChange('paymentOption', 'split')} 
              className="sr-only"
            />
            <div className={`w-full p-2 rounded-md text-center ${formData.paymentOption === 'split' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}>
              Split Payment
            </div>
            <Label htmlFor="payment-split" className="font-normal text-center">
              <span className="block text-sm">50% upfront / 50% on delivery</span>
              <span className="block text-xs text-muted-foreground mt-1">Standard payment option</span>
            </Label>
          </div>
          
          <div 
            className={`flex flex-col items-center space-y-2 border rounded-md p-4 cursor-pointer ${formData.paymentOption === 'full' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleRadioChange('paymentOption', 'full')}
          >
            <input 
              type="radio" 
              id="payment-full" 
              name="paymentOption" 
              value="full" 
              checked={formData.paymentOption === 'full'} 
              onChange={() => handleRadioChange('paymentOption', 'full')} 
              className="sr-only"
            />
            <div className={`w-full p-2 rounded-md text-center ${formData.paymentOption === 'full' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}>
              Full Payment
            </div>
            <Label htmlFor="payment-full" className="font-normal text-center">
              <span className="block text-sm">100% upfront with 10% discount</span>
              <span className="block text-xs text-muted-foreground mt-1">Save 10% on total</span>
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequirementsStep;

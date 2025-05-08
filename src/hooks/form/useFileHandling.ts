
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useFileHandling = () => {
  const [fileUploads, setFileUploads] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFileUploads(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFileUploads(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (requestId: string) => {
    if (fileUploads.length > 0) {
      const uploadPromises = fileUploads.map(file => {
        const filePath = `${requestId}/${file.name}`;
        return supabase.storage
          .from('service-requests')
          .upload(filePath, file);
      });

      const uploadResults = await Promise.all(uploadPromises);
      const uploadErrors = uploadResults.filter(result => result.error);

      if (uploadErrors.length > 0) {
        console.error('Some files failed to upload:', uploadErrors);
        toast({
          variant: "destructive",
          title: 'Warning',
          description: 'Some files failed to upload, but your request was saved.'
        });
      }
    }
  };

  return {
    fileUploads,
    handleFileChange,
    removeFile,
    uploadFiles,
  };
};

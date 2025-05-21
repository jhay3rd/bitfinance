
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface ProofOfPaymentUploadProps {
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProofOfPaymentUpload: React.FC<ProofOfPaymentUploadProps> = ({ file, onFileChange }) => {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 h-full">
      <div className="text-center mb-3">
        <Upload className="h-8 w-8 mx-auto mb-2" />
        <h3 className="font-medium">Proof of Payment</h3>
      </div>
      
      <div className="space-y-4">
        <div className="border border-dashed rounded-md p-6 text-center relative">
          {file ? (
            <div>
              <p className="font-medium text-green-600 dark:text-green-400">
                File attached: {file.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted/80 flex items-center justify-center">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or PDF (max 5MB)
                </p>
              </div>
            </div>
          )}
          
          <Input
            id="proof-file"
            type="file"
            className="hidden"
            onChange={onFileChange}
            accept=".png,.jpg,.jpeg,.pdf"
          />
          <Label
            htmlFor="proof-file"
            className="block w-full h-full absolute inset-0 cursor-pointer"
          >
            <span className="sr-only">Upload proof of payment</span>
          </Label>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground">
            Please attach a screenshot or PDF of your transaction receipt.
            This helps us verify your deposit and update your balance quickly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProofOfPaymentUpload;

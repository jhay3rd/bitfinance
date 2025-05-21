
import React from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Copy, Check } from "lucide-react";

interface CryptoAddress {
  name: string;
  symbol: string;
  address: string;
  network?: string;
}

interface CryptoDepositDetailsProps {
  selectedCrypto: CryptoAddress;
  copied: boolean;
  onCopyAddress: (address: string) => void;
}

const CryptoDepositDetails: React.FC<CryptoDepositDetailsProps> = ({
  selectedCrypto,
  copied,
  onCopyAddress,
}) => {
  return (
    <div className="p-4 bg-primary/5 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">
          Send {selectedCrypto.name}{selectedCrypto.network ? ` (${selectedCrypto.network} ONLY)` : ""} to:
        </h3>
      </div>
      
      <div className="flex items-center justify-between p-3 bg-muted/50 border rounded-md">
        <div className="truncate max-w-[240px] md:max-w-[400px]">
          {selectedCrypto.address}
        </div>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={() => onCopyAddress(selectedCrypto.address)}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="mt-4 border rounded-lg p-3 bg-white dark:bg-gray-800">
        <div className="text-center mb-2">
          <h3 className="font-medium">Scan QR Code</h3>
        </div>
        
        <div className="border border-dashed rounded-md p-1">
          <AspectRatio ratio={1 / 1} className="bg-muted">
            <div className="flex items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${selectedCrypto.address}`}
                alt={`${selectedCrypto.name} QR Code`}
                className="object-contain"
              />
            </div>
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};

export default CryptoDepositDetails;

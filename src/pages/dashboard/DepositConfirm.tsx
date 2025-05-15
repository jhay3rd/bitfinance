
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import our refactored components
import CryptoDepositDetails from "@/components/dashboard/deposit/CryptoDepositDetails";
import ProofOfPaymentUpload from "@/components/dashboard/deposit/ProofOfPaymentUpload";
import DepositWarning from "@/components/dashboard/deposit/DepositWarning";

interface CryptoAddress {
  name: string;
  symbol: string;
  address: string;
  network?: string;
  qrCodeUrl?: string;
}

const DepositConfirm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const method = searchParams.get("method") || "crypto";
  const amount = searchParams.get("amount") || "0";
  const cryptoType = searchParams.get("crypto") || "btc";
  
  const [file, setFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Updated crypto addresses for different cryptocurrencies
  const cryptoAddresses: Record<string, CryptoAddress> = {
    btc: {
      name: "Bitcoin",
      symbol: "BTC",
      address: "bc1qvwh6kx0y24rkn5t8yy2f5hevjz4xnnd7agma4u",
    },
    eth: {
      name: "Ethereum",
      symbol: "ETH",
      address: "0xf55f65AD545AB372F3bE77629b4C04AfE12d6888",
    },
    usdt: {
      name: "Tether",
      symbol: "USDT",
      address: "TFbvJjoFwJjPM9Z9c3AHHtZBQr8Joa4iac",
      network: "TRC20",
    }
  };
  
  // Make sure we're using the correct crypto based on the URL parameter
  const selectedCrypto = cryptoAddresses[cryptoType] || cryptoAddresses.btc;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    
    toast({
      title: "Address copied!",
      description: "Wallet address copied to clipboard."
    });
    
    setTimeout(() => setCopied(false), 3000);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      
      toast({
        title: "File uploaded",
        description: "Your proof of payment has been attached."
      });
    }
  };
  
  const handleSubmit = () => {
    if (!file) {
      toast({
        title: "Missing proof of payment",
        description: "Please attach proof of your transaction.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Deposit submitted",
      description: `Your ${selectedCrypto.name} deposit is being verified. Your balance will be updated shortly.`,
    });
    
    navigate("/dashboard", { state: { activeTab: "overview" } });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="outline" 
          className="mb-6" 
          onClick={() => navigate("/dashboard", { state: { activeTab: "deposit" } })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Deposit
        </Button>
        
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl">
              Deposit {selectedCrypto.name}
            </CardTitle>
            <CardDescription>
              Please send {amount} USD worth of {selectedCrypto.name} to the address below
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <CryptoDepositDetails
              selectedCrypto={selectedCrypto}
              copied={copied}
              onCopyAddress={copyToClipboard}
            />
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <ProofOfPaymentUpload file={file} onFileChange={handleFileChange} />
              </div>
            </div>
            
            <DepositWarning 
              symbol={selectedCrypto.symbol} 
              network={selectedCrypto.network}
              minAmount={Number(amount) < 10 ? '10' : amount}
            />
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button 
              onClick={handleSubmit} 
              className="w-full"
            >
              I've Made the Payment
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              Having issues? <a href="/dashboard/support" className="text-primary font-medium">Contact Support</a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DepositConfirm;


import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, ArrowLeft, Copy, Check, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      description: "Your deposit is being verified. Your balance will be updated shortly.",
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
                  onClick={() => copyToClipboard(selectedCrypto.address)}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                  <div className="text-center mb-3">
                    <QrCode className="h-8 w-8 mx-auto mb-2" />
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
              
              <div className="flex-1">
                <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 h-full">
                  <div className="text-center mb-3">
                    <Upload className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-medium">Proof of Payment</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border border-dashed rounded-md p-6 text-center">
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
                        onChange={handleFileChange}
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
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-md">
              <h4 className="font-medium text-amber-800 dark:text-amber-500">Important:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-amber-700 dark:text-amber-400 mt-2">
                <li>Make sure to send only {selectedCrypto.symbol} to this address</li>
                {selectedCrypto.network && <li>Use the {selectedCrypto.network} network ONLY</li>}
                <li>The minimum deposit amount is ${Number(amount) < 10 ? '10' : amount}</li>
                <li>Your deposit will be credited after network confirmations</li>
              </ul>
            </div>
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


import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Wallet, Bank, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DepositOptions: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState("crypto");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Deposit initiated",
      description: `Your deposit of $${amount} using ${activeMethod} has been initiated.`,
    });
    
    // In a real app, you'd navigate to a payment processing page or show instructions
    navigate(`/dashboard/deposit/confirm?method=${activeMethod}&amount=${amount}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold">Deposit Funds</h2>
        <p className="text-muted-foreground">Add funds to your BitFinance account</p>
      </div>
      
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Choose Deposit Method</CardTitle>
          <CardDescription>Select your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="crypto"
            value={activeMethod}
            onValueChange={setActiveMethod}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="crypto" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Wallet className="mr-2 h-4 w-4" /> Cryptocurrency
              </TabsTrigger>
              <TabsTrigger value="card" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <CreditCard className="mr-2 h-4 w-4" /> Credit Card
              </TabsTrigger>
              <TabsTrigger value="bank" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Bank className="mr-2 h-4 w-4" /> Bank Transfer
              </TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleDeposit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount (USD)</label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full"
                    min="10"
                  />
                </div>
                
                <TabsContent value="crypto" className="mt-0 border rounded-lg p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-md">
                      <div className="flex items-center">
                        <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="Bitcoin" className="w-8 h-8 mr-3" />
                        <div>
                          <p className="font-medium">Bitcoin (BTC)</p>
                          <p className="text-xs text-muted-foreground">Network fee: 0.0005 BTC</p>
                        </div>
                      </div>
                      <input type="radio" name="crypto" value="btc" defaultChecked className="h-4 w-4" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-md">
                      <div className="flex items-center">
                        <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="Ethereum" className="w-8 h-8 mr-3" />
                        <div>
                          <p className="font-medium">Ethereum (ETH)</p>
                          <p className="text-xs text-muted-foreground">Network fee: 0.005 ETH</p>
                        </div>
                      </div>
                      <input type="radio" name="crypto" value="eth" className="h-4 w-4" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-md">
                      <div className="flex items-center">
                        <img src="https://cryptologos.cc/logos/tether-usdt-logo.png" alt="USDT" className="w-8 h-8 mr-3" />
                        <div>
                          <p className="font-medium">Tether (USDT)</p>
                          <p className="text-xs text-muted-foreground">Network fee: 1 USDT</p>
                        </div>
                      </div>
                      <input type="radio" name="crypto" value="usdt" className="h-4 w-4" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="card" className="mt-0 border rounded-lg p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Card Number</label>
                      <Input placeholder="1234 5678 9012 3456" className="w-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Expiration Date</label>
                        <Input placeholder="MM/YY" className="w-full" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">CVV</label>
                        <Input placeholder="123" className="w-full" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                      <Input placeholder="John Doe" className="w-full" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <img src="https://www.visa.com/images/visa-logo.png" alt="Visa" className="h-6" />
                      <img src="https://www.mastercard.com/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg" alt="Mastercard" className="h-6" />
                      <img src="https://www.discover.com/company/images/discover.gif" alt="Discover" className="h-6" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="bank" className="mt-0 border rounded-lg p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Bank Transfer Details</p>
                      <p className="text-sm text-muted-foreground">Please use the following details to make a bank transfer.</p>
                    </div>
                    
                    <div className="space-y-2 bg-primary/5 p-4 rounded-md">
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Bank Name:</p>
                        <p className="text-sm font-medium">BitFinance Bank</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Account Name:</p>
                        <p className="text-sm font-medium">BitFinance Holdings Ltd</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Account Number:</p>
                        <p className="text-sm font-medium">1234567890</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Routing Number:</p>
                        <p className="text-sm font-medium">087654321</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Reference:</p>
                        <p className="text-sm font-medium">BF-{Math.floor(Math.random() * 1000000)}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm">After making the transfer, please upload the proof of payment below.</p>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Upload Payment Receipt</label>
                      <Input type="file" className="w-full" />
                    </div>
                  </div>
                </TabsContent>
              </div>
              
              <Button type="submit" className="mt-6 w-full">
                Continue to Deposit
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <p className="text-sm text-muted-foreground">Need help? <a href="/support" className="text-primary">Contact Support</a></p>
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/transactions")}>
            <RefreshCw className="h-4 w-4 mr-1" /> Transaction History
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DepositOptions;

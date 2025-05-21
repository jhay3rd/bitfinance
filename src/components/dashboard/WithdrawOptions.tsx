
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Building, RefreshCw, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Import sub-components
import WithdrawHeader from "./withdraw/WithdrawHeader";
import CryptoWithdrawOption from "./withdraw/CryptoWithdrawOption";
import BankWithdrawOption from "./withdraw/BankWithdrawOption";

const WithdrawOptions: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState("crypto");
  const [amount, setAmount] = useState("");
  const [withdrawalAddress, setWithdrawalAddress] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("btc");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // User's available balance (in a real app, this would come from an API)
  const availableBalance = 24125.50;
  
  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValue = Number(amount);
    
    if (!amount || isNaN(amountValue) || amountValue <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      });
      return;
    }
    
    // Check if withdrawal amount exceeds available balance
    if (amountValue > availableBalance) {
      toast({
        title: "Insufficient funds",
        description: `Your withdrawal amount exceeds your available balance of $${availableBalance.toFixed(2)}`,
        variant: "destructive",
      });
      return;
    }
    
    if (amountValue < 50) {
      toast({
        title: "Minimum withdrawal amount",
        description: "The minimum withdrawal amount is $50.00",
        variant: "destructive",
      });
      return;
    }
    
    if (activeMethod === "crypto" && (!withdrawalAddress || !selectedCrypto)) {
      toast({
        title: "Missing information",
        description: "Please enter a wallet address and select a cryptocurrency",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Processing withdrawal request",
      description: `Your withdrawal of $${amount} via ${activeMethod} is being processed.`,
    });
    
    // Navigate to the withdrawal confirmation page
    navigate(`/dashboard/withdraw/confirm?method=${activeMethod}&amount=${amount}&crypto=${selectedCrypto}`);
  };
  
  return (
    <div className="space-y-6">
      <WithdrawHeader 
        title="Withdraw Funds" 
        description="Withdraw your funds to your preferred destination" 
      />
      
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Choose Withdrawal Method</CardTitle>
          <CardDescription>Select where you want to withdraw your funds</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="crypto"
            value={activeMethod}
            onValueChange={setActiveMethod}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="crypto" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Wallet className="mr-2 h-4 w-4" /> Cryptocurrency
              </TabsTrigger>
              <TabsTrigger value="bank" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Building className="mr-2 h-4 w-4" /> Bank Account
              </TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleWithdraw}>
              <div className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 p-3 rounded-md flex items-start text-amber-800 dark:text-amber-200">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Withdrawals are processed within 24 hours. Minimum withdrawal amount is $50.00.</p>
                </div>
                
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount (USD)</label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full"
                    min="50"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Available balance: ${availableBalance.toFixed(2)}</p>
                </div>
                
                <TabsContent value="crypto" className="mt-0 space-y-4">
                  <CryptoWithdrawOption 
                    selectedCrypto={selectedCrypto}
                    setSelectedCrypto={setSelectedCrypto}
                    selectedNetwork={selectedNetwork}
                    setSelectedNetwork={setSelectedNetwork}
                    withdrawalAddress={withdrawalAddress}
                    setWithdrawalAddress={setWithdrawalAddress}
                    amount={amount}
                  />
                </TabsContent>
                
                <TabsContent value="bank" className="mt-0 space-y-4">
                  <BankWithdrawOption 
                    amount={amount} 
                  />
                </TabsContent>
              </div>
              
              <Button type="submit" className="mt-6 w-full">
                Request Withdrawal
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <p className="text-sm text-muted-foreground">Need help? <a href="/dashboard/support" className="text-primary">Contact Support</a></p>
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/transactions")}>
            <RefreshCw className="h-4 w-4 mr-1" /> Withdrawal History
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WithdrawOptions;

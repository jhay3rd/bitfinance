import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Wallet, Building, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Import sub-components
import DepositHeader from "./deposit/DepositHeader";
import CryptoDepositOption from "./deposit/CryptoDepositOption";
import CardDepositOption from "./deposit/CardDepositOption";
import BankDepositOption from "./deposit/BankDepositOption";

const DepositOptions: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState("crypto");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const selectedCrypto = formData.get("selectedCrypto") as string || "btc";
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }
    
    if (activeMethod === "bank") {
      window.open("https://t.me/BitFinanceSupport", "_blank");
      toast({
        title: "Redirecting to support",
        description: "You will be connected with our support team on Telegram for bank transfer instructions.",
      });
      return;
    }
    
    toast({
      title: "Deposit initiated",
      description: `Your deposit of $${amount} using ${activeMethod} has been initiated.`,
    });
    
    // Navigate to the deposit confirmation page with the selected method, amount, and crypto type
    navigate(`/dashboard/deposit/confirm?method=${activeMethod}&amount=${amount}&crypto=${selectedCrypto}`);
  };
  
  return (
    <div className="space-y-6">
      <DepositHeader 
        title="Deposit Funds" 
        description="Add funds to your BitFinance account" 
      />
      
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
                <Building className="mr-2 h-4 w-4" /> Bank Transfer
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
                  <CryptoDepositOption />
                </TabsContent>
                
                <TabsContent value="card" className="mt-0 border rounded-lg p-4">
                  <CardDepositOption />
                </TabsContent>
                
                <TabsContent value="bank" className="mt-0 border rounded-lg p-4">
                  <BankDepositOption />
                </TabsContent>
              </div>
              
              <Button 
                type="submit" 
                className="mt-6 w-full"
              >
                {activeMethod === "bank" ? "Contact Support" : "Continue to Deposit"}
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <p className="text-sm text-muted-foreground">Need help? <a href="/dashboard/support" className="text-primary">Contact Support</a></p>
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/transactions")}>
            <RefreshCw className="h-4 w-4 mr-1" /> Transaction History
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DepositOptions;

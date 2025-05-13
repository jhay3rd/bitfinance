
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Building, RefreshCw, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const WithdrawOptions: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState("crypto");
  const [amount, setAmount] = useState("");
  const [withdrawalAddress, setWithdrawalAddress] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
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
      title: "Withdrawal request submitted",
      description: `Your withdrawal of $${amount} via ${activeMethod} is being processed.`,
    });
    
    // In a real app, you'd navigate to a confirmation page or show a success message
    navigate("/dashboard/withdraw/confirm");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold">Withdraw Funds</h2>
        <p className="text-muted-foreground">Withdraw your funds to your preferred destination</p>
      </div>
      
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
                  <p className="text-xs text-muted-foreground mt-1">Available balance: $24,125.50</p>
                </div>
                
                <TabsContent value="crypto" className="mt-0 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Cryptocurrency</label>
                    <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                        <SelectItem value="usdt">Tether (USDT)</SelectItem>
                        <SelectItem value="sol">Solana (SOL)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedCrypto && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Select Network</label>
                      <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select network" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCrypto === "btc" && <SelectItem value="bitcoin">Bitcoin</SelectItem>}
                          {selectedCrypto === "eth" && (
                            <>
                              <SelectItem value="ethereum">Ethereum</SelectItem>
                              <SelectItem value="polygon">Polygon</SelectItem>
                            </>
                          )}
                          {selectedCrypto === "usdt" && (
                            <>
                              <SelectItem value="erc20">Ethereum (ERC20)</SelectItem>
                              <SelectItem value="trc20">Tron (TRC20)</SelectItem>
                              <SelectItem value="bep20">Binance Smart Chain (BEP20)</SelectItem>
                            </>
                          )}
                          {selectedCrypto === "sol" && <SelectItem value="solana">Solana</SelectItem>}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Wallet Address</label>
                    <Input
                      placeholder="Enter your wallet address"
                      value={withdrawalAddress}
                      onChange={(e) => setWithdrawalAddress(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  {selectedCrypto && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                      <div className="flex justify-between text-sm">
                        <p className="text-muted-foreground">Network Fee</p>
                        <p className="font-medium">
                          {selectedCrypto === "btc" ? "0.0005 BTC" : 
                           selectedCrypto === "eth" ? "0.005 ETH" :
                           selectedCrypto === "usdt" ? "1 USDT" : "0.01 SOL"}
                        </p>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <p className="text-muted-foreground">You will receive</p>
                        <p className="font-medium">
                          {amount ? `${(Number(amount) * 0.98).toFixed(2)} USD worth of ${selectedCrypto.toUpperCase()}` : "0 USD"}
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="bank" className="mt-0 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Bank Name</label>
                    <Input placeholder="Enter bank name" className="w-full" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Account Holder Name</label>
                    <Input placeholder="Enter account holder name" className="w-full" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Account Number</label>
                    <Input placeholder="Enter account number" className="w-full" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">SWIFT/BIC Code</label>
                    <Input placeholder="Enter SWIFT or BIC code" className="w-full" />
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Processing Fee (1.5%)</p>
                      <p className="font-medium">${amount ? (Number(amount) * 0.015).toFixed(2) : "0.00"}</p>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <p className="text-muted-foreground">You will receive</p>
                      <p className="font-medium">${amount ? (Number(amount) * 0.985).toFixed(2) : "0.00"}</p>
                    </div>
                  </div>
                </TabsContent>
              </div>
              
              <Button type="submit" className="mt-6 w-full">
                Request Withdrawal
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <p className="text-sm text-muted-foreground">Need help? <a href="/support" className="text-primary">Contact Support</a></p>
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/transactions")}>
            <RefreshCw className="h-4 w-4 mr-1" /> Withdrawal History
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WithdrawOptions;

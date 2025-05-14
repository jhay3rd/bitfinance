
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WithdrawConfirm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const method = searchParams.get("method") || "crypto";
  const amount = searchParams.get("amount") || "0";
  const cryptoType = searchParams.get("crypto") || "btc";
  
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Simulate processing time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsCompleted(true);
      
      toast({
        title: "Withdrawal request submitted",
        description: "Your withdrawal request is being processed by our team."
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  const handleTelegramSupport = () => {
    // Create custom message with withdrawal details
    const message = `Hello BitFinance Support, I have initiated a withdrawal of $${amount} via ${method}${cryptoType ? ` (${cryptoType.toUpperCase()})` : ''}. Please verify and approve my withdrawal request. Thank you!`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/BitFinanceSupport?start=${encodedMessage}`, "_blank");
    
    toast({
      title: "Contacting support",
      description: "You will be connected with our support team on Telegram for withdrawal verification."
    });
  };
  
  const handleReturnToDashboard = () => {
    navigate("/dashboard", { state: { activeTab: "overview" } });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-md mx-auto">
        <Button 
          variant="outline" 
          className="mb-6" 
          onClick={() => navigate("/dashboard", { state: { activeTab: "withdraw" } })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Withdraw
        </Button>
        
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">
              Withdrawal Request
            </CardTitle>
            <CardDescription>
              Your withdrawal request is being processed
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 flex flex-col items-center justify-center py-8">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
                <p className="text-lg font-medium">Processing your request...</p>
                <p className="text-muted-foreground">This may take a moment</p>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                
                <h3 className="text-xl font-medium text-green-600 dark:text-green-400">
                  Withdrawal Accepted
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg max-w-xs mx-auto">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Amount:</p>
                    <p className="font-medium">${amount}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-muted-foreground">Method:</p>
                    <p className="font-medium">{method === "crypto" ? `${cryptoType.toUpperCase()}` : method}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-muted-foreground">Status:</p>
                    <p className="text-amber-600 font-medium">Pending Verification</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button 
              onClick={handleTelegramSupport} 
              className="w-full"
              disabled={isLoading}
            >
              Contact Support for Verification
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleReturnToDashboard} 
              className="w-full"
              disabled={isLoading}
            >
              Return to Dashboard
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Your withdrawal will be processed within 24 hours after verification.</p>
              <p className="mt-1">Check your transaction history for updates.</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default WithdrawConfirm;

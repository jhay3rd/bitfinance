
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, TrendingUp, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/dashboard/Header";

interface PlanDetails {
  id: string;
  name: string;
  duration: string;
  returns: string;
  minInvestment: number;
  icon: React.ReactNode;
  description: string;
}

const plans: Record<string, PlanDetails> = {
  "daily": {
    id: "daily",
    name: "Daily Trader",
    duration: "24 hours",
    returns: "0.8% - 1.2%",
    minInvestment: 100,
    icon: <Clock className="h-10 w-10 text-primary" />,
    description: "Quick returns on short-term investments. Perfect for active traders."
  },
  "weekly": {
    id: "weekly",
    name: "Weekly Growth",
    duration: "7 days",
    returns: "3.5% - 5.2%",
    minInvestment: 500,
    icon: <Clock className="h-10 w-10 text-indigo-500" />,
    description: "Balanced risk-reward ratio with weekly returns on your investment."
  },
  "monthly": {
    id: "monthly",
    name: "Monthly Builder",
    duration: "30 days",
    returns: "8% - 12%",
    minInvestment: 1000,
    icon: <Calendar className="h-10 w-10 text-emerald-500" />,
    description: "Steady growth with monthly compounding returns."
  },
  "quarterly": {
    id: "quarterly",
    name: "Quarterly Accelerator",
    duration: "90 days",
    returns: "18% - 25%",
    minInvestment: 2500,
    icon: <Calendar className="h-10 w-10 text-amber-500" />,
    description: "Accelerate your wealth with our medium-term investment plan."
  },
  "biannual": {
    id: "biannual",
    name: "6-Month Maximizer",
    duration: "180 days",
    returns: "32% - 45%",
    minInvestment: 5000,
    icon: <TrendingUp className="h-10 w-10 text-rose-500" />,
    description: "Maximize your returns with our premium long-term investment strategy."
  }
};

const InvestmentPlan: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [agreementChecked, setAgreementChecked] = useState(false);
  
  if (!planId || !plans[planId]) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Plan Not Found</h1>
        <p className="mb-6">The investment plan you are looking for does not exist.</p>
        <Button onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
      </div>
    );
  }
  
  const plan = plans[planId];
  const estimatedReturn = Number(amount) * (parseFloat(plan.returns.split(" - ")[1].replace("%", "")) / 100);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || isNaN(Number(amount)) || Number(amount) < plan.minInvestment) {
      toast({
        title: "Invalid amount",
        description: `Minimum investment is $${plan.minInvestment}`,
        variant: "destructive",
      });
      return;
    }
    
    if (!agreementChecked) {
      toast({
        title: "Agreement required",
        description: "Please read and accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Investment successful",
      description: `Your investment of $${amount} in the ${plan.name} plan has been submitted.`,
    });
    
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-4xl mx-auto p-4 py-6 lg:p-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")}
          className="mb-6 pl-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Invest in {plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Investment Amount (USD)</label>
                    <Input 
                      type="number" 
                      placeholder={`Minimum $${plan.minInvestment}`}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full"
                    />
                    {Number(amount) > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Estimated return: <span className="text-green-600 font-medium">${estimatedReturn.toFixed(2)}</span>
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Select Payment Method</h3>
                    <div className="space-y-2">
                      <div className="flex items-center border p-3 rounded-md">
                        <input type="radio" name="payment" id="wallet" defaultChecked className="mr-2" />
                        <label htmlFor="wallet" className="flex-1">BitFinance Wallet</label>
                        <span className="text-sm text-muted-foreground">Balance: $24,125.50</span>
                      </div>
                      <div className="flex items-center border p-3 rounded-md">
                        <input type="radio" name="payment" id="deposit" className="mr-2" />
                        <label htmlFor="deposit" className="flex-1">Make New Deposit</label>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="px-0" 
                          onClick={() => navigate("/dashboard/deposit")}
                        >
                          Go to Deposit
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="agreement" 
                        className="h-4 w-4 mr-2" 
                        checked={agreementChecked}
                        onChange={() => setAgreementChecked(!agreementChecked)}
                      />
                      <label htmlFor="agreement" className="text-sm">
                        I agree to the <a href="/terms" className="text-primary">Terms & Conditions</a> and acknowledge the potential risks involved with this investment.
                      </label>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">Confirm Investment</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="border-0 shadow-md sticky top-20">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  {plan.icon}
                </div>
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.duration}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Plan Details</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{plan.duration}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Expected Returns</span>
                      <span className="font-medium text-green-600">{plan.returns}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Minimum Investment</span>
                      <span className="font-medium">${plan.minInvestment.toLocaleString()}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Why Choose This Plan</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start">
                      <div className="w-4 h-4 mr-2 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs mt-0.5">✓</div>
                      <span>{plan.duration === "24 hours" ? "Quick daily returns" : "Competitive ROI"}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 mr-2 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs mt-0.5">✓</div>
                      <span>Fully transparent process</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 mr-2 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs mt-0.5">✓</div>
                      <span>No hidden fees</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 mr-2 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs mt-0.5">✓</div>
                      <span>Managed by expert traders</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button variant="outline" onClick={() => navigate("/dashboard")} className="w-full">
                  View All Plans
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlan;

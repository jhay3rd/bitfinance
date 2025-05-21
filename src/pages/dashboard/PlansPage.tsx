
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, TrendingUp, ArrowLeft } from "lucide-react";
import Header from "@/components/dashboard/Header";

interface Plan {
  id: string;
  name: string;
  duration: string;
  returns: string;
  minInvestment: number;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const PlansPage: React.FC = () => {
  const navigate = useNavigate();
  
  const plans: Plan[] = [
    {
      id: "daily",
      name: "Daily Trader",
      duration: "24 hours",
      returns: "29.7% - 31.4%",
      minInvestment: 50,
      icon: <Clock className="h-10 w-10 text-primary" />,
      description: "Quick returns on short-term investments with our AI-powered trading algorithms.",
      color: "primary"
    },
    {
      id: "weekly",
      name: "Weekly Growth",
      duration: "7 days",
      returns: "35.5% - 42.2%",
      minInvestment: 500,
      icon: <Clock className="h-10 w-10 text-indigo-500" />,
      description: "Balanced risk-reward ratio with weekly returns on your investment.",
      color: "indigo"
    },
    {
      id: "monthly",
      name: "Monthly Builder",
      duration: "30 days",
      returns: "68% - 79%",
      minInvestment: 1000,
      icon: <Calendar className="h-10 w-10 text-emerald-500" />,
      description: "Steady growth with monthly compounding returns and expert management.",
      color: "emerald"
    },
    {
      id: "quarterly",
      name: "Quarterly Accelerator",
      duration: "90 days",
      returns: "112% - 135%",
      minInvestment: 2500,
      icon: <Calendar className="h-10 w-10 text-amber-500" />,
      description: "Accelerate your wealth with our medium-term investment strategy.",
      color: "amber"
    },
    {
      id: "biannual",
      name: "6-Month Maximizer",
      duration: "180 days",
      returns: "182% - 215%",
      minInvestment: 5000,
      icon: <TrendingUp className="h-10 w-10 text-rose-500" />,
      description: "Maximize your returns with our premium long-term investment strategy.",
      color: "rose"
    }
  ];
  
  const handleInvest = (planId: string) => {
    navigate(`/dashboard/invest/${planId}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto p-4 py-6 lg:p-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")}
          className="mb-6 pl-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Investment Plans</h1>
            <p className="text-muted-foreground mt-2">Choose an investment plan that aligns with your financial goals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden border-0 shadow-md transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className={`p-3 rounded-lg bg-${plan.color}/10`}>
                      {plan.icon}
                    </div>
                    <div className={`bg-${plan.color}/10 text-${plan.color}-600 font-medium text-sm py-1 px-3 rounded-full`}>
                      {plan.duration}
                    </div>
                  </div>
                  <CardTitle className="mt-4 text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Plan Details</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Duration</span>
                          <span className="font-medium">{plan.duration}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Expected Returns</span>
                          <span className="font-semibold text-green-600">{plan.returns}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Minimum Investment</span>
                          <span className="font-medium">${plan.minInvestment.toLocaleString()}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs">✓</div>
                        <span className="text-sm">AI-powered trading algorithms</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-4 h-4 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs">✓</div>
                        <span className="text-sm">24/7 portfolio monitoring</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-4 h-4 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs">✓</div>
                        <span className="text-sm">Risk management strategies</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => handleInvest(plan.id)}
                  >
                    Invest Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-3">How Our Investment Plans Work</h2>
            <p className="text-muted-foreground mb-4">
              BitFinance uses advanced trading algorithms and expert market analysis to generate consistent returns for our investors.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary font-bold">1</div>
                <h3 className="font-medium">Choose a Plan</h3>
                <p className="text-sm text-muted-foreground">Select an investment plan that matches your financial goals and risk appetite.</p>
              </div>
              <div className="space-y-2">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary font-bold">2</div>
                <h3 className="font-medium">Make Your Investment</h3>
                <p className="text-sm text-muted-foreground">Deposit funds into your selected investment plan using your preferred payment method.</p>
              </div>
              <div className="space-y-2">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary font-bold">3</div>
                <h3 className="font-medium">Earn Returns</h3>
                <p className="text-sm text-muted-foreground">Watch your investment grow as our expert traders and AI algorithms manage your portfolio.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;

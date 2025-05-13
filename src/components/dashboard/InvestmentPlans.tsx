
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface InvestmentPlan {
  id: string;
  name: string;
  duration: string;
  returns: string;
  minInvestment: number;
  icon: React.ReactNode;
  description: string;
}

const plans: InvestmentPlan[] = [
  {
    id: "daily",
    name: "Daily Trader",
    duration: "24 hours",
    returns: "29.7% - 31.4%",
    minInvestment: 50,
    icon: <Clock className="h-8 w-8 text-primary" />,
    description: "Quick returns on short-term investments. Perfect for active traders."
  },
  {
    id: "weekly",
    name: "Weekly Growth",
    duration: "7 days",
    returns: "35.5% - 42.2%",
    minInvestment: 500,
    icon: <Clock className="h-8 w-8 text-indigo-500" />,
    description: "Balanced risk-reward ratio with weekly returns on your investment."
  },
  {
    id: "monthly",
    name: "Monthly Builder",
    duration: "30 days",
    returns: "68% - 79%",
    minInvestment: 1000,
    icon: <Calendar className="h-8 w-8 text-emerald-500" />,
    description: "Steady growth with monthly compounding returns."
  },
  {
    id: "quarterly",
    name: "Quarterly Accelerator",
    duration: "90 days",
    returns: "112% - 135%",
    minInvestment: 2500,
    icon: <Calendar className="h-8 w-8 text-amber-500" />,
    description: "Accelerate your wealth with our medium-term investment plan."
  },
  {
    id: "biannual",
    name: "6-Month Maximizer",
    duration: "180 days",
    returns: "182% - 215%",
    minInvestment: 5000,
    icon: <TrendingUp className="h-8 w-8 text-rose-500" />,
    description: "Maximize your returns with our premium long-term investment strategy."
  }
];

const InvestmentPlans: React.FC = () => {
  const navigate = useNavigate();
  
  const handleInvest = (planId: string) => {
    navigate(`/dashboard/invest/${planId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold">Investment Plans</h2>
        <p className="text-muted-foreground">Choose an investment plan that matches your financial goals</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan.id} className="overflow-hidden border-0 shadow-md transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="p-2 rounded-lg bg-primary/5">{plan.icon}</div>
                <div className="bg-primary/10 text-primary font-medium text-sm py-1 px-3 rounded-full">
                  {plan.duration}
                </div>
              </div>
              <CardTitle className="mt-4 text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expected Returns</span>
                  <span className="font-semibold text-green-600">{plan.returns}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Minimum Investment</span>
                  <span className="font-semibold">${plan.minInvestment.toLocaleString()}</span>
                </div>
                
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full mt-4">
                  <div 
                    className="bg-primary h-full rounded-full" 
                    style={{ 
                      width: `${Math.min(100, plan.minInvestment / 50)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
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
    </div>
  );
};

export default InvestmentPlans;

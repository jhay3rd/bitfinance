
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface BalanceCardProps {
  balance: string;
  change: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance, change }) => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-muted-foreground">Available Balance</h3>
          </div>
          
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">{balance}</span>
            <div className="ml-3 flex items-center text-sm">
              <span className={`flex items-center ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change.isPositive ? 
                  <ArrowUp className="h-4 w-4 mr-1" /> : 
                  <ArrowDown className="h-4 w-4 mr-1" />
                }
                {change.value} ({change.percentage})
              </span>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Updated just now
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;

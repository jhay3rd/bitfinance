
import React from "react";
import { Button } from "@/components/ui/button";
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  Wallet,
  CreditCard,
  User,
} from "lucide-react";

const MobileNavigation: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background md:hidden">
      <div className="grid grid-cols-5 h-16">
        <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
          <BarChartIcon className="h-5 w-5" />
          <span className="text-xs mt-1">Overview</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
          <LineChartIcon className="h-5 w-5" />
          <span className="text-xs mt-1">Portfolio</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
          <Wallet className="h-5 w-5" />
          <span className="text-xs mt-1">Deposit</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
          <CreditCard className="h-5 w-5" />
          <span className="text-xs mt-1">Withdraw</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default MobileNavigation;

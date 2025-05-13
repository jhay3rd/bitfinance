
import React from "react";
import { Button } from "@/components/ui/button";
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  Wallet,
  CreditCard,
  User,
} from "lucide-react";

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background md:hidden shadow-lg z-20">
      <div className="grid grid-cols-5 h-16">
        <Button 
          variant={activeTab === "overview" ? "default" : "ghost"} 
          onClick={() => setActiveTab("overview")}
          className={`flex flex-col items-center justify-center rounded-none h-full ${activeTab === "overview" ? "bg-primary/10 text-primary" : ""}`}
        >
          <BarChartIcon className="h-5 w-5" />
          <span className="text-xs mt-1">Overview</span>
        </Button>
        <Button 
          variant={activeTab === "portfolio" ? "default" : "ghost"}
          onClick={() => setActiveTab("portfolio")}
          className={`flex flex-col items-center justify-center rounded-none h-full ${activeTab === "portfolio" ? "bg-primary/10 text-primary" : ""}`}
        >
          <LineChartIcon className="h-5 w-5" />
          <span className="text-xs mt-1">Portfolio</span>
        </Button>
        <Button 
          variant={activeTab === "deposit" ? "default" : "ghost"}
          onClick={() => setActiveTab("deposit")}
          className={`flex flex-col items-center justify-center rounded-none h-full ${activeTab === "deposit" ? "bg-primary/10 text-primary" : ""}`}
        >
          <Wallet className="h-5 w-5" />
          <span className="text-xs mt-1">Deposit</span>
        </Button>
        <Button 
          variant={activeTab === "withdraw" ? "default" : "ghost"}
          onClick={() => setActiveTab("withdraw")}
          className={`flex flex-col items-center justify-center rounded-none h-full ${activeTab === "withdraw" ? "bg-primary/10 text-primary" : ""}`}
        >
          <CreditCard className="h-5 w-5" />
          <span className="text-xs mt-1">Withdraw</span>
        </Button>
        <Button 
          variant={activeTab === "profile" ? "default" : "ghost"}
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center justify-center rounded-none h-full ${activeTab === "profile" ? "bg-primary/10 text-primary" : ""}`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default MobileNavigation;

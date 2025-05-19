
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  Wallet,
  CreditCard,
  User
} from "lucide-react";

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (tab: string) => {
    if (tab === "profile") {
      navigate("/dashboard/profile");
    } else {
      setActiveTab(tab);
    }
  };

  // Determine if we're on the profile page
  const isProfilePage = location.pathname === "/dashboard/profile";

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white dark:bg-gray-900 md:hidden shadow-lg z-20">
      <div className="grid grid-cols-5 h-16">
        <Button 
          variant="ghost" 
          onClick={() => handleTabChange("overview")}
          className={`flex flex-col items-center justify-center rounded-none h-full ${
            activeTab === "overview" ? "bg-primary/10 text-primary border-t-2 border-primary" : ""
          }`}
        >
          <BarChartIcon className="h-5 w-5" />
          <span className="text-xs mt-1">Overview</span>
        </Button>
        <Button 
          variant="ghost"
          onClick={() => handleTabChange("portfolio")}
          className={`flex flex-col items-center justify-center rounded-none h-full ${
            activeTab === "portfolio" ? "bg-primary/10 text-primary border-t-2 border-primary" : ""
          }`}
        >
          <LineChartIcon className="h-5 w-5" />
          <span className="text-xs mt-1">Portfolio</span>
        </Button>
        <Button 
          variant="ghost"
          onClick={() => handleTabChange("deposit")}
          className={`flex flex-col items-center justify-center rounded-none h-full ${
            activeTab === "deposit" ? "bg-primary/10 text-primary border-t-2 border-primary" : ""
          }`}
        >
          <Wallet className="h-5 w-5" />
          <span className="text-xs mt-1">Deposit</span>
        </Button>
        <Button 
          variant="ghost"
          onClick={() => handleTabChange("withdraw")}
          className={`flex flex-col items-center justify-center rounded-none h-full ${
            activeTab === "withdraw" ? "bg-primary/10 text-primary border-t-2 border-primary" : ""
          }`}
        >
          <CreditCard className="h-5 w-5" />
          <span className="text-xs mt-1">Withdraw</span>
        </Button>
        <Button 
          variant="ghost"
          onClick={() => handleTabChange("profile")}
          className={`flex flex-col items-center justify-center rounded-none h-full ${
            isProfilePage || activeTab === "profile" ? "bg-primary/10 text-primary border-t-2 border-primary" : ""
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default MobileNavigation;

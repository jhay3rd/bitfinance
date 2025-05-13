
import React from "react";
import { Button } from "@/components/ui/button";
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  Wallet,
  CreditCard,
  User,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="fixed left-0 w-16 sm:w-64 h-[calc(100vh-64px)] border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hidden md:block shadow-sm">
      <div className="flex h-full flex-col gap-2 p-2">
        <Button
          variant="ghost"
          className={`justify-start ${activeTab === "overview" ? "bg-primary/10 text-primary" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <BarChartIcon className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">Overview</span>
        </Button>
        <Button
          variant="ghost"
          className={`justify-start ${activeTab === "portfolio" ? "bg-primary/10 text-primary" : ""}`}
          onClick={() => setActiveTab("portfolio")}
        >
          <LineChartIcon className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">Portfolio</span>
        </Button>
        <Button
          variant="ghost"
          className={`justify-start ${activeTab === "deposit" ? "bg-primary/10 text-primary" : ""}`}
          onClick={() => setActiveTab("deposit")}
        >
          <Wallet className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">Deposit</span>
        </Button>
        <Button
          variant="ghost"
          className={`justify-start ${activeTab === "withdraw" ? "bg-primary/10 text-primary" : ""}`}
          onClick={() => setActiveTab("withdraw")}
        >
          <CreditCard className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">Withdraw</span>
        </Button>
        <Button
          variant="ghost"
          className={`justify-start ${activeTab === "profile" ? "bg-primary/10 text-primary" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <User className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">Profile</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;

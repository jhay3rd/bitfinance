
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
    <aside className="fixed left-0 w-16 sm:w-64 h-[calc(100vh-64px)] border-r bg-background hidden md:block">
      <div className="flex h-full flex-col gap-2 p-2">
        <Button
          variant={activeTab === "overview" ? "default" : "ghost"}
          className="justify-start"
          onClick={() => setActiveTab("overview")}
        >
          <BarChartIcon className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">Overview</span>
        </Button>
        <Button
          variant={activeTab === "portfolio" ? "default" : "ghost"}
          className="justify-start"
          onClick={() => setActiveTab("portfolio")}
        >
          <LineChartIcon className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">Portfolio</span>
        </Button>
        <Button
          variant={activeTab === "deposit" ? "default" : "ghost"}
          className="justify-start"
          onClick={() => setActiveTab("deposit")}
        >
          <Wallet className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">Deposit</span>
        </Button>
        <Button
          variant={activeTab === "withdraw" ? "default" : "ghost"}
          className="justify-start"
          onClick={() => setActiveTab("withdraw")}
        >
          <CreditCard className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">Withdraw</span>
        </Button>
        <Button
          variant={activeTab === "profile" ? "default" : "ghost"}
          className="justify-start"
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

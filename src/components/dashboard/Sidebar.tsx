
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  Wallet,
  CreditCard,
  User,
  CircleDollarSign,
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate("/");
  };
  
  return (
    <aside className="fixed left-0 w-16 lg:w-64 h-[calc(100vh-64px)] border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hidden md:block shadow-sm z-10">
      <ScrollArea className="h-full py-4">
        <div className="space-y-1 px-2">
          <p className="text-xs text-muted-foreground font-medium px-4 py-2 lg:block hidden">MAIN MENU</p>
          
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "overview" ? "bg-primary/10 text-primary" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <BarChartIcon className="mr-2 h-5 w-5" />
            <span className="hidden lg:inline">Overview</span>
          </Button>
          
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "portfolio" ? "bg-primary/10 text-primary" : ""}`}
            onClick={() => setActiveTab("portfolio")}
          >
            <LineChartIcon className="mr-2 h-5 w-5" />
            <span className="hidden lg:inline">Portfolio</span>
          </Button>
          
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "deposit" ? "bg-primary/10 text-primary" : ""}`}
            onClick={() => setActiveTab("deposit")}
          >
            <Wallet className="mr-2 h-5 w-5" />
            <span className="hidden lg:inline">Deposit</span>
          </Button>
          
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "withdraw" ? "bg-primary/10 text-primary" : ""}`}
            onClick={() => setActiveTab("withdraw")}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            <span className="hidden lg:inline">Withdraw</span>
          </Button>
          
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "profile" ? "bg-primary/10 text-primary" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-2 h-5 w-5" />
            <span className="hidden lg:inline">Profile</span>
          </Button>
          
          <div className="pt-4 lg:block hidden">
            <p className="text-xs text-muted-foreground font-medium px-4 py-2">INVESTMENTS</p>
          </div>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/dashboard/plans")}
          >
            <CircleDollarSign className="mr-2 h-5 w-5" />
            <span className="hidden lg:inline">Investment Plans</span>
          </Button>
          
          <div className="pt-4 lg:block hidden">
            <p className="text-xs text-muted-foreground font-medium px-4 py-2">ACCOUNT</p>
          </div>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/dashboard/settings")}
          >
            <Settings className="mr-2 h-5 w-5" />
            <span className="hidden lg:inline">Settings</span>
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/dashboard/support")}
          >
            <HelpCircle className="mr-2 h-5 w-5" />
            <span className="hidden lg:inline">Support</span>
          </Button>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            <span className="hidden lg:inline">Logout</span>
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;

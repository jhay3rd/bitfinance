import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatBubble from "@/components/ChatBubble";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import Overview from "@/components/dashboard/Overview";
import InvestmentPlans from "@/components/dashboard/InvestmentPlans";
import DepositOptions from "@/components/dashboard/DepositOptions";
import WithdrawOptions from "@/components/dashboard/WithdrawOptions";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getTotalPortfolioValue,
  getAllocationData
} from "@/models/dashboard";
import useAuth from "@/hooks/useAuth";
import { userDataService } from "@/services/userDataService";

// Import our components
import PortfolioView from "@/components/dashboard/portfolio/PortfolioView";
import TransactionHistory from "@/components/dashboard/transactions/TransactionHistory";
import BalanceCard from "@/components/dashboard/BalanceCard";
import EmptyDashboardState from "@/components/dashboard/EmptyDashboardState";

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isMounted, setIsMounted] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState<any>(null);
  
  // Get activeTab from location state if available (for redirects)
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
      // Clear the state to avoid persisting the tab selection on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  
  // Load user's portfolio
  useEffect(() => {
    if (user) {
      const portfolio = userDataService.getPortfolio();
      setUserPortfolio(portfolio);
    }
  }, [user]);
  
  // Calculate derived data
  const portfolioAssets = userPortfolio?.assets || [];
  const totalPortfolioValue = userPortfolio?.totalValue || 0;
  
  // Generate monthly performance data based on user data or default if empty
  const monthlyPerformanceData = userPortfolio?.performanceData || [
    { name: 'Jan', value: 0 },
    { name: 'Feb', value: 0 },
    { name: 'Mar', value: 0 },
    { name: 'Apr', value: 0 },
    { name: 'May', value: 0 },
    { name: 'Jun', value: 0 }
  ];
  
  const allocationData = portfolioAssets.length > 0 
    ? getAllocationData(portfolioAssets)
    : [
        { name: "No Assets", value: 100, fill: "#ccc" }
      ];

  // Animation helper
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if this is a new portfolio with no assets
  const isEmptyPortfolio = portfolioAssets.length === 0;

  // Handle profile tab click to navigate to profile page
  const handleTabChange = (tab: string) => {
    if (tab === "profile") {
      navigate("/dashboard/profile");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Dashboard header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />

        {/* Main content */}
        <main className={`flex-1 md:ml-16 lg:ml-64 p-4 sm:p-6 pb-20 md:pb-6 transition-all duration-300 ease-in-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
          <Tabs 
            value={activeTab} 
            onValueChange={handleTabChange} 
            className="w-full"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <div className="w-full md:w-auto bg-white dark:bg-gray-800 shadow-sm rounded-lg sticky md:static top-16 z-10">
                <TabsList className="h-auto p-1 bg-transparent w-full flex justify-between">
                  <TabsTrigger 
                    value="overview" 
                    className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white px-3 py-2 text-sm rounded-md transition-all"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="portfolio" 
                    className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white px-3 py-2 text-sm rounded-md transition-all"
                  >
                    Portfolio
                  </TabsTrigger>
                  <TabsTrigger 
                    value="deposit" 
                    className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white px-3 py-2 text-sm rounded-md transition-all"
                  >
                    Deposit
                  </TabsTrigger>
                  <TabsTrigger 
                    value="withdraw" 
                    className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white px-3 py-2 text-sm rounded-md transition-all"
                  >
                    Withdraw
                  </TabsTrigger>
                  <TabsTrigger 
                    value="profile" 
                    className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white px-3 py-2 text-sm rounded-md transition-all"
                  >
                    Profile
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Tab content with enhanced transitions */}
            <TabsContent 
              value="overview" 
              className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-500"
            >
              <BalanceCard 
                balance={`$${totalPortfolioValue.toFixed(2)}`} 
                change={{
                  value: "$0.00",
                  percentage: "0%",
                  isPositive: true
                }}
              />
              
              {isEmptyPortfolio ? (
                <EmptyDashboardState 
                  title="Welcome to Your Dashboard"
                  description="Your portfolio is empty. Get started by making your first deposit."
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              ) : (
                <Overview 
                  portfolioAssets={portfolioAssets}
                  totalPortfolioValue={totalPortfolioValue}
                  monthlyPerformanceData={monthlyPerformanceData}
                  allocationData={allocationData}
                />
              )}
              
              {/* Add Investment Plans to Overview */}
              <InvestmentPlans />
              
              {/* Add Transaction History to Overview */}
              <TransactionHistory />
            </TabsContent>

            <TabsContent 
              value="portfolio" 
              className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500"
            >
              {isEmptyPortfolio ? (
                <EmptyDashboardState 
                  title="Your Portfolio is Empty"
                  description="Start building your portfolio by making a deposit and investing."
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              ) : (
                <PortfolioView 
                  monthlyPerformanceData={monthlyPerformanceData}
                  allocationData={allocationData}
                />
              )}
            </TabsContent>

            <TabsContent 
              value="deposit" 
              className="animate-in fade-in slide-in-from-right-8 duration-500"
            >
              <div className="space-y-6">
                <BalanceCard 
                  balance={`$${totalPortfolioValue.toFixed(2)}`}
                  change={{
                    value: "$0.00",
                    percentage: "0%",
                    isPositive: true
                  }}
                />
                <DepositOptions />
                <TransactionHistory />
              </div>
            </TabsContent>

            <TabsContent 
              value="withdraw" 
              className="animate-in fade-in slide-in-from-right-8 duration-500"
            >
              <div className="space-y-6">
                <BalanceCard 
                  balance={`$${totalPortfolioValue.toFixed(2)}`}
                  change={{
                    value: "$0.00",
                    percentage: "0%",
                    isPositive: true
                  }}
                />
                <WithdrawOptions />
                <TransactionHistory />
              </div>
            </TabsContent>

            {/* Profile tab content will redirect to /dashboard/profile */}
          </Tabs>
        </main>
      </div>

      {/* Mobile navigation */}
      <MobileNavigation activeTab={activeTab} setActiveTab={handleTabChange} />
      
      <ChatBubble />
    </div>
  );
};

export default Dashboard;

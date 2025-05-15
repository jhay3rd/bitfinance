
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
import ProfileSection from "@/components/dashboard/ProfileSection";
import { useLocation } from "react-router-dom";
import {
  portfolioAssets,
  monthlyPerformanceData,
  getTotalPortfolioValue,
  getAllocationData
} from "@/models/dashboard";

// Import our new components
import PortfolioView from "@/components/dashboard/portfolio/PortfolioView";
import TransactionHistory from "@/components/dashboard/transactions/TransactionHistory";
import BalanceCard from "@/components/dashboard/BalanceCard";

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [isMounted, setIsMounted] = useState(false);
  
  // Get activeTab from location state if available (for redirects)
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
      // Clear the state to avoid persisting the tab selection on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  
  // Calculate derived data
  const totalPortfolioValue = getTotalPortfolioValue(portfolioAssets);
  const allocationData = getAllocationData(portfolioAssets);

  // Animation helper
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Dashboard header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main content */}
        <main className={`flex-1 md:ml-16 lg:ml-64 p-4 sm:p-6 pb-20 md:pb-6 transition-all duration-300 ease-in-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
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
                balance="$51,090.22" 
                change={{
                  value: "$1,250.45",
                  percentage: "2.5%",
                  isPositive: true
                }}
              />
              
              <Overview 
                portfolioAssets={portfolioAssets}
                totalPortfolioValue={totalPortfolioValue}
                monthlyPerformanceData={monthlyPerformanceData}
                allocationData={allocationData}
              />
              
              {/* Add Investment Plans to Overview */}
              <InvestmentPlans />
              
              {/* Add Transaction History to Overview */}
              <TransactionHistory />
            </TabsContent>

            <TabsContent 
              value="portfolio" 
              className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500"
            >
              <PortfolioView 
                monthlyPerformanceData={monthlyPerformanceData}
                allocationData={allocationData}
              />
            </TabsContent>

            <TabsContent 
              value="deposit" 
              className="animate-in fade-in slide-in-from-right-8 duration-500"
            >
              <div className="space-y-6">
                <BalanceCard 
                  balance="$51,090.22"
                  change={{
                    value: "$1,250.45",
                    percentage: "2.5%",
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
                  balance="$51,090.22"
                  change={{
                    value: "$1,250.45",
                    percentage: "2.5%",
                    isPositive: true
                  }}
                />
                <WithdrawOptions />
                <TransactionHistory />
              </div>
            </TabsContent>

            <TabsContent 
              value="profile" 
              className="animate-in fade-in slide-in-from-right-8 duration-500"
            >
              <ProfileSection />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Mobile navigation */}
      <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <ChatBubble />
    </div>
  );
};

export default Dashboard;

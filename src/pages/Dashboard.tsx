import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatBubble from "@/components/ChatBubble";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import Overview from "@/components/dashboard/Overview";
import TabContent from "@/components/dashboard/TabContent";
import {
  portfolioAssets,
  monthlyPerformanceData,
  getTotalPortfolioValue,
  getAllocationData
} from "@/models/dashboard";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMounted, setIsMounted] = useState(false);
  
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
        <main className={`flex-1 md:ml-16 sm:ml-64 p-4 sm:p-6 pb-20 md:pb-6 transition-opacity duration-300 ease-in-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <div className="w-full md:w-auto bg-white dark:bg-gray-800 shadow-sm rounded-lg">
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

            {/* Overview Tab */}
            <TabsContent 
              value="overview" 
              className="space-y-6 animate-in fade-in-50 duration-300"
            >
              <Overview 
                portfolioAssets={portfolioAssets}
                totalPortfolioValue={totalPortfolioValue}
                monthlyPerformanceData={monthlyPerformanceData}
                allocationData={allocationData}
              />
            </TabsContent>

            {/* Other tabs */}
            <TabsContent 
              value="portfolio" 
              className="space-y-4 animate-in fade-in-50 duration-300"
            >
              <TabContent title="Portfolio Details">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Your Investment Portfolio</h3>
                  <p className="text-muted-foreground">
                    View and manage all your crypto investments in one place. Track performance,
                    analyze trends, and optimize your portfolio for maximum returns.
                  </p>
                </div>
              </TabContent>
            </TabsContent>

            <TabsContent 
              value="deposit" 
              className="space-y-4 animate-in fade-in-50 duration-300"
            >
              <TabContent title="Deposit Funds">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Fund Your Account</h3>
                  <p className="text-muted-foreground">
                    Choose from multiple payment methods to deposit funds into your BitFinance account.
                    All transactions are secure and processed instantly.
                  </p>
                </div>
              </TabContent>
            </TabsContent>

            <TabsContent 
              value="withdraw" 
              className="space-y-4 animate-in fade-in-50 duration-300"
            >
              <TabContent title="Withdraw Funds">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Withdraw Your Earnings</h3>
                  <p className="text-muted-foreground">
                    Withdraw your funds easily to your bank account or crypto wallet.
                    Fast processing times and competitive fees.
                  </p>
                </div>
              </TabContent>
            </TabsContent>

            <TabsContent 
              value="profile" 
              className="space-y-4 animate-in fade-in-50 duration-300"
            >
              <TabContent title="Your Profile">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <p className="text-muted-foreground">
                    Manage your account details, security settings, and personal preferences.
                    Keep your information up to date for a seamless experience.
                  </p>
                </div>
              </TabContent>
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

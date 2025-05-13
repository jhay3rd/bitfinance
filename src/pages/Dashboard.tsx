import React, { useState } from "react";
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
  
  // Calculate derived data
  const totalPortfolioValue = getTotalPortfolioValue(portfolioAssets);
  const allocationData = getAllocationData(portfolioAssets);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Dashboard header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main content */}
        <main className="flex-1 md:ml-16 sm:ml-64 p-4 sm:p-6">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <TabsList className="grid grid-cols-5 md:w-auto md:block">
                <TabsTrigger value="overview" className="hidden md:inline-flex">Overview</TabsTrigger>
                <TabsTrigger value="portfolio" className="hidden md:inline-flex">Portfolio</TabsTrigger>
                <TabsTrigger value="deposit" className="hidden md:inline-flex">Deposit</TabsTrigger>
                <TabsTrigger value="withdraw" className="hidden md:inline-flex">Withdraw</TabsTrigger>
                <TabsTrigger value="profile" className="hidden md:inline-flex">Profile</TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <Overview 
              portfolioAssets={portfolioAssets}
              totalPortfolioValue={totalPortfolioValue}
              monthlyPerformanceData={monthlyPerformanceData}
              allocationData={allocationData}
            />

            {/* Other tabs */}
            <TabsContent value="portfolio" className="space-y-4">
              <TabContent title="Portfolio Details" />
            </TabsContent>

            <TabsContent value="deposit" className="space-y-4">
              <TabContent title="Deposit Funds" />
            </TabsContent>

            <TabsContent value="withdraw" className="space-y-4">
              <TabContent title="Withdraw Funds" />
            </TabsContent>

            <TabsContent value="profile" className="space-y-4">
              <TabContent title="Your Profile" />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Mobile navigation */}
      <MobileNavigation />
      
      <ChatBubble />
    </div>
  );
};

export default Dashboard;

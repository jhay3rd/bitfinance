
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

// Import from Recharts if they're not already imported in Overview
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

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
              <Overview 
                portfolioAssets={portfolioAssets}
                totalPortfolioValue={totalPortfolioValue}
                monthlyPerformanceData={monthlyPerformanceData}
                allocationData={allocationData}
              />
              
              {/* Add Investment Plans to Overview */}
              <InvestmentPlans />
            </TabsContent>

            <TabsContent 
              value="portfolio" 
              className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500"
            >
              <div className="grid gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Your Investment Portfolio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h4 className="font-medium mb-3">Portfolio Performance</h4>
                      <div className="h-72 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={monthlyPerformanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" vertical={false} />
                            <XAxis dataKey="name" tickLine={false} axisLine={false} />
                            <YAxis 
                              tickFormatter={(value) => `$${value.toLocaleString()}`} 
                              tickLine={false}
                              axisLine={false}
                              width={80}
                            />
                            <Tooltip 
                              formatter={(value) => [`$${value.toLocaleString()}`, "Value"]} 
                              labelFormatter={(label) => `Month: ${label}`}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#8884d8" 
                              strokeWidth={3}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6, strokeWidth: 2 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Asset Allocation</h4>
                      <div className="h-72 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height="70%">
                          <PieChart>
                            <Pie
                              data={allocationData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              innerRadius={40}
                              dataKey="value"
                              labelLine={false}
                            >
                              {allocationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-2 gap-2 w-full mt-2">
                          {allocationData.map((asset, index) => (
                            <div key={index} className="flex items-center text-xs">
                              <div className="w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: asset.fill }}></div>
                              <span>{asset.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Current Investments */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4">Active Investments</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Plan</th>
                          <th className="text-left py-3 px-4">Amount</th>
                          <th className="text-left py-3 px-4">Start Date</th>
                          <th className="text-left py-3 px-4">End Date</th>
                          <th className="text-left py-3 px-4">Expected Return</th>
                          <th className="text-left py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">Monthly Builder</td>
                          <td className="py-3 px-4">$2,500.00</td>
                          <td className="py-3 px-4">Apr 15, 2023</td>
                          <td className="py-3 px-4">May 15, 2023</td>
                          <td className="py-3 px-4 text-green-600">$250.00 (10%)</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                              In Progress (20 days left)
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Quarterly Accelerator</td>
                          <td className="py-3 px-4">$5,000.00</td>
                          <td className="py-3 px-4">Mar 1, 2023</td>
                          <td className="py-3 px-4">Jun 1, 2023</td>
                          <td className="py-3 px-4 text-green-600">$1,250.00 (25%)</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              In Progress (5 days left)
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Historical Investments */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4">Investment History</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Plan</th>
                          <th className="text-left py-3 px-4">Amount</th>
                          <th className="text-left py-3 px-4">Start Date</th>
                          <th className="text-left py-3 px-4">End Date</th>
                          <th className="text-left py-3 px-4">Return</th>
                          <th className="text-left py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">Daily Trader</td>
                          <td className="py-3 px-4">$1,000.00</td>
                          <td className="py-3 px-4">Apr 10, 2023</td>
                          <td className="py-3 px-4">Apr 11, 2023</td>
                          <td className="py-3 px-4 text-green-600">$12.00 (1.2%)</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Completed
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Weekly Growth</td>
                          <td className="py-3 px-4">$2,000.00</td>
                          <td className="py-3 px-4">Mar 15, 2023</td>
                          <td className="py-3 px-4">Mar 22, 2023</td>
                          <td className="py-3 px-4 text-green-600">$104.00 (5.2%)</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Completed
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Monthly Builder</td>
                          <td className="py-3 px-4">$3,000.00</td>
                          <td className="py-3 px-4">Feb 1, 2023</td>
                          <td className="py-3 px-4">Mar 1, 2023</td>
                          <td className="py-3 px-4 text-green-600">$345.00 (11.5%)</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Completed
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent 
              value="deposit" 
              className="animate-in fade-in slide-in-from-right-8 duration-500"
            >
              <DepositOptions />
            </TabsContent>

            <TabsContent 
              value="withdraw" 
              className="animate-in fade-in slide-in-from-right-8 duration-500"
            >
              <WithdrawOptions />
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

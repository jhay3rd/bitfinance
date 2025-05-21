
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import SummaryCards from "./SummaryCards";
import PerformanceChart from "./PerformanceChart";
import AllocationChart from "./AllocationChart";
import PortfolioAssets from "./PortfolioAssets";
import { PortfolioAsset } from "@/models/dashboard";

interface OverviewProps {
  portfolioAssets: PortfolioAsset[];
  totalPortfolioValue: number;
  monthlyPerformanceData: Array<{ name: string; value: number }>;
  allocationData: Array<{ name: string; value: number; fill: string }>;
}

const Overview: React.FC<OverviewProps> = ({
  portfolioAssets,
  totalPortfolioValue,
  monthlyPerformanceData,
  allocationData,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <SummaryCards 
        totalPortfolioValue={totalPortfolioValue} 
        totalAssets={portfolioAssets.length}
      />

      <div className="grid gap-4 md:grid-cols-7">
        <div className="md:col-span-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <PerformanceChart data={monthlyPerformanceData} />
        </div>
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <AllocationChart data={allocationData} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <PortfolioAssets assets={portfolioAssets} />
      </div>
    </div>
  );
};

export default Overview;

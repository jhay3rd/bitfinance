
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
    <TabsContent value="overview" className="space-y-6">
      <SummaryCards 
        totalPortfolioValue={totalPortfolioValue} 
        totalAssets={portfolioAssets.length}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <PerformanceChart data={monthlyPerformanceData} />
        <AllocationChart data={allocationData} />
      </div>

      <PortfolioAssets assets={portfolioAssets} />
    </TabsContent>
  );
};

export default Overview;

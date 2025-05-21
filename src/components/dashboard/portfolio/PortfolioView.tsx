
import React from "react";
import PortfolioPerformance from "./PortfolioPerformance";
import AssetAllocationChart from "./AssetAllocationChart";
import InvestmentTable from "./InvestmentTable";

interface PerformanceData {
  name: string;
  value: number;
}

interface AllocationData {
  name: string;
  value: number;
  fill: string;
}

interface PortfolioViewProps {
  monthlyPerformanceData: PerformanceData[];
  allocationData: AllocationData[];
}

const PortfolioView: React.FC<PortfolioViewProps> = ({ 
  monthlyPerformanceData,
  allocationData
}) => {
  return (
    <div className="grid gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6">Your Investment Portfolio</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <PortfolioPerformance monthlyPerformanceData={monthlyPerformanceData} />
          </div>
          <div>
            <AssetAllocationChart allocationData={allocationData} />
          </div>
        </div>
      </div>
      
      <InvestmentTable title="Active Investments" />
      <InvestmentTable title="Investment History" isHistory={true} />
    </div>
  );
};

export default PortfolioView;

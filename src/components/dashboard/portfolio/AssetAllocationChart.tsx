
import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

interface AllocationData {
  name: string;
  value: number;
  fill: string;
}

interface AssetAllocationChartProps {
  allocationData: AllocationData[];
}

const AssetAllocationChart: React.FC<AssetAllocationChartProps> = ({ allocationData }) => {
  return (
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
  );
};

export default AssetAllocationChart;

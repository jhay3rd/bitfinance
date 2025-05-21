
import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface PerformanceData {
  name: string;
  value: number;
}

interface PortfolioPerformanceProps {
  monthlyPerformanceData: PerformanceData[];
}

const PortfolioPerformance: React.FC<PortfolioPerformanceProps> = ({ monthlyPerformanceData }) => {
  return (
    <div>
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
  );
};

export default PortfolioPerformance;

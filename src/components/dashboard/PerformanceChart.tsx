
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PerformanceChartProps {
  data: Array<{ name: string; value: number }>;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-medium mb-2">Portfolio Performance</h3>
      <p className="text-muted-foreground text-sm mb-4">Monthly growth over time</p>
      <div className="flex-1 w-full min-h-[200px] md:min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              tickFormatter={(value) => formatCurrency(value)} 
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              width={60}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), "Value"]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1e3a8a"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;

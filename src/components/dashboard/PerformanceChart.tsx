
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";

interface PerformanceData {
  name: string;
  value: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <Card className="md:col-span-4">
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <LineChart width={500} height={300} data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#1e3a8a" 
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="none" 
            fillOpacity={1} 
            fill="url(#colorValue)"
          />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;

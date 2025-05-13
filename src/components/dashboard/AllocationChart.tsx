
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface AllocationData {
  name: string;
  value: number;
  fill: string;
}

interface AllocationChartProps {
  data: AllocationData[];
}

const AllocationChart: React.FC<AllocationChartProps> = ({ data }) => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart width={300} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1e3a8a" />
        </BarChart>
      </CardContent>
    </Card>
  );
};

export default AllocationChart;

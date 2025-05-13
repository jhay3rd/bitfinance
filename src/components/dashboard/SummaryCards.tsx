
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp } from "lucide-react";
import { LineChart, BarChart } from "lucide-react";

interface SummaryCardsProps {
  totalPortfolioValue: number;
  monthlyProfit?: number;
  totalAssets: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalPortfolioValue,
  monthlyProfit = 2840.50,
  totalAssets,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</div>
          <p className="text-xs text-green-600 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" /> +12.5% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Profit</CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${monthlyProfit.toLocaleString()}</div>
          <p className="text-xs text-green-600 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" /> +5.2% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAssets}</div>
          <p className="text-xs text-muted-foreground">Across multiple exchanges</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;

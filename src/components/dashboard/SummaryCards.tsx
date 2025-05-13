
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface SummaryCardsProps {
  totalPortfolioValue: number;
  totalAssets: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalPortfolioValue, totalAssets }) => {
  // Mock data for demonstration
  const portfolioChange = 2.4;
  const dailyProfit = 837.24;
  const dailyProfitChange = 1.8;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">Total Portfolio Value</p>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl md:text-3xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(totalPortfolioValue)}
              </h2>
              <div className={`flex items-center text-sm ${portfolioChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {portfolioChange >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                <span>{Math.abs(portfolioChange)}%</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${portfolioChange * 10}%` }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">Daily Profit/Loss</p>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl md:text-3xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(dailyProfit)}
              </h2>
              <div className={`flex items-center text-sm ${dailyProfitChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {dailyProfitChange >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                <span>{Math.abs(dailyProfitChange)}%</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: `${dailyProfitChange * 20}%` }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl md:text-3xl font-bold">{totalAssets}</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Cryptocurrencies</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Asset Diversity</span>
              <span className="font-medium">Good</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;

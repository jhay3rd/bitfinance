
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { PortfolioAsset } from "@/models/dashboard";

interface PortfolioAssetCardProps {
  asset: PortfolioAsset;
}

const PortfolioAssetCard: React.FC<PortfolioAssetCardProps> = ({ asset }) => {
  const { name, symbol, amount, value, change24h, icon } = asset;

  return (
    <Card className="overflow-hidden border-0 shadow-sm transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <img
              src={icon}
              alt={name}
              className="h-10 w-10 rounded-full bg-gray-100 p-1"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://cryptologos.cc/logos/placeholder.svg";
              }}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{name}</h3>
              <div className={`flex items-center text-xs ${change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                {change24h >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(change24h)}%
              </div>
            </div>
            <div className="flex items-end justify-between mt-1">
              <div className="text-xs text-muted-foreground">
                {amount} {symbol}
              </div>
              <div className="text-sm font-semibold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(value)}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${change24h >= 0 ? "bg-green-500" : "bg-red-500"}`} 
              style={{ width: `${Math.min(Math.abs(change24h * 10), 100)}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioAssetCard;

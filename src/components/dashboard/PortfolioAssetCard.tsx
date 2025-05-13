
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PortfolioAsset {
  id: number;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change24h: number;
  color: string;
  icon: string;
}

interface PortfolioAssetCardProps {
  asset: PortfolioAsset;
}

const PortfolioAssetCard: React.FC<PortfolioAssetCardProps> = ({ asset }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={asset.icon} alt={asset.name} className="w-8 h-8 mr-3" />
            <div>
              <h3 className="font-bold">{asset.name}</h3>
              <p className="text-sm text-gray-500">{asset.symbol}</p>
            </div>
          </div>
          <div>
            <p className="font-semibold">${asset.value.toLocaleString()}</p>
            <p className={`text-sm flex items-center justify-end ${
              asset.change24h >= 0 ? "text-green-600" : "text-red-600"
            }`}>
              {asset.change24h >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {asset.change24h >= 0 ? "+" : ""}{asset.change24h}%
            </p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-500">Amount</p>
          <p className="font-medium">{asset.amount} {asset.symbol}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioAssetCard;

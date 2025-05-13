
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CryptoPriceCardProps {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image: string;
}

const CryptoPriceCard: React.FC<CryptoPriceCardProps> = ({
  name,
  symbol,
  price,
  change24h,
  volume24h,
  marketCap,
  image,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    } else {
      return formatCurrency(value);
    }
  };

  const isPositiveChange = change24h >= 0;

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={image} alt={name} className="w-8 h-8 mr-3" />
            <div>
              <h3 className="font-bold">{name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{symbol.toUpperCase()}</p>
            </div>
          </div>
          <div className="text-right">
            <h4 className="font-semibold">{formatCurrency(price)}</h4>
            <p 
              className={`text-sm flex items-center justify-end ${
                isPositiveChange ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isPositiveChange ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {isPositiveChange ? '+' : ''}{change24h.toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="text-sm">
            <p className="text-gray-500 dark:text-gray-400">Market Cap</p>
            <p className="font-medium">{formatLargeNumber(marketCap)}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500 dark:text-gray-400">24h Volume</p>
            <p className="font-medium">{formatLargeNumber(volume24h)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoPriceCard;

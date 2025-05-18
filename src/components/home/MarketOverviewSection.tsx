import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CryptoPriceCard from "@/components/CryptoPriceCard";
import axios from "axios";

interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image: string;
}

const MarketOverviewSection: React.FC = () => {
  const navigate = useNavigate();
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);

  // Fetch live data from CoinGecko
  const fetchMarketData = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 4,
            page: 1,
            sparkline: false,
            price_change_percentage: "24h",
          },
        }
      );
      const data = res.data.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h,
        volume24h: coin.total_volume,
        marketCap: coin.market_cap,
        image: coin.image,
      }));
      setCryptoData(data);
    } catch (error) {
      // Optionally handle error
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30 * 60 * 1000); // 30 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Real-Time Market Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay updated with live cryptocurrency prices, market caps, and trading volumes. Our AI-powered analytics provide insights to make informed investment decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cryptoData.map(crypto => (
            <CryptoPriceCard 
              key={crypto.id}
              name={crypto.name}
              symbol={crypto.symbol}
              price={crypto.price}
              change24h={crypto.change24h}
              volume24h={crypto.volume24h}
              marketCap={crypto.marketCap}
              image={crypto.image}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-bitfinance-primary text-bitfinance-primary hover:bg-bitfinance-primary hover:text-white"
            onClick={() => navigate("/markets")}
          >
            View All Markets
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MarketOverviewSection;

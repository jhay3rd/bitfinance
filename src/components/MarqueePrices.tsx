import React, { useEffect, useState } from "react";
import axios from "axios";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  image: string;
}

const MarqueePrices: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  const fetchPrices = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        }
      );
      setCoins(
        res.data.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price,
          image: coin.image,
        }))
      );
    } catch (error) {
      // Optionally handle error
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden border-b border-blue-700">
      <div className="whitespace-nowrap animate-marquee flex items-center py-2">
        {coins.map((coin) => (
          <span key={coin.id} className="flex items-center mx-6 text-sm font-medium">
            <img src={coin.image} alt={coin.symbol} className="w-5 h-5 mr-2 rounded-full" />
            {coin.name} <span className="mx-1 text-xs text-blue-200">({coin.symbol})</span>
            <span className="ml-2 font-bold">${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarqueePrices; 
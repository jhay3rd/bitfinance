
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CryptoPriceCard from "@/components/CryptoPriceCard";

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
  
  // Mock data for crypto prices
  const cryptoData: CryptoData[] = [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "btc",
      price: 65432.78,
      change24h: 2.5,
      volume24h: 38500000000,
      marketCap: 1250000000000,
      image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022"
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: "eth",
      price: 3543.21,
      change24h: 1.8,
      volume24h: 17300000000,
      marketCap: 420000000000,
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022"
    },
    {
      id: 3,
      name: "Solana",
      symbol: "sol",
      price: 143.87,
      change24h: 4.2,
      volume24h: 9800000000,
      marketCap: 61000000000,
      image: "https://cryptologos.cc/logos/solana-sol-logo.png?v=022"
    },
    {
      id: 4,
      name: "Cardano",
      symbol: "ada",
      price: 0.52,
      change24h: -1.3,
      volume24h: 1200000000,
      marketCap: 18500000000,
      image: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=022"
    },
  ];
  
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

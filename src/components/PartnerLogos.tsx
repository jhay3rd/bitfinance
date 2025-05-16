
import React from "react";
import { Card } from "@/components/ui/card";

const PartnerLogos: React.FC = () => {
  const partners = [
    { 
      name: "Binance", 
      logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg",
      image: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=025"
    },
    { 
      name: "Bybit", 
      logo: "https://cryptologos.cc/logos/bybit-logo.svg",
      image: "https://cryptologos.cc/logos/bybit-bbt-logo.svg?v=025"
    },
    { 
      name: "TradingView", 
      logo: "https://www.tradingview.com/pine-script-docs/en/v5/_images/tradingview-logo.svg",
      image: "https://static.tradingview.com/static/images/logo-tradingview.svg"
    },
    { 
      name: "Skrill", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Skrill_logo.svg",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Skrill_logo.svg"
    },
    { 
      name: "PayPal", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"
    },
    { 
      name: "Kraken", 
      logo: "https://cryptologos.cc/logos/kraken-logo.svg",
      image: "https://cryptologos.cc/logos/kraken-krak-logo.svg?v=025"
    },
    { 
      name: "Coinbase", 
      logo: "https://cryptologos.cc/logos/coinbase-logo.svg",
      image: "https://cryptologos.cc/logos/coinbase-coin-logo.svg?v=025"
    },
    { 
      name: "Metamask", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
    }
  ];

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-8">Our Partners & Supported Platforms</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {partners.map((partner, index) => (
            <Card key={index} className="p-4 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center">
                <img 
                  src={partner.image} 
                  alt={`${partner.name} logo`} 
                  className="h-10 md:h-16 w-auto object-contain" 
                />
                <p className="text-xs mt-2 text-center text-gray-600 dark:text-gray-400">{partner.name}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerLogos;

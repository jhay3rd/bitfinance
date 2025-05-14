
import React, { useState } from "react";

interface CryptoOption {
  name: string;
  symbol: string;
  logo: string;
  fee: string;
  value: string;
}

interface CryptoDepositOptionProps {
  setSelectedCrypto?: (crypto: string) => void;
}

const CryptoDepositOption: React.FC<CryptoDepositOptionProps> = ({ setSelectedCrypto }) => {
  const [selectedValue, setSelectedValue] = useState("btc");
  
  const cryptoOptions: CryptoOption[] = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      fee: "0.0005 BTC",
      value: "btc"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      fee: "0.005 ETH",
      value: "eth"
    },
    {
      name: "Tether",
      symbol: "USDT",
      logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      fee: "1 USDT",
      value: "usdt"
    }
  ];

  const handleCryptoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (setSelectedCrypto) {
      setSelectedCrypto(value);
    }
  };

  return (
    <div className="space-y-4">
      {cryptoOptions.map((crypto) => (
        <div key={crypto.symbol} className="flex items-center justify-between p-3 bg-primary/5 rounded-md">
          <div className="flex items-center">
            <img src={crypto.logo} alt={crypto.name} className="w-8 h-8 mr-3" />
            <div>
              <p className="font-medium">{crypto.name} ({crypto.symbol})</p>
              <p className="text-xs text-muted-foreground">Network fee: {crypto.fee}</p>
            </div>
          </div>
          <input 
            type="radio" 
            name="selectedCrypto" 
            value={crypto.value} 
            checked={selectedValue === crypto.value}
            onChange={handleCryptoChange}
            className="h-4 w-4" 
          />
        </div>
      ))}
      <input type="hidden" name="selectedCrypto" value={selectedValue} />
    </div>
  );
};

export default CryptoDepositOption;

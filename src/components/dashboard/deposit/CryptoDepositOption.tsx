
import React from "react";

interface CryptoOption {
  name: string;
  symbol: string;
  logo: string;
  fee: string;
}

const CryptoDepositOption: React.FC = () => {
  const cryptoOptions: CryptoOption[] = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      fee: "0.0005 BTC"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      fee: "0.005 ETH"
    },
    {
      name: "Tether",
      symbol: "USDT",
      logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      fee: "1 USDT"
    }
  ];

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
          <input type="radio" name="crypto" value={crypto.symbol.toLowerCase()} defaultChecked={crypto.symbol === "BTC"} className="h-4 w-4" />
        </div>
      ))}
    </div>
  );
};

export default CryptoDepositOption;

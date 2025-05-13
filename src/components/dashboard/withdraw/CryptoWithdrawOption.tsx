
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface CryptoWithdrawOptionProps {
  selectedCrypto: string;
  setSelectedCrypto: (value: string) => void;
  selectedNetwork: string;
  setSelectedNetwork: (value: string) => void;
  withdrawalAddress: string;
  setWithdrawalAddress: (value: string) => void;
  amount: string;
}

const CryptoWithdrawOption: React.FC<CryptoWithdrawOptionProps> = ({
  selectedCrypto,
  setSelectedCrypto,
  selectedNetwork,
  setSelectedNetwork,
  withdrawalAddress,
  setWithdrawalAddress,
  amount
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Select Cryptocurrency</label>
        <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
          <SelectTrigger>
            <SelectValue placeholder="Select cryptocurrency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
            <SelectItem value="eth">Ethereum (ETH)</SelectItem>
            <SelectItem value="usdt">Tether (USDT)</SelectItem>
            <SelectItem value="sol">Solana (SOL)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {selectedCrypto && (
        <div>
          <label className="block text-sm font-medium mb-1">Select Network</label>
          <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
            <SelectTrigger>
              <SelectValue placeholder="Select network" />
            </SelectTrigger>
            <SelectContent>
              {selectedCrypto === "btc" && <SelectItem value="bitcoin">Bitcoin</SelectItem>}
              {selectedCrypto === "eth" && (
                <>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                </>
              )}
              {selectedCrypto === "usdt" && (
                <>
                  <SelectItem value="erc20">Ethereum (ERC20)</SelectItem>
                  <SelectItem value="trc20">Tron (TRC20)</SelectItem>
                  <SelectItem value="bep20">Binance Smart Chain (BEP20)</SelectItem>
                </>
              )}
              {selectedCrypto === "sol" && <SelectItem value="solana">Solana</SelectItem>}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium mb-1">Wallet Address</label>
        <Input
          placeholder="Enter your wallet address"
          value={withdrawalAddress}
          onChange={(e) => setWithdrawalAddress(e.target.value)}
          className="w-full"
        />
      </div>
      
      {selectedCrypto && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
          <div className="flex justify-between text-sm">
            <p className="text-muted-foreground">Network Fee</p>
            <p className="font-medium">
              {selectedCrypto === "btc" ? "0.0005 BTC" : 
               selectedCrypto === "eth" ? "0.005 ETH" :
               selectedCrypto === "usdt" ? "1 USDT" : "0.01 SOL"}
            </p>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <p className="text-muted-foreground">You will receive</p>
            <p className="font-medium">
              {amount ? `${(Number(amount) * 0.98).toFixed(2)} USD worth of ${selectedCrypto.toUpperCase()}` : "0 USD"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoWithdrawOption;

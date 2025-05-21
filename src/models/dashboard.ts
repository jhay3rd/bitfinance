
export interface PortfolioAsset {
  id: number;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change24h: number;
  color: string;
  icon: string;
}

export interface PerformanceData {
  name: string;
  value: number;
}

export interface AllocationData {
  name: string;
  value: number;
  fill: string;
}

// Mock portfolio data
export const portfolioAssets: PortfolioAsset[] = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    amount: 0.458,
    value: 29968.32,
    change24h: 2.5,
    color: "#F7931A",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    amount: 3.245,
    value: 11487.29,
    change24h: 1.8,
    color: "#627EEA",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022",
  },
  {
    id: 3,
    name: "Solana",
    symbol: "SOL",
    amount: 45.78,
    value: 6582.21,
    change24h: 4.2,
    color: "#00FFA3",
    icon: "https://cryptologos.cc/logos/solana-sol-logo.png?v=022",
  },
  {
    id: 4,
    name: "Cardano",
    symbol: "ADA",
    amount: 5870,
    value: 3052.40,
    change24h: -1.3,
    color: "#0033AD",
    icon: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=022",
  },
];

// Monthly performance data for chart
export const monthlyPerformanceData: PerformanceData[] = [
  { name: "Jan", value: 48500 },
  { name: "Feb", value: 45300 },
  { name: "Mar", value: 52800 },
  { name: "Apr", value: 49700 },
  { name: "May", value: 53600 },
  { name: "Jun", value: 48900 },
  { name: "Jul", value: 51090 },
];

// Calculate total portfolio value
export const getTotalPortfolioValue = (assets: PortfolioAsset[]): number => {
  return assets.reduce((total, asset) => total + asset.value, 0);
};

// Asset allocation data for chart
export const getAllocationData = (assets: PortfolioAsset[]): AllocationData[] => {
  return assets.map((asset) => ({
    name: asset.symbol,
    value: asset.value,
    fill: asset.color,
  }));
};


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CryptoData {
  id: number;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  change7d: number;
  logo: string;
}

const Markets: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CryptoData;
    direction: "ascending" | "descending";
  }>({
    key: "rank",
    direction: "ascending",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Mock crypto data
  const cryptoData: CryptoData[] = [
    {
      id: 1,
      rank: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: 65432.78,
      marketCap: 1250000000000,
      volume24h: 38500000000,
      change24h: 2.5,
      change7d: 7.8,
      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022",
    },
    {
      id: 2,
      rank: 2,
      name: "Ethereum",
      symbol: "ETH",
      price: 3543.21,
      marketCap: 420000000000,
      volume24h: 17300000000,
      change24h: 1.8,
      change7d: 4.2,
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022",
    },
    {
      id: 3,
      rank: 3,
      name: "Binance Coin",
      symbol: "BNB",
      price: 654.32,
      marketCap: 98000000000,
      volume24h: 2300000000,
      change24h: -0.5,
      change7d: 2.1,
      logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=022",
    },
    {
      id: 4,
      rank: 4,
      name: "Solana",
      symbol: "SOL",
      price: 143.87,
      marketCap: 61000000000,
      volume24h: 9800000000,
      change24h: 4.2,
      change7d: 12.5,
      logo: "https://cryptologos.cc/logos/solana-sol-logo.png?v=022",
    },
    {
      id: 5,
      rank: 5,
      name: "Ripple",
      symbol: "XRP",
      price: 0.62,
      marketCap: 31500000000,
      volume24h: 1690000000,
      change24h: 0.8,
      change7d: -1.2,
      logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png?v=022",
    },
    {
      id: 6,
      rank: 6,
      name: "Cardano",
      symbol: "ADA",
      price: 0.52,
      marketCap: 18500000000,
      volume24h: 1200000000,
      change24h: -1.3,
      change7d: -3.7,
      logo: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=022",
    },
    {
      id: 7,
      rank: 7,
      name: "Polkadot",
      symbol: "DOT",
      price: 22.75,
      marketCap: 16200000000,
      volume24h: 1050000000,
      change24h: 3.1,
      change7d: 8.3,
      logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=022",
    },
    {
      id: 8,
      rank: 8,
      name: "Avalanche",
      symbol: "AVAX",
      price: 34.76,
      marketCap: 12800000000,
      volume24h: 870000000,
      change24h: -2.3,
      change7d: -5.1,
      logo: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=022",
    },
    {
      id: 9,
      rank: 9,
      name: "Dogecoin",
      symbol: "DOGE",
      price: 0.18,
      marketCap: 11900000000,
      volume24h: 950000000,
      change24h: 6.7,
      change7d: 15.3,
      logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=022",
    },
    {
      id: 10,
      rank: 10,
      name: "Chainlink",
      symbol: "LINK",
      price: 17.82,
      marketCap: 10600000000,
      volume24h: 730000000,
      change24h: 1.5,
      change7d: 3.9,
      logo: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=022",
    },
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleTrade = (cryptoName: string) => {
    toast({
      title: `Buy ${cryptoName}`,
      description: "Redirecting to deposit page to fund your account",
    });
    navigate("/dashboard/deposit");
  };

  const requestSort = (key: keyof CryptoData) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2,
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

  const getSortedData = () => {
    const filteredData = cryptoData.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Cryptocurrency Markets</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Track real-time prices, market cap, and trading volume for the top cryptocurrencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-sm text-gray-500">Market Cap</h3>
                  <p className="text-2xl font-bold">$2.45T</p>
                  <p className="text-xs text-green-600 flex items-center justify-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +2.4%
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-sm text-gray-500">24h Volume</h3>
                  <p className="text-2xl font-bold">$78.3B</p>
                  <p className="text-xs text-green-600 flex items-center justify-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +5.7%
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-sm text-gray-500">BTC Dominance</h3>
                  <p className="text-2xl font-bold">48.2%</p>
                  <p className="text-xs text-red-600 flex items-center justify-center">
                    <TrendingDown className="h-3 w-3 mr-1" /> -0.5%
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-sm text-gray-500">Active Coins</h3>
                  <p className="text-2xl font-bold">15,832</p>
                  <p className="text-xs text-green-600 flex items-center justify-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +82
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <CardTitle>Top Cryptocurrencies</CardTitle>
                <div className="relative mt-4 md:mt-0">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or symbol"
                    className="pl-8 w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription>
                Real-time prices of the top cryptocurrencies by market capitalization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                          onClick={() => requestSort("price")}
                        >
                          Price
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 hidden md:table-cell"
                          onClick={() => requestSort("change24h")}
                        >
                          24h %
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 hidden md:table-cell"
                          onClick={() => requestSort("change7d")}
                        >
                          7d %
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 hidden lg:table-cell"
                          onClick={() => requestSort("marketCap")}
                        >
                          Market Cap
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 hidden lg:table-cell"
                          onClick={() => requestSort("volume24h")}
                        >
                          Volume (24h)
                        </TableHead>
                        <TableHead className="hidden md:table-cell">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getSortedData().map((crypto) => (
                        <TableRow key={crypto.id}>
                          <TableCell className="font-medium">
                            {crypto.rank}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <img
                                src={crypto.logo}
                                alt={crypto.name}
                                className="h-6 w-6 mr-2"
                              />
                              <div>
                                <div className="font-medium">{crypto.name}</div>
                                <div className="text-sm text-gray-500">
                                  {crypto.symbol}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(crypto.price)}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div
                              className={`flex items-center ${
                                crypto.change24h >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {crypto.change24h >= 0 ? (
                                <TrendingUp className="h-4 w-4 mr-1" />
                              ) : (
                                <TrendingDown className="h-4 w-4 mr-1" />
                              )}
                              {crypto.change24h >= 0 ? "+" : ""}
                              {crypto.change24h.toFixed(2)}%
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div
                              className={`flex items-center ${
                                crypto.change7d >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {crypto.change7d >= 0 ? (
                                <TrendingUp className="h-4 w-4 mr-1" />
                              ) : (
                                <TrendingDown className="h-4 w-4 mr-1" />
                              )}
                              {crypto.change7d >= 0 ? "+" : ""}
                              {crypto.change7d.toFixed(2)}%
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {formatLargeNumber(crypto.marketCap)}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {formatLargeNumber(crypto.volume24h)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => handleTrade(crypto.name)}
                            >
                              Trade
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Markets;

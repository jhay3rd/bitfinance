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
import axios from "axios";

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
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch live data from CoinGecko
  const fetchMarketData = async () => {
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
            price_change_percentage: "24h,7d",
          },
        }
      );
      const data = res.data.map((coin: any, idx: number) => ({
        id: coin.id,
        rank: coin.market_cap_rank,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        marketCap: coin.market_cap,
        volume24h: coin.total_volume,
        change24h: coin.price_change_percentage_24h,
        change7d: coin.price_change_percentage_7d_in_currency,
        logo: coin.image,
      }));
      setCryptoData(data);
      setIsLoaded(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch market data",
        description: (error as any)?.message || "Could not load crypto prices.",
      });
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30 * 60 * 1000); // 30 minutes
    return () => clearInterval(interval);
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

  useEffect(() => {
    const scriptId = 'cmc-widget-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://widgets.coinmarketcap.com/v2/ticker/1/?base=USD&theme=light&transparent=true&autosize=true';
      document.getElementById('coinmarketcap-widget-1')?.appendChild(script);
    }
  }, []);

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

          {/* Live Chart Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Live Bitcoin Chart</h2>
            <div className="flex justify-center">
              <div id="coinmarketcap-widget-1" style={{ width: '100%', maxWidth: 900 }}></div>
            </div>
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

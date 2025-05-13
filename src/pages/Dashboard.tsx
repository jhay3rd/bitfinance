
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BarChart, LineChart } from "recharts";
import {
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  Wallet,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  TrendingDown,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ChatBubble from "@/components/ChatBubble";

interface PortfolioAsset {
  id: number;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change24h: number;
  color: string;
  icon: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock portfolio data
  const portfolioAssets: PortfolioAsset[] = [
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

  // Calculate total portfolio value
  const totalPortfolioValue = portfolioAssets.reduce(
    (total, asset) => total + asset.value,
    0
  );

  // Monthly performance data for chart
  const monthlyPerformanceData = [
    { name: "Jan", value: 48500 },
    { name: "Feb", value: 45300 },
    { name: "Mar", value: 52800 },
    { name: "Apr", value: 49700 },
    { name: "May", value: 53600 },
    { name: "Jun", value: 48900 },
    { name: "Jul", value: 51090 },
  ];
  
  // Asset allocation data for chart
  const allocationData = portfolioAssets.map((asset) => ({
    name: asset.symbol,
    value: asset.value,
    fill: asset.color,
  }));

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Dashboard header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate("/")} className="flex items-center">
              <div className="h-8 w-8 bg-bitfinance-primary rounded-lg mr-2 flex items-center justify-center text-white font-bold">
                BF
              </div>
              <span className="text-lg font-bold">BitFinance</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
            <Avatar>
              <AvatarFallback className="bg-bitfinance-primary text-white">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 w-16 sm:w-64 h-[calc(100vh-64px)] border-r bg-background hidden md:block">
          <div className="flex h-full flex-col gap-2 p-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <BarChartIcon className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Overview</span>
            </Button>
            <Button
              variant={activeTab === "portfolio" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("portfolio")}
            >
              <LineChartIcon className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Portfolio</span>
            </Button>
            <Button
              variant={activeTab === "deposit" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("deposit")}
            >
              <Wallet className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Deposit</span>
            </Button>
            <Button
              variant={activeTab === "withdraw" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("withdraw")}
            >
              <CreditCard className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Withdraw</span>
            </Button>
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("profile")}
            >
              <User className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-16 sm:ml-64 p-4 sm:p-6">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <TabsList className="grid grid-cols-5 md:w-auto md:block">
                <TabsTrigger value="overview" className="hidden md:inline-flex">Overview</TabsTrigger>
                <TabsTrigger value="portfolio" className="hidden md:inline-flex">Portfolio</TabsTrigger>
                <TabsTrigger value="deposit" className="hidden md:inline-flex">Deposit</TabsTrigger>
                <TabsTrigger value="withdraw" className="hidden md:inline-flex">Withdraw</TabsTrigger>
                <TabsTrigger value="profile" className="hidden md:inline-flex">Profile</TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</div>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> +12.5% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Profit</CardTitle>
                    <LineChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$2,840.50</div>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> +5.2% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                    <BarChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{portfolioAssets.length}</div>
                    <p className="text-xs text-muted-foreground">Across multiple exchanges</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="md:col-span-4">
                  <CardHeader>
                    <CardTitle>Portfolio Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <LineChart width={500} height={300} data={monthlyPerformanceData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <LineChart.CartesianGrid strokeDasharray="3 3" />
                      <LineChart.Tooltip />
                      <LineChart.Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#1e3a8a" 
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                      <LineChart.Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="none" 
                        fillOpacity={1} 
                        fill="url(#colorValue)"
                      />
                    </LineChart>
                  </CardContent>
                </Card>
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Asset Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart width={300} height={300} data={allocationData}>
                      <BarChart.CartesianGrid strokeDasharray="3 3" />
                      <BarChart.XAxis dataKey="name" />
                      <BarChart.YAxis />
                      <BarChart.Tooltip />
                      <BarChart.Bar dataKey="value" fill="#1e3a8a" />
                    </BarChart>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-xl font-semibold mt-6">Your Assets</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {portfolioAssets.map((asset) => (
                  <Card key={asset.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img src={asset.icon} alt={asset.name} className="w-8 h-8 mr-3" />
                          <div>
                            <h3 className="font-bold">{asset.name}</h3>
                            <p className="text-sm text-gray-500">{asset.symbol}</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">${asset.value.toLocaleString()}</p>
                          <p className={`text-sm flex items-center justify-end ${
                            asset.change24h >= 0 ? "text-green-600" : "text-red-600"
                          }`}>
                            {asset.change24h >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {asset.change24h >= 0 ? "+" : ""}{asset.change24h}%
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-medium">{asset.amount} {asset.symbol}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Portfolio details and more comprehensive analytics will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deposit" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Deposit Funds</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Deposit options and instructions will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="withdraw" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Withdraw Funds</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Withdrawal options and instructions will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Profile information and settings will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Mobile navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background md:hidden">
        <div className="grid grid-cols-5 h-16">
          <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
            <BarChartIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Overview</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
            <LineChartIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Portfolio</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
            <Wallet className="h-5 w-5" />
            <span className="text-xs mt-1">Deposit</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
            <CreditCard className="h-5 w-5" />
            <span className="text-xs mt-1">Withdraw</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </div>
      
      <ChatBubble />
    </div>
  );
};

export default Dashboard;

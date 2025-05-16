import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import CryptoPriceCard from "@/components/CryptoPriceCard";
import NewsCard from "@/components/NewsCard";
import { TrendingUp, Lock, BarChart, MessageCircle, Settings, Zap } from "lucide-react";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Mock data for crypto prices
  const cryptoData = [
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

  // Mock data for news
  const newsData = [
    {
      id: 1,
      title: "Bitcoin Hits New All-Time High as Institutional Adoption Grows",
      description: "Bitcoin surges to new heights as major financial institutions continue to adopt the leading cryptocurrency.",
      imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      source: "CryptoNews",
      date: "2 hours ago",
      url: "#",
      tags: ["Bitcoin", "Trending"]
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-bitfinance-background to-black py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')] opacity-20 bg-no-repeat bg-cover"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-bitfinance-primary/40 to-bitfinance-secondary/40"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Intelligent Crypto <span className="text-bitfinance-secondary">Investment</span> Platform
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            BitFinance leverages AI technology to provide intelligent crypto investment strategies, real-time market data, and portfolio management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="text-lg bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary hover:opacity-90 transition-opacity"
              onClick={() => navigate("/register")}
            >
              Start Investing
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/30"
              onClick={() => navigate("/features")}
            >
              Explore Features
            </Button>
          </div>
          
          {/* Floating stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="glass-card bg-white/10 backdrop-blur-md border-white/20 text-white animate-float">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-bitfinance-secondary/20 flex items-center justify-center mb-3">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Analytics</h3>
                <p className="text-gray-300">Advanced market predictions with 85% accuracy rate</p>
              </CardContent>
            </Card>
            <Card className="glass-card bg-white/10 backdrop-blur-md border-white/20 text-white animate-float delay-150">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-bitfinance-secondary/20 flex items-center justify-center mb-3">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Bank-Grade Security</h3>
                <p className="text-gray-300">Enterprise-level encryption and multi-factor authentication</p>
              </CardContent>
            </Card>
            <Card className="glass-card bg-white/10 backdrop-blur-md border-white/20 text-white animate-float delay-300">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-bitfinance-secondary/20 flex items-center justify-center mb-3">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-Time Data</h3>
                <p className="text-gray-300">Lightning-fast updates on market movements and trends</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Market Overview Section */}
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
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Powerful Investment Features</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              BitFinance provides a comprehensive suite of tools and features to help you maximize your crypto investment strategy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced Portfolio Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track performance metrics, analyze risk exposure, and visualize your portfolio allocation with interactive charts.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Automated Trading Strategies</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Set up custom trading rules or leverage our AI-recommended strategies based on your risk tolerance.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Investment Assistant</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get personalized investment advice and market insights from our AI-powered assistant anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* News Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Latest Crypto News</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Stay informed with the latest developments in the crypto world, market trends, and important updates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {newsData.map(news => (
              <NewsCard 
                key={news.id}
                title={news.title}
                description={news.description}
                imageUrl={news.imageUrl}
                source={news.source}
                date={news.date}
                url={news.url}
                tags={news.tags}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              className="border-bitfinance-primary text-bitfinance-primary hover:bg-bitfinance-primary hover:text-white"
              onClick={() => navigate("/news")}
            >
              View All News
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Crypto Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are already using BitFinance to maximize their crypto investments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-bitfinance-primary hover:bg-gray-100"
              onClick={() => navigate("/register")}
            >
              Create Free Account
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/20"
              onClick={() => navigate("/contact")}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Index;


import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  LineChart,
  Lock,
  Wallet,
  MessageCircle,
  Settings,
  TrendingUp,
  Brain,
  Bell,
  CreditCard,
} from "lucide-react";

const Features: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for Intelligent Investing
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            BitFinance combines advanced AI technology with intuitive tools to help you make smarter investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-bitfinance-primary hover:bg-gray-100"
              onClick={() => navigate("/register")}
            >
              Get Started
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

      {/* Main Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Platform Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our comprehensive suite of tools and features designed to optimize your crypto investment experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our advanced machine learning algorithms analyze market trends, sentiment, and historical data to provide actionable insights.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Predictive market movement analysis
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Sentiment analysis from news and social media
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Personalized investment recommendations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced Portfolio Management</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Track, analyze, and optimize your crypto portfolio with comprehensive tools and real-time data.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Multi-exchange portfolio tracking
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Performance analytics and reporting
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Tax reporting and optimization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-Time Market Data</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Stay informed with up-to-the-second market data, price alerts, and customizable watchlists.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Live price feeds for 10,000+ cryptocurrencies
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Customizable price alerts and notifications
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Advanced charting with technical indicators
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Assistant & Support</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Get instant help and insights from our AI-powered assistant, available 24/7 to answer your questions.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    24/7 AI-powered support chatbot
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Market insights and explanations
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Personalized learning resources
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Bank-Grade Security</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your assets and data are protected with institutional-grade security measures and encryption.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Multi-factor authentication
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Advanced encryption for all data
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Regular security audits and compliance
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Automated Trading Strategies</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Set up and execute trading strategies based on your parameters or use AI-recommended strategies.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Custom trading rule creation
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    AI-recommended trading strategies
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-bitfinance-primary mr-2"></div>
                    Backtesting and strategy optimization
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Additional Platform Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore our full range of tools designed to enhance your crypto investment experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-900">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="font-bold mb-2">Smart Notifications</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get customized alerts for price movements, news, and portfolio changes.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-900">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="font-bold mb-2">Easy Deposits & Withdrawals</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Multiple payment methods and quick transaction processing.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-900">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="font-bold mb-2">Research & Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  In-depth market analysis and research reports on cryptocurrencies.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-900">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="font-bold mb-2">Multi-Currency Wallet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Secure storage for multiple cryptocurrencies all in one place.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience BitFinance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create your free account today and discover the power of AI-driven crypto investments.
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
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Features;

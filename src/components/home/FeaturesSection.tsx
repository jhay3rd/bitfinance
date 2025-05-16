
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Settings, MessageCircle } from "lucide-react";

const FeaturesSection: React.FC = () => {
  return (
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
  );
};

export default FeaturesSection;

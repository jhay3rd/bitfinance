
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Lock, Zap } from "lucide-react";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default HeroSection;

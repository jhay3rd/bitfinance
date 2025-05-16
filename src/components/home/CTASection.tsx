
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default CTASection;

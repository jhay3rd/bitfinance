
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import HeroSection from "@/components/home/HeroSection";
import MarketOverviewSection from "@/components/home/MarketOverviewSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import NewsSection from "@/components/home/NewsSection";
import CTASection from "@/components/home/CTASection";
import PartnerLogos from "@/components/PartnerLogos";

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      <HeroSection />
      <MarketOverviewSection />
      <FeaturesSection />
      <NewsSection />
      <PartnerLogos />
      <CTASection />
      
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Index;

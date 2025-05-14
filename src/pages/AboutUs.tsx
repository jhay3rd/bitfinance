
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, TrendingUp, Award } from "lucide-react";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About BitFinance</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Over 7+ years of excellence in providing intelligent crypto investment opportunities
          </p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Founded in 2016, BitFinance began as a small team of blockchain enthusiasts and financial experts with a vision to make cryptocurrency investments accessible, intelligent, and secure for everyone.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Over the past 7+ years, we've grown into a leading platform serving investors in over 120 countries, managing over $1.8 billion in assets, and delivering consistent returns through our AI-powered investment strategies.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Our commitment to innovation, security, and customer satisfaction has made BitFinance the preferred platform for both beginners and experienced crypto investors looking to maximize their returns in the volatile crypto market.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
                  alt="BitFinance team" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Core Values</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that have guided us through 7+ years of success in the crypto investment space.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-bitfinance-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Security First</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We prioritize the security of your assets and personal information above everything else.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-bitfinance-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovative Technology</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We leverage cutting-edge AI and blockchain technology to deliver superior investment performance.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-bitfinance-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Client-Centered</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our clients' success is our success. We are dedicated to providing exceptional service and support.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-bitfinance-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We strive for excellence in all aspects of our operation, from technology to customer service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Journey</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              How we've grown over the years to become a leader in the crypto investment space
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 text-right pr-8 hidden md:block">
                <h3 className="text-xl font-bold mb-1">2016</h3>
                <p className="text-gray-600 dark:text-gray-400">Founded by crypto enthusiasts</p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-2 h-2 rounded-full bg-bitfinance-primary"></div>
              </div>
              <div className="md:w-1/3 md:pl-8 md:hidden">
                <h3 className="text-xl font-bold mb-1">2016</h3>
                <p className="text-gray-600 dark:text-gray-400">Founded by crypto enthusiasts</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 text-right pr-8 hidden md:block"></div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-2 h-2 rounded-full bg-bitfinance-primary"></div>
              </div>
              <div className="md:w-1/3 md:pl-8">
                <h3 className="text-xl font-bold mb-1">2018</h3>
                <p className="text-gray-600 dark:text-gray-400">Launched our AI-powered investment platform</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 text-right pr-8 hidden md:block">
                <h3 className="text-xl font-bold mb-1">2020</h3>
                <p className="text-gray-600 dark:text-gray-400">Reached 100,000 active investors</p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-2 h-2 rounded-full bg-bitfinance-primary"></div>
              </div>
              <div className="md:w-1/3 md:pl-8 md:hidden">
                <h3 className="text-xl font-bold mb-1">2020</h3>
                <p className="text-gray-600 dark:text-gray-400">Reached 100,000 active investors</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 text-right pr-8 hidden md:block"></div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-2 h-2 rounded-full bg-bitfinance-primary"></div>
              </div>
              <div className="md:w-1/3 md:pl-8">
                <h3 className="text-xl font-bold mb-1">2022</h3>
                <p className="text-gray-600 dark:text-gray-400">Expanded to 120+ countries worldwide</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 text-right pr-8 hidden md:block">
                <h3 className="text-xl font-bold mb-1">2023</h3>
                <p className="text-gray-600 dark:text-gray-400">Surpassed $1 billion in managed assets</p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-2 h-2 rounded-full bg-bitfinance-primary"></div>
              </div>
              <div className="md:w-1/3 md:pl-8 md:hidden">
                <h3 className="text-xl font-bold mb-1">2023</h3>
                <p className="text-gray-600 dark:text-gray-400">Surpassed $1 billion in managed assets</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be a part of our success story and start your crypto investment journey with BitFinance today.
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
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default AboutUs;

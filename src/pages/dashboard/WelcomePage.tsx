
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { userDataService } from "@/services/userDataService";
import Header from "@/components/dashboard/Header";
import { useToast } from "@/hooks/use-toast";

const WelcomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleGetStarted = () => {
    // Mark that the user has seen the welcome screen
    userDataService.markWelcomeSeen();
    
    toast({
      title: "Welcome to BitFinance!",
      description: "Your dashboard is ready to use. Start by exploring our features.",
    });
    
    // Redirect to the main dashboard
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to BitFinance, {user?.fullName}!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Let's set up your personalized dashboard
            </p>
          </div>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-green-100 rounded-full p-1 dark:bg-green-900">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Your Account Is Ready</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your BitFinance account has been successfully created.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-green-100 rounded-full p-1 dark:bg-green-900">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Personal Dashboard</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your dashboard is personalized to you. All your data is private and secure.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-green-100 rounded-full p-1 dark:bg-green-900">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Empty Portfolio Ready</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your portfolio is set up and ready for your first investment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Get Started with These Steps</h2>
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">1. Explore Your Dashboard</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your dashboard gives you an overview of your investments, performance and portfolio.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">2. Make Your First Deposit</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add funds to your account to start investing in cryptocurrency.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">3. Choose an Investment Plan</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Select from our investment plans based on your goals and risk tolerance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary text-white px-8"
              onClick={handleGetStarted}
            >
              Go to My Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;

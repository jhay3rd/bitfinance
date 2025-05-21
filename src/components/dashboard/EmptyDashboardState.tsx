
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyDashboardStateProps {
  title: string;
  description: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const EmptyDashboardState: React.FC<EmptyDashboardStateProps> = ({
  title,
  description,
  activeTab,
  setActiveTab
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
        <TrendingUp className="h-10 w-10 text-bitfinance-primary" />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="default"
          size="lg"
          className="bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary"
          onClick={() => setActiveTab("deposit")}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Make Your First Deposit
        </Button>
        <Button
          variant="outline"
          size="lg"
          asChild
        >
          <Link to="/dashboard/plans">
            View Investment Plans
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyDashboardState;

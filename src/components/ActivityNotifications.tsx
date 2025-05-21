
import React, { useEffect, useState } from "react";
import { toast } from "@/components/ui/sonner";
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";

type ActivityType = "deposit" | "withdrawal" | "investment";

interface Activity {
  id: string;
  type: ActivityType;
  name: string;
  amount: number;
  currency: string;
}

// Random data generation
const firstNames = ["Alex", "Jamie", "Casey", "Jordan", "Taylor", "Morgan", "Avery", "Riley", "Quinn", "Skyler", "Cameron"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"];
const currencies = ["BTC", "ETH", "USDT", "BNB", "XRP", "SOL", "ADA", "DOGE", "USD"];

// Generate random activity
const generateRandomActivity = (): Activity => {
  const types: ActivityType[] = ["deposit", "withdrawal", "investment"];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName.charAt(0)}.`;
  
  // Amount between $150 and $20,000
  const amount = Math.floor(Math.random() * 19850) + 150;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: types[Math.floor(Math.random() * types.length)],
    name,
    amount,
    currency: currencies[Math.floor(Math.random() * currencies.length)]
  };
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "deposit":
      return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    case "withdrawal":
      return <ArrowDownRight className="h-4 w-4 text-amber-500" />;
    case "investment":
      return <RefreshCw className="h-4 w-4 text-blue-500" />;
  }
};

const getActivityMessage = (activity: Activity): string => {
  switch (activity.type) {
    case "deposit":
      return `just deposited ${formatCurrency(activity.amount)} in ${activity.currency}`;
    case "withdrawal":
      return `withdrew ${formatCurrency(activity.amount)} in ${activity.currency}`;
    case "investment":
      return `invested ${formatCurrency(activity.amount)} in ${activity.currency}`;
  }
};

const ActivityNotifications: React.FC = () => {
  useEffect(() => {
    // Initial notification
    setTimeout(() => {
      showRandomNotification();
    }, 5000);
    
    // Set interval for periodic notifications
    const interval = setInterval(() => {
      showRandomNotification();
    }, 30000 + Math.random() * 30000); // Random interval between 30-60 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const showRandomNotification = () => {
    const activity = generateRandomActivity();
    
    toast(
      <div className="flex items-center">
        <div className="mr-2">
          {getActivityIcon(activity.type)}
        </div>
        <div>
          <span className="font-semibold">{activity.name}</span> {getActivityMessage(activity)}
        </div>
      </div>,
      {
        duration: 5000,
        position: "bottom-left"
      }
    );
  };
  
  return null; // This component doesn't render anything itself
};

export default ActivityNotifications;

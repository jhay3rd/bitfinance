
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const BankDepositOption: React.FC = () => {
  const handleContactSupport = () => {
    window.open("https://t.me/BitFinanceSupport", "_blank");
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="font-medium">Bank Transfer Instructions</p>
        <p className="text-sm text-muted-foreground mt-2">
          For bank transfer deposits, our support team will provide you with the necessary banking details.
        </p>
      </div>
      
      <div className="bg-primary/5 p-6 rounded-lg text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <ExternalLink className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-medium">Contact Support on Telegram</h3>
        <p className="text-sm text-muted-foreground">
          Our support team will provide you with bank details and assist you throughout the transfer process.
        </p>
        <Button onClick={handleContactSupport} className="mt-4">
          Contact Support on Telegram
        </Button>
      </div>
      
      <div className="text-sm text-center text-muted-foreground mt-4">
        <p>Available 24/7 for all your banking needs</p>
      </div>
    </div>
  );
};

export default BankDepositOption;

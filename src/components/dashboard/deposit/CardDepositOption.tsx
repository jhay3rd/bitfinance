
import React from "react";
import { Input } from "@/components/ui/input";

const CardDepositOption: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Card Number</label>
        <Input placeholder="1234 5678 9012 3456" className="w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Expiration Date</label>
          <Input placeholder="MM/YY" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVV</label>
          <Input placeholder="123" className="w-full" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Cardholder Name</label>
        <Input placeholder="John Doe" className="w-full" />
      </div>
      <div className="flex items-center space-x-2">
        <img src="https://www.visa.com/images/visa-logo.png" alt="Visa" className="h-6" />
        <img src="https://www.mastercard.com/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg" alt="Mastercard" className="h-6" />
        <img src="https://www.discover.com/company/images/discover.gif" alt="Discover" className="h-6" />
      </div>
    </div>
  );
};

export default CardDepositOption;

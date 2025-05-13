
import React from "react";
import { Input } from "@/components/ui/input";

interface BankWithdrawOptionProps {
  amount: string;
}

const BankWithdrawOption: React.FC<BankWithdrawOptionProps> = ({ amount }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Bank Name</label>
        <Input placeholder="Enter bank name" className="w-full" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Account Holder Name</label>
        <Input placeholder="Enter account holder name" className="w-full" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Account Number</label>
        <Input placeholder="Enter account number" className="w-full" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">SWIFT/BIC Code</label>
        <Input placeholder="Enter SWIFT or BIC code" className="w-full" />
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
        <div className="flex justify-between text-sm">
          <p className="text-muted-foreground">Processing Fee (1.5%)</p>
          <p className="font-medium">${amount ? (Number(amount) * 0.015).toFixed(2) : "0.00"}</p>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <p className="text-muted-foreground">You will receive</p>
          <p className="font-medium">${amount ? (Number(amount) * 0.985).toFixed(2) : "0.00"}</p>
        </div>
      </div>
    </div>
  );
};

export default BankWithdrawOption;

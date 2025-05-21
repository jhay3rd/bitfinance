
import React from "react";
import { AlertTriangle } from "lucide-react";

interface DepositWarningProps {
  symbol: string;
  network?: string;
  minAmount: string;
}

const DepositWarning: React.FC<DepositWarningProps> = ({ symbol, network, minAmount }) => {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-md">
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-amber-800 dark:text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-amber-800 dark:text-amber-500">Important:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-amber-700 dark:text-amber-400 mt-2">
            <li>Make sure to send only {symbol} to this address</li>
            {network && <li>Use the {network} network ONLY, otherwise your funds may be lost</li>}
            <li>The minimum deposit amount is ${minAmount}</li>
            <li>Your deposit will be credited after network confirmations (usually within 15-30 minutes)</li>
            {symbol === "USDT" && <li>For USDT deposits, please ensure you're using the correct chain (TRC20)</li>}
            <li>If your deposit doesn't appear after 1 hour, please contact our support team</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DepositWarning;


import React from "react";

interface DepositWarningProps {
  symbol: string;
  network?: string;
  minAmount: string;
}

const DepositWarning: React.FC<DepositWarningProps> = ({ symbol, network, minAmount }) => {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-md">
      <h4 className="font-medium text-amber-800 dark:text-amber-500">Important:</h4>
      <ul className="list-disc pl-5 space-y-1 text-sm text-amber-700 dark:text-amber-400 mt-2">
        <li>Make sure to send only {symbol} to this address</li>
        {network && <li>Use the {network} network ONLY</li>}
        <li>The minimum deposit amount is ${minAmount}</li>
        <li>Your deposit will be credited after network confirmations</li>
      </ul>
    </div>
  );
};

export default DepositWarning;


import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'investment';
  amount: string;
  asset: string;
  date: string;
  status: 'approved' | 'pending' | 'reviewing' | 'rejected' | 'completed';
}

const defaultTransactions: Transaction[] = [
  {
    id: "tx1",
    type: "deposit",
    amount: "$500.00",
    asset: "BTC",
    date: "May 10, 2023",
    status: "approved"
  },
  {
    id: "tx2",
    type: "deposit",
    amount: "$1,000.00",
    asset: "ETH",
    date: "May 5, 2023",
    status: "pending"
  },
  {
    id: "tx3",
    type: "withdraw",
    amount: "$250.00",
    asset: "USDT",
    date: "Apr 28, 2023",
    status: "reviewing"
  },
  {
    id: "tx4",
    type: "deposit",
    amount: "$2,000.00",
    asset: "BTC",
    date: "Apr 15, 2023",
    status: "approved"
  },
  {
    id: "tx5",
    type: "withdraw",
    amount: "$750.00",
    asset: "ETH",
    date: "Apr 5, 2023",
    status: "rejected"
  },
  {
    id: "tx6",
    type: "investment",
    amount: "$3,000.00",
    asset: "Monthly Plan",
    date: "Mar 20, 2023",
    status: "completed"
  }
];

const getStatusBadgeClasses = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'pending':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
    case 'reviewing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    case 'completed':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load and merge transactions from localStorage on component mount
  useEffect(() => {
    const loadTransactions = () => {
      const storedTransactions = localStorage.getItem('transactions');
      let userTransactions: Transaction[] = [];
      
      if (storedTransactions) {
        try {
          userTransactions = JSON.parse(storedTransactions) as Transaction[];
          // Ensure transaction dates are properly formatted for sorting
          userTransactions = userTransactions.map(tx => ({
            ...tx,
            // Convert date to sortable format if necessary
            date: tx.date 
          }));
        } catch (error) {
          console.error('Error parsing stored transactions:', error);
        }
      }
      
      // Combine user transactions with default transactions
      const allTransactions = [
        ...userTransactions, 
        ...defaultTransactions.filter(dt => 
          !userTransactions.some(ut => ut.id === dt.id)
        )
      ];
      
      // Sort by date (most recent first)
      const sortedTransactions = [...allTransactions].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
      
      // Limit to 10 transactions for display
      setTransactions(sortedTransactions.slice(0, 10));
    };

    // Add event listener for storage changes
    window.addEventListener('storage', loadTransactions);
    
    // Initial load
    loadTransactions();
    
    // Periodic check for new transactions (every 5 seconds)
    const intervalId = setInterval(loadTransactions, 5000);
    
    return () => {
      window.removeEventListener('storage', loadTransactions);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell className="capitalize">{transaction.type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.asset}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 ${getStatusBadgeClasses(transaction.status)} rounded-full text-xs font-medium`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionHistory;

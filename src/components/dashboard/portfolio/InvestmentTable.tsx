
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InvestmentTableProps {
  title: string;
  isHistory?: boolean;
}

const InvestmentTable: React.FC<InvestmentTableProps> = ({ title, isHistory = false }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>{isHistory ? "Return" : "Expected Return"}</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isHistory ? (
              <>
                <TableRow>
                  <TableCell>Daily Trader</TableCell>
                  <TableCell>$1,000.00</TableCell>
                  <TableCell>Apr 10, 2023</TableCell>
                  <TableCell>Apr 11, 2023</TableCell>
                  <TableCell className="text-green-600">$12.00 (1.2%)</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Weekly Growth</TableCell>
                  <TableCell>$2,000.00</TableCell>
                  <TableCell>Mar 15, 2023</TableCell>
                  <TableCell>Mar 22, 2023</TableCell>
                  <TableCell className="text-green-600">$104.00 (5.2%)</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Monthly Builder</TableCell>
                  <TableCell>$3,000.00</TableCell>
                  <TableCell>Feb 1, 2023</TableCell>
                  <TableCell>Mar 1, 2023</TableCell>
                  <TableCell className="text-green-600">$345.00 (11.5%)</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell>Monthly Builder</TableCell>
                  <TableCell>$2,500.00</TableCell>
                  <TableCell>Apr 15, 2023</TableCell>
                  <TableCell>May 15, 2023</TableCell>
                  <TableCell className="text-green-600">$250.00 (10%)</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                      In Progress (20 days left)
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quarterly Accelerator</TableCell>
                  <TableCell>$5,000.00</TableCell>
                  <TableCell>Mar 1, 2023</TableCell>
                  <TableCell>Jun 1, 2023</TableCell>
                  <TableCell className="text-green-600">$1,250.00 (25%)</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      In Progress (5 days left)
                    </span>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvestmentTable;

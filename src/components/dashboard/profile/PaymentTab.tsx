
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PaymentTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card className="border shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Payment Methods</CardTitle>
          <CardDescription>Manage your connected payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center">
                <div className="bg-blue-500 p-2 rounded-md mr-3">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Remove</Button>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <CreditCard className="h-4 w-4 mr-2" /> Add New Payment Method
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Billing Address</CardTitle>
          <CardDescription>Manage your billing information</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Address Line 1</label>
            <Input defaultValue="123 Crypto Street" className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address Line 2</label>
            <Input defaultValue="Apt 4B" className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <Input defaultValue="San Francisco" className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State/Province</label>
            <Input defaultValue="California" className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <Input defaultValue="94103" className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <Input defaultValue="United States" className="w-full" />
          </div>
          
          <div className="md:col-span-2 pt-2 flex justify-end">
            <Button>Update Address</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentTab;

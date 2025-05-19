
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NotificationsTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card className="border shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Email Notifications</CardTitle>
          <CardDescription>Manage which emails you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Account Updates</p>
              <p className="text-sm text-muted-foreground">Receive important updates about your account</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Investment News</p>
              <p className="text-sm text-muted-foreground">Get notifications about new investment opportunities</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Price Alerts</p>
              <p className="text-sm text-muted-foreground">Be notified when crypto prices change significantly</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-sm text-muted-foreground">Receive promotional offers and news</p>
            </div>
            <input type="checkbox" className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
      
      <div className="pt-2 flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
};

export default NotificationsTab;

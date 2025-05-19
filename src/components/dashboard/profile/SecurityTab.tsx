
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SecurityTabProps {
  twoFactorEnabled: boolean;
}

const SecurityTab: React.FC<SecurityTabProps> = ({ twoFactorEnabled }) => {
  return (
    <div className="space-y-4">
      <Card className="border shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div>
            <p className="text-sm">{twoFactorEnabled ? "Enabled" : "Disabled"}</p>
            <p className="text-xs text-muted-foreground">Last updated: 5 days ago</p>
          </div>
          <Button variant={twoFactorEnabled ? "destructive" : "default"}>
            {twoFactorEnabled ? "Disable" : "Enable"}
          </Button>
        </CardContent>
      </Card>
      
      <Card className="border shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Change Password</CardTitle>
          <CardDescription>Update your password regularly to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <div className="relative">
              <Input type="password" className="w-full" />
              <Key className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <Input type="password" className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <Input type="password" className="w-full" />
          </div>
          <div className="pt-2">
            <Button>Update Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;

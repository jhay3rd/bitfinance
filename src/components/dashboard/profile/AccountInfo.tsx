
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AccountInfoProps {
  joinDate: string;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ joinDate }) => {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Member Since</p>
            <p className="font-medium">{joinDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Account Status</p>
            <p className="font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
              Active
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Account ID</p>
            <p className="font-medium">BF-724859</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Verification Level</p>
            <p className="font-medium">Advanced</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;

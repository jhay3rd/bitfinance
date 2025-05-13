
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Shield, Bell, CreditCard, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfileSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    twoFactorEnabled: true,
    notificationsEnabled: true,
    joinDate: "January 15, 2023"
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Profile</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarFallback className="bg-primary text-white text-xl">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <Card className="border-0 shadow-md">
        <CardHeader>
          <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 md:w-[400px]">
              <TabsTrigger value="personal" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <User className="h-4 w-4 mr-1" /> Personal
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Shield className="h-4 w-4 mr-1" /> Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Bell className="h-4 w-4 mr-1" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="payment" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <CreditCard className="h-4 w-4 mr-1" /> Payment
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input defaultValue={user.name} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <Input defaultValue={user.email} className="w-full" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input defaultValue={user.phone} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <Input defaultValue={user.country} className="w-full" />
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card className="border shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div>
                  <p className="text-sm">{user.twoFactorEnabled ? "Enabled" : "Disabled"}</p>
                  <p className="text-xs text-muted-foreground">Last updated: 5 days ago</p>
                </div>
                <Button variant={user.twoFactorEnabled ? "destructive" : "default"}>
                  {user.twoFactorEnabled ? "Disable" : "Enable"}
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
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
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
              <Button onClick={handleSave}>Save Preferences</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="payment" className="space-y-4">
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
                  <Button onClick={handleSave}>Update Address</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium">{user.joinDate}</p>
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
    </div>
  );
};

export default ProfileSection;

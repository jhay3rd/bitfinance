
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Bell, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProfileHeader from "./profile/ProfileHeader";
import PersonalInfoTab from "./profile/PersonalInfoTab";
import SecurityTab from "./profile/SecurityTab";
import NotificationsTab from "./profile/NotificationsTab";
import PaymentTab from "./profile/PaymentTab";
import AccountInfo from "./profile/AccountInfo";

const ProfileSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const { toast } = useToast();
  
  // Mock user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    twoFactorEnabled: true,
    notificationsEnabled: true,
    joinDate: "January 15, 2023",
    username: "johndoe123",
    dateOfBirth: "1990-06-15",
    address: "123 Main St, Apt 4B, San Francisco, CA 94103",
    gender: "male",
    profileImage: "",
  });
  
  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // Here we're just using a local URL for demonstration
      const imageUrl = URL.createObjectURL(file);
      setUser({...user, profileImage: imageUrl});
      
      toast({
        title: "Profile picture uploaded",
        description: "Your new profile picture has been set.",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <ProfileHeader 
        user={user} 
        setUser={setUser} 
        handleFileUpload={handleFileUpload} 
      />
      
      <Card className="border-0 shadow-md">
        <CardHeader>
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
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
            
            <TabsContent value="personal">
              <PersonalInfoTab user={user} setUser={setUser} handleSave={handleSave} />
            </TabsContent>
            
            <TabsContent value="security">
              <SecurityTab twoFactorEnabled={user.twoFactorEnabled} />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationsTab />
            </TabsContent>
            
            <TabsContent value="payment">
              <PaymentTab />
            </TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent>
          {/* Card content now empty as tabs are managed within CardHeader */}
        </CardContent>
      </Card>
      
      <AccountInfo joinDate={user.joinDate} />
    </div>
  );
};

export default ProfileSection;

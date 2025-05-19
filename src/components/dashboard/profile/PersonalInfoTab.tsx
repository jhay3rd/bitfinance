
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PersonalInfoTabProps {
  user: {
    name: string;
    email: string;
    phone: string;
    country: string;
    dateOfBirth: string;
    address: string;
    gender: string;
    username: string;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
  handleSave: () => void;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ user, setUser, handleSave }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input 
              value={user.name}
              onChange={(e) => setUser({...user, name: e.target.value})}
              className="w-full"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <Input 
              value={user.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
              className="w-full"
              placeholder="Choose a unique username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <Input 
              value={user.email}
              className="w-full"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <Input 
              value={user.phone}
              onChange={(e) => setUser({...user, phone: e.target.value})}
              className="w-full"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input 
                type="date"
                value={user.dateOfBirth}
                onChange={(e) => setUser({...user, dateOfBirth: e.target.value})}
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <Select 
              value={user.gender} 
              onValueChange={(value) => setUser({...user, gender: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Address Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input 
                value={user.address} 
                onChange={(e) => setUser({...user, address: e.target.value})}
                className="w-full"
                placeholder="Enter your full address"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <Input 
                value={user.country}
                onChange={(e) => setUser({...user, country: e.target.value})}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default PersonalInfoTab;

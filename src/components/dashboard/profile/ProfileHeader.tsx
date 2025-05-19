
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

interface ProfileHeaderProps {
  user: {
    name: string;
    profileImage: string;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, setUser, handleFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold">Your Profile</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-2 border-primary cursor-pointer" onClick={triggerFileInput}>
            {user.profileImage ? (
              <AvatarImage src={user.profileImage} alt={user.name} className="object-cover" />
            ) : (
              <AvatarFallback className="bg-primary text-white text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            )}
          </Avatar>
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={triggerFileInput}
          >
            <Upload className="h-8 w-8 text-white" />
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileUpload}
          />
        </div>
        <p className="text-sm text-muted-foreground">Click to upload a new photo</p>
      </div>
    </div>
  );
};

export default ProfileHeader;

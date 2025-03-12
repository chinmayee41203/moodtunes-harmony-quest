
import React from 'react';
import { User } from 'lucide-react';

interface UserProfileProps {
  userName?: string;
  profileImage?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  userName = 'Guest User',
  profileImage 
}) => {
  return (
    <div className="glass-card p-6 mb-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="relative">
          {profileImage ? (
            <img 
              src={profileImage} 
              alt={userName}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/50"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary/60" />
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-medium">
            AI
          </div>
        </div>
        
        <div className="text-left">
          <h3 className="text-lg font-medium">{userName}</h3>
          <p className="text-sm text-muted-foreground">Your personalized music experience</p>
        </div>
      </div>
      
      <div className="mt-6">
        <button className="w-full py-2 rounded-lg border-2 border-primary/20 text-primary/80 font-medium transition-all duration-200 hover:bg-primary/5 active:scale-98">
          View Profile Settings
        </button>
      </div>
    </div>
  );
};

export default UserProfile;


import React from 'react';
import { Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Header: React.FC = () => {
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Successful",
      description: "Welcome back to MoodTunes!",
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account Created",
      description: "Welcome to MoodTunes!",
    });
  };

  return (
    <header className="w-full py-6 px-8 flex items-center justify-between z-10">
      <div className="flex items-center gap-2 animate-fade-in">
        <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg">
          <Music className="w-5 h-5 text-primary" />
          <div className="absolute inset-0 bg-primary/10 rounded-xl animate-pulse-slow"></div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          MOODTUNES
          <span className="ml-1 text-xs align-top bg-primary/10 text-primary px-2 py-1 rounded-full">AI</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Link to="/" className="text-sm font-medium transition-colors hover:text-primary/80">
          About
        </Link>
        <Link to="/" className="text-sm font-medium transition-colors hover:text-primary/80">
          Settings
        </Link>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" className="rounded-full">
              Sign In
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Welcome to MoodTunes</SheetTitle>
              <SheetDescription>
                Sign in to your account or create a new one
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6">
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4 mt-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="••••••••" required />
                    </div>
                    <Button type="submit" className="w-full mt-4">Login</Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4 mt-4">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Name</Label>
                      <Input id="signup-name" type="text" placeholder="Your Name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" placeholder="••••••••" required />
                    </div>
                    <Button type="submit" className="w-full mt-4">Create Account</Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

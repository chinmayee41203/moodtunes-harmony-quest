
import React from 'react';
import { Music } from 'lucide-react';

const Header: React.FC = () => {
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
        <button className="text-sm font-medium transition-colors hover:text-primary/80">
          About
        </button>
        <button className="text-sm font-medium transition-colors hover:text-primary/80">
          Settings
        </button>
        <button className="text-sm font-medium px-4 py-1.5 rounded-full bg-primary text-white shadow-md transition-all hover:shadow-lg hover:bg-primary/90 active:scale-95">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;

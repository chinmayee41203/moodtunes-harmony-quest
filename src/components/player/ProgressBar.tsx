
import React from 'react';

interface ProgressBarProps {
  progress: number;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  mood: string;
  currentTime: number;
  duration: number;
  formatTime: (seconds: number) => string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  onSeek, 
  mood,
  currentTime,
  duration,
  formatTime
}) => {
  // Helper function to get color based on mood
  const getMoodColor = (mood: string): string => {
    switch (mood) {
      case 'happy': return 'bg-mood-happy';
      case 'calm': return 'bg-mood-calm';
      case 'sad': return 'bg-mood-sad';
      case 'energetic': return 'bg-mood-energetic';
      case 'focus': return 'bg-mood-focus';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="w-full space-y-2">
      <div 
        className="player-progress cursor-pointer"
        onClick={onSeek}
      >
        <div 
          className={`h-full ${getMoodColor(mood)} transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;

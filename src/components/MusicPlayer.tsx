
import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import MusicVisualizer from './MusicVisualizer';

interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  duration: number;
}

interface MusicPlayerProps {
  song?: Song;
  mood: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  song = {
    id: 'default',
    title: 'Select a mood to begin',
    artist: 'MoodTunes AI',
    albumArt: 'https://picsum.photos/400/400',
    duration: 180,
  },
  mood
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + (100 / song.duration) * 0.1;
        });
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, song.duration]);
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const currentTime = (progress / 100) * song.duration;

  return (
    <div className="w-full max-w-md mx-auto glass-card p-6 transition-all duration-500 animate-fade-in">
      <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-6 group">
        <img 
          src={song.albumArt} 
          alt={song.title}
          className="w-full h-full object-cover transition-transform duration-10000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <MusicVisualizer isPlaying={isPlaying} mood={mood} />
      
      <div className="text-center mt-4 mb-6">
        <h3 className="text-xl font-semibold">{song.title}</h3>
        <p className="text-muted-foreground">{song.artist}</p>
      </div>
      
      <div className="player-controls">
        <button className="player-control-button" aria-label="Previous song">
          <SkipBack className="w-5 h-5" />
        </button>
        
        <button 
          className="player-control-button p-4 bg-primary/5 hover:bg-primary/10"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        
        <button className="player-control-button" aria-label="Next song">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>
      
      <div className="w-full space-y-2">
        <div className="player-progress">
          <div 
            className={`h-full ${getMoodColor(mood)} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(song.duration)}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <button 
          className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-red-500' : 'text-muted-foreground hover:text-primary'}`}
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-muted-foreground" />
          <div className="w-20 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default MusicPlayer;

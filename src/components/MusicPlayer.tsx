
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, VolumeX } from 'lucide-react';
import MusicVisualizer from './MusicVisualizer';

interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  duration: number;
  audioUrl: string;
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
    audioUrl: 'https://cdn.freesound.org/previews/445/445037_9159316-lq.mp3', // Added default audio
  },
  mood
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Create audio element ref
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);
  
  // Update audio src when song changes
  useEffect(() => {
    if (audioRef.current && song.audioUrl) {
      // Stop any current playback
      audioRef.current.pause();
      
      // Set the source and load the audio
      audioRef.current.src = song.audioUrl;
      audioRef.current.load();
      setProgress(0);
      
      // Start playing the new song immediately
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Error playing audio:", err);
        setIsPlaying(false);
      });
    }
  }, [song]);
  
  // Update progress as song plays
  useEffect(() => {
    if (!audioRef.current) return;
    
    const updateProgress = () => {
      if (audioRef.current) {
        const currentProgress = (audioRef.current.currentTime / song.duration) * 100;
        setProgress(currentProgress);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    };
    
    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [song.duration]);
  
  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);
  
  const togglePlayback = () => {
    if (!song.audioUrl) return;
    
    if (!isPlaying) {
      // We're going to play, make sure audio is loaded
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.error("Error playing audio:", err);
        });
      }
    } else {
      // We're pausing
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };
  
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const container = e.currentTarget;
    const bounds = container.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = (x / bounds.width) * 100;
    const newTime = (percentage / 100) * song.duration;
    
    setProgress(percentage);
    audioRef.current.currentTime = newTime;
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const bounds = container.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const newVolume = Math.max(0, Math.min(1, x / bounds.width));
    
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
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
        <div 
          className="player-progress cursor-pointer"
          onClick={handleSeek}
        >
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
          <button onClick={toggleMute} className="text-muted-foreground">
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <div 
            className="w-20 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden cursor-pointer"
            onClick={handleVolumeChange}
          >
            <div className="h-full bg-primary" style={{ width: `${volume * 100}%` }} />
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

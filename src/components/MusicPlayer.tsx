
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, VolumeX } from 'lucide-react';
import MusicVisualizer from './MusicVisualizer';
import YouTubePlayer from './YouTubePlayer';
import { useToast } from "@/hooks/use-toast";

interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  duration: number;
  audioUrl: string;
  youtubeId: string;
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
    audioUrl: 'https://cdn.freesound.org/previews/445/445037_9159316-lq.mp3',
    youtubeId: 'dQw4w9WgXcQ', // Default YouTube ID
  },
  mood
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [playerError, setPlayerError] = useState<any>(null);
  const { toast } = useToast();
  const currentSongRef = useRef<string>('');
  
  useEffect(() => {
    // Reset player state when song changes
    if (song && song.id !== currentSongRef.current) {
      setIsPlaying(false);
      setProgress(0);
      currentSongRef.current = song.id;
      
      // Auto-play when a new song is selected (after a small delay)
      const timer = setTimeout(() => {
        if (isPlayerReady) {
          setIsPlaying(true);
          toast({
            title: "Now Playing",
            description: `${song.title} by ${song.artist}`,
            duration: 2000,
          });
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [song, isPlayerReady, toast]);
  
  const handlePlayerReady = () => {
    setIsPlayerReady(true);
  };
  
  const handlePlayerError = (error: any) => {
    console.error("YouTube Player Error:", error);
    setPlayerError(error);
    setIsPlaying(false);
    
    toast({
      title: "Playback Error",
      description: "There was an error playing this song. Try another.",
      variant: "destructive",
    });
  };
  
  const handlePlayerStateChange = (state: number) => {
    // YT.PlayerState.ENDED = 0
    if (state === 0) {
      setIsPlaying(false);
      setProgress(100);
    }
  };
  
  const togglePlayback = () => {
    if (!song) return;
    
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      toast({
        title: isPlaying ? "Paused" : "Now Playing",
        description: `${song.title} by ${song.artist}`,
        duration: 2000,
      });
    }
  };
  
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!song) return;
    
    const container = e.currentTarget;
    const bounds = container.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = (x / bounds.width) * 100;
    
    setProgress(percentage);
    
    // YouTube specific seeking
    // This is handled by the YouTubePlayer component
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
  
  const currentTime = song ? (progress / 100) * song.duration : 0;

  return (
    <div className="w-full max-w-md mx-auto glass-card p-6 transition-all duration-500 animate-fade-in">
      {song && song.youtubeId && (
        <YouTubePlayer 
          videoId={song.youtubeId}
          isPlaying={isPlaying}
          onStateChange={handlePlayerStateChange}
          onReady={handlePlayerReady}
          onError={handlePlayerError}
          volume={isMuted ? 0 : volume}
          onProgress={setProgress}
        />
      )}
      
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
          <span>{song ? formatTime(song.duration) : '0:00'}</span>
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

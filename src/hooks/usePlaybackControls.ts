
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  duration: number;
  audioUrl: string;
  youtubeId: string;
}

export const usePlaybackControls = (song?: Song) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  const togglePlayback = () => {
    if (!song) return;
    
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      toast({
        title: "Now Playing",
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
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const toggleFavorite = () => setIsFavorite(!isFavorite);
  
  return {
    isPlaying,
    setIsPlaying,
    progress,
    setProgress,
    isFavorite,
    togglePlayback,
    handleSeek,
    formatTime,
    toggleFavorite
  };
};

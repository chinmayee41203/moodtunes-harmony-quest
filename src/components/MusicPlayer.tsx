
import React, { useEffect, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { usePlaybackControls } from '@/hooks/usePlaybackControls';
import { useVolumeControls } from '@/hooks/useVolumeControls';
import { useYouTubePlayer } from '@/hooks/useYouTubePlayer';

import MusicVisualizer from './MusicVisualizer';
import YouTubePlayer from './YouTubePlayer';
import AlbumArt from './player/AlbumArt';
import TrackInfo from './player/TrackInfo';
import PlayerControls from './player/PlayerControls';
import ProgressBar from './player/ProgressBar';
import FavoriteButton from './player/FavoriteButton';
import VolumeControl from './player/VolumeControl';

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
  const { 
    isPlaying, setIsPlaying, progress, setProgress, 
    isFavorite, togglePlayback, handleSeek, formatTime, toggleFavorite 
  } = usePlaybackControls(song);
  
  const { volume, isMuted, toggleMute, handleVolumeChange } = useVolumeControls();
  const { isPlayerReady, handlePlayerReady, handlePlayerError, handlePlayerStateChange } = useYouTubePlayer();
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
  }, [song, isPlayerReady, toast, setIsPlaying, setProgress]);
  
  const handleYouTubeStateChange = (state: number) => {
    const newState = handlePlayerStateChange(state);
    // YT.PlayerState.ENDED = 0
    if (newState === 0) {
      setIsPlaying(false);
      setProgress(100);
    }
  };
  
  const handleYouTubeError = (error: any) => {
    const processedError = handlePlayerError(error);
    setIsPlaying(false);
    
    toast({
      title: "Playback Error",
      description: "There was an error playing this song. Try another.",
      variant: "destructive",
    });
  };
  
  const currentTime = song ? (progress / 100) * song.duration : 0;

  return (
    <div className="w-full max-w-md mx-auto glass-card p-6 transition-all duration-500 animate-fade-in">
      {song && song.youtubeId && (
        <YouTubePlayer 
          videoId={song.youtubeId}
          isPlaying={isPlaying}
          onStateChange={handleYouTubeStateChange}
          onReady={handlePlayerReady}
          onError={handleYouTubeError}
          volume={isMuted ? 0 : volume}
          onProgress={setProgress}
        />
      )}
      
      <AlbumArt src={song.albumArt} alt={song.title} />
      
      <MusicVisualizer isPlaying={isPlaying} mood={mood} />
      
      <TrackInfo title={song.title} artist={song.artist} />
      
      <PlayerControls isPlaying={isPlaying} onTogglePlay={togglePlayback} />
      
      <ProgressBar
        progress={progress}
        onSeek={handleSeek}
        mood={mood}
        currentTime={currentTime}
        duration={song.duration}
        formatTime={formatTime}
      />
      
      <div className="flex justify-between items-center mt-6">
        <FavoriteButton isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
        <VolumeControl 
          volume={volume}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;

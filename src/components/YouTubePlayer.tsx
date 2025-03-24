
import React, { useState } from 'react';
import { useYouTubePlayerInstance } from '@/hooks/useYouTubePlayerInstance';
import { useYouTubeProgress } from '@/hooks/useYouTubeProgress';

interface YouTubePlayerProps {
  videoId: string;
  isPlaying: boolean;
  onStateChange: (state: number) => void;
  onReady: () => void;
  onError: (error: any) => void;
  volume: number;
  onProgress: (progress: number) => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  isPlaying,
  onStateChange,
  onReady,
  onError,
  volume,
  onProgress
}) => {
  const [playerState, setPlayerState] = useState<number | null>(null);
  
  // Use custom hook for player instance management
  const { playerInstanceRef, containerRef } = useYouTubePlayerInstance({
    videoId,
    onReady,
    onStateChange: (state) => {
      setPlayerState(state);
      onStateChange(state);
    },
    onError,
    volume,
  });

  // Use custom hook for progress tracking
  useYouTubeProgress({
    playerInstanceRef,
    isPlaying,
    onProgress,
    playerState,
  });

  return <div ref={containerRef} className="hidden" />;
};

export default YouTubePlayer;

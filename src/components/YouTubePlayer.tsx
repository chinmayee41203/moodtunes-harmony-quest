
import React, { useEffect, useRef } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  isPlaying: boolean;
  onStateChange: (state: number) => void;
  onReady: () => void;
  onError: (error: any) => void;
  volume: number;
  onProgress: (progress: number) => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: any;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
  }
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
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Load YouTube API
  useEffect(() => {
    // Only load the API once
    if (!document.getElementById('youtube-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize YouTube player when API is ready
    window.onYouTubeIframeAPIReady = initializePlayer;

    // If the API was already loaded, initialize the player directly
    if (window.YT && window.YT.Player) {
      initializePlayer();
    }

    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
      }
      // Clean up player if needed
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
      }
    };
  }, []);

  // Initialize the YouTube player
  const initializePlayer = () => {
    if (!containerRef.current) return;
    
    playerInstanceRef.current = new window.YT.Player(containerRef.current, {
      height: '0',
      width: '0',
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        showinfo: 0,
        rel: 0,
        fs: 0,
        modestbranding: 1,
      },
      events: {
        onReady: handlePlayerReady,
        onStateChange: handlePlayerStateChange,
        onError: handlePlayerError,
      },
    });
    
    playerRef.current = playerInstanceRef.current;
  };

  // Update video when ID changes
  useEffect(() => {
    if (playerRef.current && videoId) {
      // If we already have a player, load the new video
      playerRef.current.loadVideoById(videoId);
      
      // Reset the progress tracking
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  }, [videoId]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!playerRef.current) return;
    
    if (isPlaying) {
      playerRef.current.playVideo();
      
      // Start tracking progress
      if (!progressIntervalRef.current) {
        progressIntervalRef.current = window.setInterval(() => {
          if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
            const currentTime = playerRef.current.getCurrentTime();
            const duration = playerRef.current.getDuration();
            const progress = (currentTime / duration) * 100;
            onProgress(progress);
          }
        }, 1000);
      }
    } else {
      playerRef.current.pauseVideo();
      
      // Stop tracking progress
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  }, [isPlaying, onProgress]);

  // Handle volume changes
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume * 100);
    }
  }, [volume]);

  const handlePlayerReady = (event: any) => {
    onReady();
    event.target.setVolume(volume * 100);
  };

  const handlePlayerStateChange = (event: any) => {
    onStateChange(event.data);
    
    // Handle ended state
    if (event.data === window.YT.PlayerState.ENDED) {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      onProgress(100); // Update progress to 100% when video ends
    }
  };

  const handlePlayerError = (event: any) => {
    onError(event.data);
  };

  return <div ref={containerRef} className="hidden" />;
};

export default YouTubePlayer;

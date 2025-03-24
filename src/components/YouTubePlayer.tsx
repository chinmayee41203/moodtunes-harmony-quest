
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
  const playerInstanceRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isApiLoadedRef = useRef<boolean>(false);
  const videoIdRef = useRef<string>(videoId);
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
    window.onYouTubeIframeAPIReady = () => {
      isApiLoadedRef.current = true;
      initializePlayer();
    };

    // If the API was already loaded, initialize the player directly
    if (window.YT && window.YT.Player) {
      isApiLoadedRef.current = true;
      initializePlayer();
    }

    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
      }
      // Clean up player if needed
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.destroy();
        } catch (e) {
          console.error("Error destroying YouTube player:", e);
        }
      }
    };
  }, []);

  // Initialize the YouTube player
  const initializePlayer = () => {
    if (!containerRef.current || !isApiLoadedRef.current || !window.YT || !window.YT.Player) {
      return;
    }
    
    try {
      playerInstanceRef.current = new window.YT.Player(containerRef.current, {
        height: '0',
        width: '0',
        videoId: videoIdRef.current,
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
    } catch (error) {
      console.error("Error initializing YouTube player:", error);
      onError(error);
    }
  };

  // Update video when ID changes
  useEffect(() => {
    // Store the current videoId in the ref
    videoIdRef.current = videoId;
    
    // Only try to load a new video if the player is initialized
    if (playerInstanceRef.current && playerInstanceRef.current.loadVideoById) {
      try {
        playerInstanceRef.current.loadVideoById(videoId);
        
        // Reset the progress tracking
        if (progressIntervalRef.current) {
          window.clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      } catch (error) {
        console.error("Error loading video:", error);
        onError(error);
      }
    }
  }, [videoId, onError]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!playerInstanceRef.current) return;
    
    try {
      if (isPlaying) {
        // Make sure player functions exist before calling them
        if (typeof playerInstanceRef.current.playVideo === 'function') {
          playerInstanceRef.current.playVideo();
          
          // Start tracking progress
          if (!progressIntervalRef.current) {
            progressIntervalRef.current = window.setInterval(() => {
              if (playerInstanceRef.current && 
                  typeof playerInstanceRef.current.getCurrentTime === 'function' &&
                  typeof playerInstanceRef.current.getDuration === 'function') {
                const currentTime = playerInstanceRef.current.getCurrentTime();
                const duration = playerInstanceRef.current.getDuration();
                if (currentTime && duration) {
                  const progress = (currentTime / duration) * 100;
                  onProgress(progress);
                }
              }
            }, 1000);
          }
        }
      } else {
        // Make sure player functions exist before calling them
        if (typeof playerInstanceRef.current.pauseVideo === 'function') {
          playerInstanceRef.current.pauseVideo();
          
          // Stop tracking progress
          if (progressIntervalRef.current) {
            window.clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
        }
      }
    } catch (error) {
      console.error("Error controlling playback:", error);
      onError(error);
    }
  }, [isPlaying, onProgress, onError]);

  // Handle volume changes
  useEffect(() => {
    if (playerInstanceRef.current && typeof playerInstanceRef.current.setVolume === 'function') {
      try {
        playerInstanceRef.current.setVolume(volume * 100);
      } catch (error) {
        console.error("Error setting volume:", error);
      }
    }
  }, [volume]);

  const handlePlayerReady = (event: any) => {
    console.log("YouTube player ready");
    onReady();
    try {
      event.target.setVolume(volume * 100);
    } catch (error) {
      console.error("Error setting initial volume:", error);
    }
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
    console.error("YouTube Player Error:", event.data);
    onError(event.data);
  };

  return <div ref={containerRef} className="hidden" />;
};

export default YouTubePlayer;

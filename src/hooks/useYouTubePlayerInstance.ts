
import { useEffect, useRef } from 'react';

interface UseYouTubePlayerInstanceProps {
  videoId: string;
  onReady: () => void;
  onStateChange: (state: number) => void;
  onError: (error: any) => void;
  volume: number;
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

export const useYouTubePlayerInstance = ({
  videoId,
  onReady,
  onStateChange,
  onError,
  volume,
}: UseYouTubePlayerInstanceProps) => {
  const playerInstanceRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isApiLoadedRef = useRef<boolean>(false);
  const videoIdRef = useRef<string>(videoId);

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
          onReady: (event: any) => {
            console.log("YouTube player ready");
            try {
              event.target.setVolume(volume * 100);
            } catch (error) {
              console.error("Error setting initial volume:", error);
            }
            onReady();
          },
          onStateChange: (event: any) => {
            onStateChange(event.data);
          },
          onError: (event: any) => {
            console.error("YouTube Player Error:", event.data);
            onError(event.data);
          },
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
      } catch (error) {
        console.error("Error loading video:", error);
        onError(error);
      }
    }
  }, [videoId, onError]);

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

  return {
    playerInstanceRef,
    containerRef,
  };
};

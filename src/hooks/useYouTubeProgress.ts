
import { useEffect, useRef } from 'react';

interface UseYouTubeProgressProps {
  playerInstanceRef: React.MutableRefObject<any>;
  isPlaying: boolean;
  onProgress: (progress: number) => void;
  playerState: number | null;
}

export const useYouTubeProgress = ({
  playerInstanceRef,
  isPlaying,
  onProgress,
  playerState,
}: UseYouTubeProgressProps) => {
  const progressIntervalRef = useRef<number | null>(null);

  // Start progress tracking function
  const startProgressTracking = () => {
    // Clear any existing interval first
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    // Create a new interval for tracking progress
    progressIntervalRef.current = window.setInterval(() => {
      if (!playerInstanceRef.current) return;
      
      try {
        if (typeof playerInstanceRef.current.getCurrentTime === 'function' &&
            typeof playerInstanceRef.current.getDuration === 'function') {
          const currentTime = playerInstanceRef.current.getCurrentTime() || 0;
          const duration = playerInstanceRef.current.getDuration() || 1;
          
          // Avoid division by zero
          if (duration > 0) {
            const progress = (currentTime / duration) * 100;
            onProgress(progress);
          }
        }
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    }, 1000); // Update every second
  };

  // Stop progress tracking
  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // Handle play/pause state changes
  useEffect(() => {
    if (!playerInstanceRef.current) return;
    
    try {
      if (isPlaying) {
        // Make sure player functions exist before calling them
        if (typeof playerInstanceRef.current.playVideo === 'function') {
          playerInstanceRef.current.playVideo();
          // Start progress tracking when playing
          startProgressTracking();
        }
      } else {
        // Make sure player functions exist before calling them
        if (typeof playerInstanceRef.current.pauseVideo === 'function') {
          playerInstanceRef.current.pauseVideo();
          // Stop tracking progress when paused
          stopProgressTracking();
        }
      }
    } catch (error) {
      console.error("Error controlling playback:", error);
    }
  }, [isPlaying, playerInstanceRef]);

  // Handle player state changes for progress tracking
  useEffect(() => {
    if (playerState === null) return;
    
    // We need to check window.YT is available before checking PlayerState
    if (!window.YT || !window.YT.PlayerState) return;

    // Handle different player states
    if (playerState === window.YT.PlayerState.PLAYING) {
      // Start progress tracking when video starts playing
      startProgressTracking();
    } else if (playerState === window.YT.PlayerState.PAUSED) {
      // Stop progress tracking when video is paused
      stopProgressTracking();
    } else if (playerState === window.YT.PlayerState.ENDED) {
      // Stop progress tracking and set progress to 100% when video ends
      stopProgressTracking();
      onProgress(100);
    }
  }, [playerState, onProgress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, []);

  return {
    startProgressTracking,
    stopProgressTracking
  };
};

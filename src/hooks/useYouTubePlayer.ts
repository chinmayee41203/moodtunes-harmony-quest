
import { useState } from 'react';

export const useYouTubePlayer = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [playerError, setPlayerError] = useState<any>(null);
  
  const handlePlayerReady = () => {
    setIsPlayerReady(true);
  };
  
  const handlePlayerError = (error: any) => {
    console.error("YouTube Player Error:", error);
    setPlayerError(error);
    
    return error;
  };
  
  const handlePlayerStateChange = (state: number) => {
    // YT.PlayerState.ENDED = 0
    return state;
  };
  
  return {
    isPlayerReady,
    playerError,
    handlePlayerReady,
    handlePlayerError,
    handlePlayerStateChange
  };
};

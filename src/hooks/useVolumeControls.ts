
import { useState } from 'react';

export const useVolumeControls = () => {
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  
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
  
  return {
    volume,
    isMuted,
    toggleMute,
    handleVolumeChange
  };
};

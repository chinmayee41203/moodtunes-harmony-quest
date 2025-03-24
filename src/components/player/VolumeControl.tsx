
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onVolumeChange: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onToggleMute,
  onVolumeChange
}) => {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onToggleMute} className="text-muted-foreground">
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
      <div 
        className="w-20 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden cursor-pointer"
        onClick={onVolumeChange}
      >
        <div className="h-full bg-primary" style={{ width: `${volume * 100}%` }} />
      </div>
    </div>
  );
};

export default VolumeControl;


import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ isPlaying, onTogglePlay }) => {
  return (
    <div className="player-controls">
      <button className="player-control-button" aria-label="Previous song">
        <SkipBack className="w-5 h-5" />
      </button>
      
      <button 
        className="player-control-button p-4 bg-primary/5 hover:bg-primary/10"
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6" />
        )}
      </button>
      
      <button className="player-control-button" aria-label="Next song">
        <SkipForward className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PlayerControls;

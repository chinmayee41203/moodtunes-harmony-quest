
import React from 'react';
import { Play, Plus } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  duration: number;
}

interface RecommendationCardProps {
  song: Song;
  onPlay: (song: Song) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ song, onPlay }) => {
  return (
    <div className="track-card glass-card p-2 transition-all">
      <div className="aspect-square overflow-hidden rounded-lg relative group">
        <img 
          src={song.albumArt} 
          alt={song.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button 
            onClick={() => onPlay(song)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black transition-transform duration-300 hover:scale-110 active:scale-95"
            aria-label="Play"
          >
            <Play className="w-5 h-5" />
          </button>
          <button 
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:scale-110 active:scale-95"
            aria-label="Add to playlist"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="px-2 py-3">
        <h3 className="font-medium text-sm truncate">{song.title}</h3>
        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
      </div>
    </div>
  );
};

export default RecommendationCard;

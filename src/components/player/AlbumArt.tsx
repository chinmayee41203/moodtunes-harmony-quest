
import React from 'react';

interface AlbumArtProps {
  src: string;
  alt: string;
}

const AlbumArt: React.FC<AlbumArtProps> = ({ src, alt }) => {
  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-6 group">
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-10000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default AlbumArt;

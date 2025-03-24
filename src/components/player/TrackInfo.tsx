
import React from 'react';

interface TrackInfoProps {
  title: string;
  artist: string;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ title, artist }) => {
  return (
    <div className="text-center mt-4 mb-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{artist}</p>
    </div>
  );
};

export default TrackInfo;


import React, { useEffect, useRef } from 'react';

interface MusicVisualizerProps {
  isPlaying: boolean;
  mood: string;
}

const MusicVisualizer: React.FC<MusicVisualizerProps> = ({ isPlaying, mood }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Get color based on mood
  const getMoodColor = (mood: string): string => {
    switch (mood) {
      case 'happy': return 'bg-mood-happy';
      case 'calm': return 'bg-mood-calm';
      case 'sad': return 'bg-mood-sad';
      case 'energetic': return 'bg-mood-energetic';
      case 'focus': return 'bg-mood-focus';
      default: return 'bg-primary';
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    const barCount = 28;
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const barWidth = Math.floor(containerWidth / barCount) - 2;
    
    // Clear previous bars
    container.innerHTML = '';
    
    // Create new bars
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      bar.className = `visualizer-bar ${getMoodColor(mood)}`;
      bar.style.width = `${barWidth}px`;
      container.appendChild(bar);
    }
    
    // Animate bars
    const bars = container.querySelectorAll('.visualizer-bar');
    
    const animateBars = () => {
      if (!isPlaying) {
        bars.forEach((bar) => {
          (bar as HTMLElement).style.height = '3px';
        });
        return;
      }
      
      bars.forEach((bar) => {
        // Random height between 3px and 40px
        const height = isPlaying ? Math.floor(Math.random() * 37) + 3 : 3;
        (bar as HTMLElement).style.height = `${height}px`;
      });
    };
    
    // Animation interval
    const interval = setInterval(animateBars, 100);
    
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, mood]);

  return (
    <div 
      ref={containerRef}
      className="h-10 w-full flex items-end justify-center gap-[1px] py-2"
    />
  );
};

export default MusicVisualizer;

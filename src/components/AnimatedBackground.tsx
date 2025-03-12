
import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  mood?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ mood = 'calm' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Map mood to colors
  const getMoodColors = (mood: string) => {
    switch (mood) {
      case 'happy':
        return ['#FFD166', '#F9F9F9'];
      case 'calm':
        return ['#06D6A0', '#F9F9F9'];
      case 'sad':
        return ['#118AB2', '#F9F9F9'];
      case 'energetic':
        return ['#EF476F', '#F9F9F9'];
      case 'focus':
        return ['#073B4C', '#F9F9F9'];
      default:
        return ['#06D6A0', '#F9F9F9'];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const moodColors = getMoodColors(mood);
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, moodColors[0]);
    gradient.addColorStop(1, moodColors[1]);

    // Animation parameters
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      direction: number;
      opacity: number;
    }> = [];

    // Create particles
    const createParticles = () => {
      particles = [];
      const count = Math.floor(canvas.width * canvas.height / 20000);
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: moodColors[0],
          speed: Math.random() * 0.5 + 0.1,
          direction: Math.random() * 2 * Math.PI,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    createParticles();

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Move particle
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        
        // Change direction slightly
        particle.direction += (Math.random() - 0.5) * 0.05;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
      
      // Continue animation
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mood]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ opacity: 0.7 }}
    />
  );
};

export default AnimatedBackground;


import React, { useState } from 'react';
import { Smile, Coffee, Frown, Zap, Brain } from 'lucide-react';

interface MoodSelectorProps {
  onSelectMood: (mood: string) => void;
  selectedMood: string;
}

interface MoodOption {
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelectMood, selectedMood }) => {
  const [animate, setAnimate] = useState(false);
  
  const moodOptions: MoodOption[] = [
    {
      name: 'happy',
      icon: <Smile className="w-6 h-6" />,
      description: 'Uplifting & Positive',
      color: 'bg-mood-happy'
    },
    {
      name: 'calm',
      icon: <Coffee className="w-6 h-6" />,
      description: 'Peaceful & Relaxing',
      color: 'bg-mood-calm'
    },
    {
      name: 'sad',
      icon: <Frown className="w-6 h-6" />,
      description: 'Reflective & Emotional',
      color: 'bg-mood-sad'
    },
    {
      name: 'energetic',
      icon: <Zap className="w-6 h-6" />,
      description: 'High Energy & Upbeat',
      color: 'bg-mood-energetic'
    },
    {
      name: 'focus',
      icon: <Brain className="w-6 h-6" />,
      description: 'Concentration & Flow',
      color: 'bg-mood-focus'
    }
  ];

  const handleMoodClick = (mood: string, event: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple effect
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('mood-ripple-effect');

    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);

    // Set mood
    onSelectMood(mood);
    
    // Trigger animation
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-medium mb-2">How are you feeling today?</h2>
        <p className="text-muted-foreground">Select a mood to get personalized music recommendations</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4">
        {moodOptions.map((mood) => (
          <button
            key={mood.name}
            onClick={(e) => handleMoodClick(mood.name, e)}
            className={`
              mood-button glass-card glass-card-hover
              ${selectedMood === mood.name ? 'ring-2 ring-primary ring-offset-2' : ''}
              ${animate && selectedMood === mood.name ? 'scale-95' : 'scale-100'}
              transition-all duration-300
            `}
          >
            <div 
              className={`
                absolute inset-0 opacity-10
                ${mood.color}
              `}
            />
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                {mood.icon}
              </div>
              <span className="font-medium capitalize">{mood.name}</span>
              <span className="text-xs text-muted-foreground">{mood.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;

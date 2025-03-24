
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MoodSelector from '../components/MoodSelector';
import MusicPlayer from '../components/MusicPlayer';
import RecommendationCard from '../components/RecommendationCard';
import AnimatedBackground from '../components/AnimatedBackground';
import UserProfile from '../components/UserProfile';
import { useMusicRecommendations, Song } from '../utils/musicRecommendations';
import { useToast } from "../hooks/use-toast";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState('calm');
  const [currentSong, setCurrentSong] = useState<Song | undefined>(undefined);
  const { recommendations, loading } = useMusicRecommendations(selectedMood);
  const { toast } = useToast();

  useEffect(() => {
    // When recommendations load or mood changes, update current song
    if (recommendations && recommendations.length > 0 && !currentSong) {
      setCurrentSong(recommendations[0]);
    }
  }, [recommendations, currentSong]);

  const handleSelectMood = (mood: string) => {
    setSelectedMood(mood);
    setCurrentSong(undefined); // Reset current song when mood changes
    
    toast({
      title: "Mood Updated",
      description: `Finding music for your ${mood} mood...`,
      duration: 3000,
    });
  };

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    
    toast({
      title: "Loading Song",
      description: `${song.title} by ${song.artist}`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground mood={selectedMood} />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <Header />
        
        <main className="mt-8">
          <MoodSelector onSelectMood={handleSelectMood} selectedMood={selectedMood} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <UserProfile />
              <div className="hidden lg:block glass-card p-6 animate-fade-in">
                <h3 className="text-lg font-medium mb-4">About MoodTunes AI</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  MoodTunes uses advanced AI to analyze your mood and provide personalized music recommendations that match how you're feeling.
                </p>
                <p className="text-sm text-muted-foreground">
                  Our algorithm considers tempo, key, lyrics, and more to create the perfect soundtrack for your emotional state.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-1 order-1 lg:order-2 flex justify-center">
              <MusicPlayer song={currentSong} mood={selectedMood} />
            </div>
            
            <div className="lg:col-span-1 order-3">
              <div className="glass-card p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Recommendations</h3>
                  <div className="text-xs py-1 px-3 rounded-full bg-primary/10 text-primary">
                    AI Powered
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-2">
                    {recommendations.map((song) => (
                      <RecommendationCard 
                        key={song.id} 
                        song={song} 
                        onPlay={handlePlaySong} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

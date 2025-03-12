
// Mock mood analysis service
// In a real application, this would connect to an AI service

export interface MoodAnalysisResult {
  dominantMood: string;
  confidence: number;
  subMoods: Array<{
    mood: string;
    score: number;
  }>;
  recommendedGenres: string[];
}

// Simulate an AI analysis of user's mood based on text input
export const analyzeMoodFromText = async (text: string): Promise<MoodAnalysisResult> => {
  // In a real app, this would call an AI API
  // For demo, we'll just do simple keyword matching
  const moodKeywords = {
    happy: ['happy', 'joy', 'excited', 'good', 'great', 'wonderful', 'amazing', 'smile'],
    calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'quiet', 'gentle'],
    sad: ['sad', 'down', 'blue', 'unhappy', 'depressed', 'melancholy', 'grief'],
    energetic: ['energy', 'active', 'pumped', 'motivated', 'workout', 'exercise', 'run'],
    focus: ['focus', 'concentrate', 'work', 'study', 'productivity', 'mindful', 'attention']
  };

  // Mock analysis
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowercaseText = text.toLowerCase();
      
      // Count occurrences of keywords for each mood
      const moodScores = Object.entries(moodKeywords).map(([mood, keywords]) => {
        const score = keywords.reduce((count, keyword) => {
          return count + (lowercaseText.includes(keyword) ? 1 : 0);
        }, 0);
        
        return {
          mood,
          score: score / keywords.length // Normalize score
        };
      });
      
      // Sort by score, highest first
      moodScores.sort((a, b) => b.score - a.score);
      
      // Default to calm if no mood is detected
      const dominantMood = moodScores[0].score > 0 
        ? moodScores[0].mood 
        : 'calm';
      
      // Mock genre recommendations based on mood
      const genreMap: Record<string, string[]> = {
        happy: ['Pop', 'Indie Pop', 'Funk', 'Reggae'],
        calm: ['Ambient', 'Classical', 'Chillout', 'Jazz'],
        sad: ['Ballads', 'Indie Folk', 'Acoustic', 'Blues'],
        energetic: ['Dance', 'EDM', 'Rock', 'Hip Hop'],
        focus: ['Instrumental', 'Lo-fi', 'Ambient Electronic', 'Classical Piano']
      };
      
      resolve({
        dominantMood,
        confidence: Math.min(moodScores[0].score + 0.3, 0.9), // Add some confidence for demo
        subMoods: moodScores,
        recommendedGenres: genreMap[dominantMood]
      });
    }, 500); // Simulate API delay
  });
};

// For future implementation: mood analysis from voice, facial expression, etc.
export const analyzeMoodFromVoice = async (audioBlob: Blob): Promise<MoodAnalysisResult> => {
  // Placeholder for future implementation
  return analyzeMoodFromText("I'm feeling calm today");
};

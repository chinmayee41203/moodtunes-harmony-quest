
// Mock music recommendation data and logic
import { useState, useEffect } from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  duration: number;
}

// Generate a random album art URL from Picsum Photos
const getRandomAlbumArt = (id: number): string => {
  return `https://picsum.photos/seed/${id}/400/400`;
};

// Simulating an API call with a delay
const fetchRecommendations = (mood: string): Promise<Song[]> => {
  // Different recommendations based on mood
  const recommendations: Record<string, Song[]> = {
    happy: [
      { id: 'h1', title: 'Walking on Sunshine', artist: 'Katrina & The Waves', albumArt: getRandomAlbumArt(1), duration: 238 },
      { id: 'h2', title: 'Happy', artist: 'Pharrell Williams', albumArt: getRandomAlbumArt(2), duration: 232 },
      { id: 'h3', title: 'Good Vibrations', artist: 'The Beach Boys', albumArt: getRandomAlbumArt(3), duration: 219 },
      { id: 'h4', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', albumArt: getRandomAlbumArt(4), duration: 270 },
      { id: 'h5', title: 'Badtameez Dil', artist: 'Benny Dayal', albumArt: getRandomAlbumArt(31), duration: 242 },
      { id: 'h6', title: 'Zingaat', artist: 'Ajay-Atul', albumArt: getRandomAlbumArt(32), duration: 210 },
    ],
    calm: [
      { id: 'c1', title: 'Weightless', artist: 'Marconi Union', albumArt: getRandomAlbumArt(7), duration: 480 },
      { id: 'c2', title: 'Claire de Lune', artist: 'Claude Debussy', albumArt: getRandomAlbumArt(8), duration: 324 },
      { id: 'c3', title: 'Tum Hi Ho', artist: 'Arijit Singh', albumArt: getRandomAlbumArt(33), duration: 252 },
      { id: 'c4', title: 'Abhi Mujh Mein Kahin', artist: 'Ajay Atul', albumArt: getRandomAlbumArt(34), duration: 283 },
      { id: 'c5', title: 'Pure Shores', artist: 'All Saints', albumArt: getRandomAlbumArt(11), duration: 264 },
      { id: 'c6', title: 'Man Mandira', artist: 'Shankar Mahadevan', albumArt: getRandomAlbumArt(35), duration: 305 },
    ],
    sad: [
      { id: 's1', title: 'Nothing Compares 2 U', artist: 'Sinéad O\'Connor', albumArt: getRandomAlbumArt(13), duration: 310 },
      { id: 's2', title: 'Tears in Heaven', artist: 'Eric Clapton', albumArt: getRandomAlbumArt(14), duration: 274 },
      { id: 's3', title: 'Channa Mereya', artist: 'Arijit Singh', albumArt: getRandomAlbumArt(36), duration: 289 },
      { id: 's4', title: 'Jeev Rangala', artist: 'Ajay-Atul', albumArt: getRandomAlbumArt(37), duration: 315 },
      { id: 's5', title: 'Someone Like You', artist: 'Adele', albumArt: getRandomAlbumArt(17), duration: 285 },
      { id: 's6', title: 'Agar Tum Saath Ho', artist: 'Alka Yagnik & Arijit Singh', albumArt: getRandomAlbumArt(38), duration: 341 },
    ],
    energetic: [
      { id: 'e1', title: 'Eye of the Tiger', artist: 'Survivor', albumArt: getRandomAlbumArt(19), duration: 243 },
      { id: 'e2', title: 'Don\'t Stop Me Now', artist: 'Queen', albumArt: getRandomAlbumArt(20), duration: 209 },
      { id: 'e3', title: 'Malhari', artist: 'Vishal Dadlani', albumArt: getRandomAlbumArt(39), duration: 208 },
      { id: 'e4', title: 'Dhol Bajne Laga', artist: 'Shankar Mahadevan', albumArt: getRandomAlbumArt(40), duration: 249 },
      { id: 'e5', title: 'Balam Pichkari', artist: 'Vishal Dadlani & Shalmali Kholgade', albumArt: getRandomAlbumArt(41), duration: 290 },
      { id: 'e6', title: 'All I Do Is Win', artist: 'DJ Khaled', albumArt: getRandomAlbumArt(24), duration: 233 },
    ],
    focus: [
      { id: 'f1', title: 'Experience', artist: 'Ludovico Einaudi', albumArt: getRandomAlbumArt(25), duration: 315 },
      { id: 'f2', title: 'Time', artist: 'Hans Zimmer', albumArt: getRandomAlbumArt(26), duration: 275 },
      { id: 'f3', title: 'Albela Sajan', artist: 'Shankar Mahadevan', albumArt: getRandomAlbumArt(42), duration: 325 },
      { id: 'f4', title: 'Strobe', artist: 'Deadmau5', albumArt: getRandomAlbumArt(28), duration: 603 },
      { id: 'f5', title: 'Tujhe Bhulna Toh Chaaha', artist: 'Jubin Nautiyal', albumArt: getRandomAlbumArt(43), duration: 255 },
      { id: 'f6', title: 'Mi Mandli Naate', artist: 'Ajay-Atul', albumArt: getRandomAlbumArt(44), duration: 293 },
    ]
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(recommendations[mood] || []);
    }, 800);
  });
};

export const useMusicRecommendations = (mood: string) => {
  const [recommendations, setRecommendations] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mood) return;

    const loadRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRecommendations(mood);
        setRecommendations(data);
      } catch (err) {
        setError('Failed to load recommendations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [mood]);

  return { recommendations, loading, error };
};

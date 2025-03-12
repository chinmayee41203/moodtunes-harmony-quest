
// Mock music recommendation data and logic
import { useState, useEffect } from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  duration: number;
  audioUrl: string;
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
      { id: 'h1', title: 'Walking on Sunshine', artist: 'Katrina & The Waves', albumArt: getRandomAlbumArt(1), duration: 238, audioUrl: 'https://cdn.freesound.org/previews/723/723734_12511596-lq.mp3' },
      { id: 'h2', title: 'Happy', artist: 'Pharrell Williams', albumArt: getRandomAlbumArt(2), duration: 232, audioUrl: 'https://cdn.freesound.org/previews/513/513975_7541537-lq.mp3' },
      { id: 'h3', title: 'Good Vibrations', artist: 'The Beach Boys', albumArt: getRandomAlbumArt(3), duration: 219, audioUrl: 'https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3' },
      { id: 'h4', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', albumArt: getRandomAlbumArt(4), duration: 270, audioUrl: 'https://cdn.freesound.org/previews/348/348512_5674468-lq.mp3' },
      { id: 'h5', title: 'Badtameez Dil', artist: 'Benny Dayal', albumArt: getRandomAlbumArt(31), duration: 242, audioUrl: 'https://cdn.freesound.org/previews/631/631643_13553582-lq.mp3' },
      { id: 'h6', title: 'Zingaat', artist: 'Ajay-Atul', albumArt: getRandomAlbumArt(32), duration: 210, audioUrl: 'https://cdn.freesound.org/previews/457/457917_4056692-lq.mp3' },
    ],
    calm: [
      { id: 'c1', title: 'Weightless', artist: 'Marconi Union', albumArt: getRandomAlbumArt(7), duration: 480, audioUrl: 'https://cdn.freesound.org/previews/445/445037_9159316-lq.mp3' },
      { id: 'c2', title: 'Claire de Lune', artist: 'Claude Debussy', albumArt: getRandomAlbumArt(8), duration: 324, audioUrl: 'https://cdn.freesound.org/previews/612/612092_5674468-lq.mp3' },
      { id: 'c3', title: 'Tum Hi Ho', artist: 'Arijit Singh', albumArt: getRandomAlbumArt(33), duration: 252, audioUrl: 'https://cdn.freesound.org/previews/587/587265_8503593-lq.mp3' },
      { id: 'c4', title: 'Abhi Mujh Mein Kahin', artist: 'Ajay Atul', albumArt: getRandomAlbumArt(34), duration: 283, audioUrl: 'https://cdn.freesound.org/previews/328/328118_3450050-lq.mp3' },
      { id: 'c5', title: 'Pure Shores', artist: 'All Saints', albumArt: getRandomAlbumArt(11), duration: 264, audioUrl: 'https://cdn.freesound.org/previews/617/617254_1648170-lq.mp3' },
      { id: 'c6', title: 'Man Mandira', artist: 'Shankar Mahadevan', albumArt: getRandomAlbumArt(35), duration: 305, audioUrl: 'https://cdn.freesound.org/previews/393/393520_7383104-lq.mp3' },
    ],
    sad: [
      { id: 's1', title: 'Nothing Compares 2 U', artist: 'Sinéad O\'Connor', albumArt: getRandomAlbumArt(13), duration: 310, audioUrl: 'https://cdn.freesound.org/previews/466/466532_9353313-lq.mp3' },
      { id: 's2', title: 'Tears in Heaven', artist: 'Eric Clapton', albumArt: getRandomAlbumArt(14), duration: 274, audioUrl: 'https://cdn.freesound.org/previews/460/460654_9159316-lq.mp3' },
      { id: 's3', title: 'Channa Mereya', artist: 'Arijit Singh', albumArt: getRandomAlbumArt(36), duration: 289, audioUrl: 'https://cdn.freesound.org/previews/633/633784_12511596-lq.mp3' },
      { id: 's4', title: 'Jeev Rangala', artist: 'Ajay-Atul', albumArt: getRandomAlbumArt(37), duration: 315, audioUrl: 'https://cdn.freesound.org/previews/459/459145_5674468-lq.mp3' },
      { id: 's5', title: 'Someone Like You', artist: 'Adele', albumArt: getRandomAlbumArt(17), duration: 285, audioUrl: 'https://cdn.freesound.org/previews/624/624984_1648170-lq.mp3' },
      { id: 's6', title: 'Agar Tum Saath Ho', artist: 'Alka Yagnik & Arijit Singh', albumArt: getRandomAlbumArt(38), duration: 341, audioUrl: 'https://cdn.freesound.org/previews/623/623095_1648170-lq.mp3' },
    ],
    energetic: [
      { id: 'e1', title: 'Eye of the Tiger', artist: 'Survivor', albumArt: getRandomAlbumArt(19), duration: 243, audioUrl: 'https://cdn.freesound.org/previews/631/631832_1648170-lq.mp3' },
      { id: 'e2', title: 'Don\'t Stop Me Now', artist: 'Queen', albumArt: getRandomAlbumArt(20), duration: 209, audioUrl: 'https://cdn.freesound.org/previews/635/635082_1648170-lq.mp3' },
      { id: 'e3', title: 'Malhari', artist: 'Vishal Dadlani', albumArt: getRandomAlbumArt(39), duration: 208, audioUrl: 'https://cdn.freesound.org/previews/635/635588_11861866-lq.mp3' },
      { id: 'e4', title: 'Dhol Bajne Laga', artist: 'Shankar Mahadevan', albumArt: getRandomAlbumArt(40), duration: 249, audioUrl: 'https://cdn.freesound.org/previews/423/423099_3313231-lq.mp3' },
      { id: 'e5', title: 'Balam Pichkari', artist: 'Vishal Dadlani & Shalmali Kholgade', albumArt: getRandomAlbumArt(41), duration: 290, audioUrl: 'https://cdn.freesound.org/previews/608/608331_13686372-lq.mp3' },
      { id: 'e6', title: 'All I Do Is Win', artist: 'DJ Khaled', albumArt: getRandomAlbumArt(24), duration: 233, audioUrl: 'https://cdn.freesound.org/previews/467/467057_9353313-lq.mp3' },
    ],
    focus: [
      { id: 'f1', title: 'Experience', artist: 'Ludovico Einaudi', albumArt: getRandomAlbumArt(25), duration: 315, audioUrl: 'https://cdn.freesound.org/previews/629/629198_12511596-lq.mp3' },
      { id: 'f2', title: 'Time', artist: 'Hans Zimmer', albumArt: getRandomAlbumArt(26), duration: 275, audioUrl: 'https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3' },
      { id: 'f3', title: 'Albela Sajan', artist: 'Shankar Mahadevan', albumArt: getRandomAlbumArt(42), duration: 325, audioUrl: 'https://cdn.freesound.org/previews/319/319622_4802155-lq.mp3' },
      { id: 'f4', title: 'Strobe', artist: 'Deadmau5', albumArt: getRandomAlbumArt(28), duration: 603, audioUrl: 'https://cdn.freesound.org/previews/348/348645_5674468-lq.mp3' },
      { id: 'f5', title: 'Tujhe Bhulna Toh Chaaha', artist: 'Jubin Nautiyal', albumArt: getRandomAlbumArt(43), duration: 255, audioUrl: 'https://cdn.freesound.org/previews/319/319653_5404962-lq.mp3' },
      { id: 'f6', title: 'Mi Mandli Naate', artist: 'Ajay-Atul', albumArt: getRandomAlbumArt(44), duration: 293, audioUrl: 'https://cdn.freesound.org/previews/391/391747_7383104-lq.mp3' },
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

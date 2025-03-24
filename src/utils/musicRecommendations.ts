
// Mock music recommendation data and logic
import { useState, useEffect } from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  duration: number;
  audioUrl: string;
  youtubeId: string;
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
      { id: 'h1', title: 'Walking on Sunshine', artist: 'Katrina & The Waves', albumArt: getRandomAlbumArt(1), duration: 238, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', youtubeId: 'iPUmE-tne5U' },
      { id: 'h2', title: 'Happy', artist: 'Pharrell Williams', albumArt: getRandomAlbumArt(2), duration: 232, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', youtubeId: 'ZbZSe6N_BXs' },
      { id: 'h3', title: 'Good Vibrations', artist: 'The Beach Boys', albumArt: getRandomAlbumArt(3), duration: 219, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', youtubeId: 'Eab_beh07HU' },
      { id: 'h4', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', albumArt: getRandomAlbumArt(4), duration: 270, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', youtubeId: 'OPf0YbXqDm0' },
      { id: 'h5', title: 'Badtameez Dil', artist: 'Benny Dayal', albumArt: getRandomAlbumArt(31), duration: 242, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', youtubeId: 'II2EO3Nw4m0' },
      { id: 'h6', title: 'Zingaat', artist: 'Ajay-Atul', albumArt: getRandomAlbumArt(32), duration: 210, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', youtubeId: 'l05TYTX4YQ8' },
    ],
    calm: [
      { id: 'c1', title: 'Weightless', artist: 'Marconi Union', albumArt: getRandomAlbumArt(7), duration: 480, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', youtubeId: 'UfcAVejslrU' },
      { id: 'c2', title: 'Claire de Lune', artist: 'Claude Debussy', albumArt: getRandomAlbumArt(8), duration: 324, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', youtubeId: 'ea2WoUtbzuw' },
      { id: 'c3', title: 'Tum Hi Ho', artist: 'Arijit Singh', albumArt: getRandomAlbumArt(33), duration: 252, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', youtubeId: 'Umqb9KENgmk' },
      { id: 'c4', title: 'Abhi Mujh Mein Kahin', artist: 'Ajay Atul', albumArt: getRandomAlbumArt(34), duration: 283, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', youtubeId: 'oWKgpB2zpgw' },
      { id: 'c5', title: 'Pure Shores', artist: 'All Saints', albumArt: getRandomAlbumArt(11), duration: 264, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', youtubeId: 'dVNdTXEJv1A' },
      { id: 'c6', title: 'Man Mandira', artist: 'Shankar Mahadevan', albumArt: getRandomAlbumArt(35), duration: 305, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', youtubeId: 'SQEnudNrNDM' },
    ],
    sad: [
      { id: 's1', title: 'Nothing Compares 2 U', artist: 'Sinéad O\'Connor', albumArt: getRandomAlbumArt(13), duration: 310, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', youtubeId: '0-EF60neguk' },
      { id: 's2', title: 'Tears in Heaven', artist: 'Eric Clapton', albumArt: getRandomAlbumArt(14), duration: 274, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', youtubeId: 'JxPj3GAYYZ0' },
      { id: 's3', title: 'Channa Mereya', artist: 'Arijit Singh', albumArt: getRandomAlbumArt(36), duration: 289, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', youtubeId: '284Ov7ysmfA' },
      { id: 's4', title: 'Jeev Rangala', artist: 'Ajay-Atul', albumArt: getRandomAlbumArt(37), duration: 315, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', youtubeId: 'pB6jNkgQrVs' },
      { id: 's5', title: 'Someone Like You', artist: 'Adele', albumArt: getRandomAlbumArt(17), duration: 285, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', youtubeId: 'hLQl3WQQoQ0' },
      { id: 's6', title: 'Agar Tum Saath Ho', artist: 'Alka Yagnik & Arijit Singh', albumArt: getRandomAlbumArt(38), duration: 341, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', youtubeId: 'sK7riqg2mr4' },
    ],
    energetic: [
      { id: 'e1', title: 'Eye of the Tiger', artist: 'Survivor', albumArt: getRandomAlbumArt(19), duration: 243, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', youtubeId: 'btPJPFnesV4' },
      { id: 'e2', title: 'Don\'t Stop Me Now', artist: 'Queen', albumArt: getRandomAlbumArt(20), duration: 209, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', youtubeId: 'HgzGwKwLmgM' },
      { id: 'e3', title: 'Malhari', artist: 'Vishal Dadlani', albumArt: getRandomAlbumArt(39), duration: 208, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', youtubeId: 'l_MyUGq7pgs' },
      { id: 'e4', title: 'Dhol Bajne Laga', artist: 'Shankar Mahadevan', albumArt: getRandomAlbumArt(40), duration: 249, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', youtubeId: 'UB1HgBJPLkY' },
      { id: 'e5', title: 'Balam Pichkari', artist: 'Vishal Dadlani & Shalmali Kholgade', albumArt: getRandomAlbumArt(41), duration: 290, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', youtubeId: '0WtRNGubWGA' },
      { id: 'e6', title: 'All I Do Is Win', artist: 'DJ Khaled', albumArt: getRandomAlbumArt(24), duration: 233, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', youtubeId: 'GGXzlRoNtHU' },
    ],
    focus: [
      { id: 'f1', title: 'Experience', artist: 'Ludovico Einaudi', albumArt: getRandomAlbumArt(25), duration: 315, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', youtubeId: '_VONMkKkdf4' },
      { id: 'f2', title: 'Time', artist: 'Hans Zimmer', albumArt: getRandomAlbumArt(26), duration: 275, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', youtubeId: 'RxabLA7UQ9k' },
      { id: 'f3', title: 'Albela Sajan', artist: 'Shankar Mahadevan', albumArt: getRandomAlbumArt(42), duration: 325, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', youtubeId: 'SVBsZEI2MvU' },
      { id: 'f4', title: 'Strobe', artist: 'Deadmau5', albumArt: getRandomAlbumArt(28), duration: 603, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', youtubeId: 'tKi9Z-f6qX4' },
      { id: 'f5', title: 'Tujhe Bhulna Toh Chaaha', artist: 'Jubin Nautiyal', albumArt: getRandomAlbumArt(43), duration: 255, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', youtubeId: 'IjyiLHmJzpM' },
      { id: 'f6', title: 'Mi Mandli Naate', artist: 'Ajay-Atul', albumArt: getRandomAlbumArt(44), duration: 293, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', youtubeId: 'K5FHrAX1Xeo' },
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

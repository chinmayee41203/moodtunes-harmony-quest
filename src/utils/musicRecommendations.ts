
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
      // Additional happy songs
      { id: 'h7', title: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake', albumArt: getRandomAlbumArt(50), duration: 237, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', youtubeId: 'ru0K8uYEZWw' },
      { id: 'h8', title: 'I Got You (I Feel Good)', artist: 'James Brown', albumArt: getRandomAlbumArt(51), duration: 167, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', youtubeId: 'iQI5fdVCvlU' },
      { id: 'h9', title: 'Dancing Queen', artist: 'ABBA', albumArt: getRandomAlbumArt(52), duration: 231, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', youtubeId: 'xFrGuyw1V8s' },
      { id: 'h10', title: 'September', artist: 'Earth, Wind & Fire', albumArt: getRandomAlbumArt(53), duration: 215, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', youtubeId: 'Gs069dndIYk' },
      { id: 'h11', title: 'Shake It Off', artist: 'Taylor Swift', albumArt: getRandomAlbumArt(54), duration: 219, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', youtubeId: 'nfWlot6h_JM' },
      { id: 'h12', title: 'Tunak Tunak Tun', artist: 'Daler Mehndi', albumArt: getRandomAlbumArt(55), duration: 298, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', youtubeId: 'vTIIMJ9tUc8' },
    ],
    calm: [
      { id: 'c1', title: 'Weightless', artist: 'Marconi Union', albumArt: getRandomAlbumArt(7), duration: 480, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', youtubeId: 'UfcAVejslrU' },
      { id: 'c2', title: 'Claire de Lune', artist: 'Claude Debussy', albumArt: getRandomAlbumArt(8), duration: 324, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', youtubeId: 'ea2WoUtbzuw' },
      { id: 'c3', title: 'Tum Hi Ho', artist: 'Arijit Singh', albumArt: getRandomAlbumArt(33), duration: 252, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', youtubeId: 'Umqb9KENgmk' },
      { id: 'c4', title: 'Abhi Mujh Mein Kahin', artist: 'Ajay Atul', albumArt: getRandomAlbumArt(34), duration: 283, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', youtubeId: 'oWKgpB2zpgw' },
      { id: 'c5', title: 'Pure Shores', artist: 'All Saints', albumArt: getRandomAlbumArt(11), duration: 264, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', youtubeId: 'dVNdTXEJv1A' },
      { id: 'c6', title: 'Man Mandira', artist: 'Shankar Mahadevan', albumArt: getRandomAlbumArt(35), duration: 305, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', youtubeId: 'SQEnudNrNDM' },
      // Additional calm songs
      { id: 'c7', title: 'River Flows In You', artist: 'Yiruma', albumArt: getRandomAlbumArt(56), duration: 185, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', youtubeId: '7maJOI3QMu0' },
      { id: 'c8', title: 'The Hours', artist: 'Philip Glass', albumArt: getRandomAlbumArt(57), duration: 420, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', youtubeId: 'uyYQJPSZ_bk' },
      { id: 'c9', title: 'Summer', artist: 'Joe Hisaishi', albumArt: getRandomAlbumArt(58), duration: 293, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', youtubeId: 'qEb4TG10jN8' },
      { id: 'c10', title: 'Gymnopedie No. 1', artist: 'Erik Satie', albumArt: getRandomAlbumArt(59), duration: 180, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', youtubeId: 'S-Xm7s9eGxU' },
      { id: 'c11', title: 'Raataan Lambiyan', artist: 'Jubin Nautiyal', albumArt: getRandomAlbumArt(60), duration: 252, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', youtubeId: 'gvyUuxdRdR4' },
      { id: 'c12', title: 'Moonlight Sonata', artist: 'Ludwig van Beethoven', albumArt: getRandomAlbumArt(61), duration: 375, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', youtubeId: '4Tr0otuiQuU' },
    ],
    sad: [
      { id: 's1', title: 'Nothing Compares 2 U', artist: 'Sinéad O\'Connor', albumArt: getRandomAlbumArt(13), duration: 310, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', youtubeId: '0-EF60neguk' },
      { id: 's2', title: 'Tears in Heaven', artist: 'Eric Clapton', albumArt: getRandomAlbumArt(14), duration: 274, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', youtubeId: 'JxPj3GAYYZ0' },
      { id: 's3', title: 'Channa Mereya', artist: 'Arijit Singh', albumArt: getRandomAlbumArt(36), duration: 289, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', youtubeId: '284Ov7ysmfA' },
      { id: 's4', title: 'Jeev Rangala', artist: 'Ajay-Atul', albumArt: getRandomAlbumArt(37), duration: 315, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', youtubeId: 'pB6jNkgQrVs' },
      { id: 's5', title: 'Someone Like You', artist: 'Adele', albumArt: getRandomAlbumArt(17), duration: 285, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', youtubeId: 'hLQl3WQQoQ0' },
      { id: 's6', title: 'Agar Tum Saath Ho', artist: 'Alka Yagnik & Arijit Singh', albumArt: getRandomAlbumArt(38), duration: 341, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', youtubeId: 'sK7riqg2mr4' },
      // Additional sad songs
      { id: 's7', title: 'Fix You', artist: 'Coldplay', albumArt: getRandomAlbumArt(62), duration: 294, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', youtubeId: 'k4V3Mo61fJM' },
      { id: 's8', title: 'Hurt', artist: 'Johnny Cash', albumArt: getRandomAlbumArt(63), duration: 216, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', youtubeId: '8AHCfZTRGiI' },
      { id: 's9', title: 'Hallelujah', artist: 'Jeff Buckley', albumArt: getRandomAlbumArt(64), duration: 414, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', youtubeId: 'y8AWFf7EAc4' },
      { id: 's10', title: 'Hello', artist: 'Adele', albumArt: getRandomAlbumArt(65), duration: 295, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', youtubeId: 'YQHsXMglC9A' },
      { id: 's11', title: 'Tujhe Kitna Chahne Lage', artist: 'Arijit Singh', albumArt: getRandomAlbumArt(66), duration: 271, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', youtubeId: 'h7gyJRWrjbg' },
      { id: 's12', title: 'Mad World', artist: 'Gary Jules', albumArt: getRandomAlbumArt(67), duration: 184, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', youtubeId: '4N3N1MlvVc4' },
    ],
    energetic: [
      { id: 'e1', title: 'Eye of the Tiger', artist: 'Survivor', albumArt: getRandomAlbumArt(19), duration: 243, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', youtubeId: 'btPJPFnesV4' },
      { id: 'e2', title: 'Don\'t Stop Me Now', artist: 'Queen', albumArt: getRandomAlbumArt(20), duration: 209, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', youtubeId: 'HgzGwKwLmgM' },
      { id: 'e3', title: 'Malhari', artist: 'Vishal Dadlani', albumArt: getRandomAlbumArt(39), duration: 208, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', youtubeId: 'l_MyUGq7pgs' },
      { id: 'e4', title: 'Dhol Bajne Laga', artist: 'Shankar Mahadevan', albumArt: getRandomAlbumArt(40), duration: 249, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', youtubeId: 'UB1HgBJPLkY' },
      { id: 'e5', title: 'Balam Pichkari', artist: 'Vishal Dadlani & Shalmali Kholgade', albumArt: getRandomAlbumArt(41), duration: 290, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', youtubeId: '0WtRNGubWGA' },
      { id: 'e6', title: 'All I Do Is Win', artist: 'DJ Khaled', albumArt: getRandomAlbumArt(24), duration: 233, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', youtubeId: 'GGXzlRoNtHU' },
      // Additional energetic songs
      { id: 'e7', title: 'Thunderstruck', artist: 'AC/DC', albumArt: getRandomAlbumArt(68), duration: 292, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', youtubeId: 'v2AC41dglnM' },
      { id: 'e8', title: 'Till I Collapse', artist: 'Eminem', albumArt: getRandomAlbumArt(69), duration: 297, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', youtubeId: 'ytQ5CYE1VZw' },
      { id: 'e9', title: 'Centuries', artist: 'Fall Out Boy', albumArt: getRandomAlbumArt(70), duration: 228, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', youtubeId: 'LBr7kECsjcQ' },
      { id: 'e10', title: 'Sandstorm', artist: 'Darude', albumArt: getRandomAlbumArt(71), duration: 225, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', youtubeId: 'y6120QOlsfU' },
      { id: 'e11', title: 'Lean On', artist: 'Major Lazer & DJ Snake', albumArt: getRandomAlbumArt(72), duration: 176, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', youtubeId: 'YqeW9_5kURI' },
      { id: 'e12', title: 'Naacho Naacho', artist: 'Rahul Sipligunj & Kaala Bhairava', albumArt: getRandomAlbumArt(73), duration: 217, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', youtubeId: 'sAzlWScHTc4' },
    ],
    focus: [
      { id: 'f1', title: 'Experience', artist: 'Ludovico Einaudi', albumArt: getRandomAlbumArt(25), duration: 315, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', youtubeId: '_VONMkKkdf4' },
      { id: 'f2', title: 'Time', artist: 'Hans Zimmer', albumArt: getRandomAlbumArt(26), duration: 275, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', youtubeId: 'RxabLA7UQ9k' },
      { id: 'f3', title: 'Albela Sajan', artist: 'Shankar Mahadevan', albumArt: getRandomAlbumArt(42), duration: 325, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', youtubeId: 'SVBsZEI2MvU' },
      { id: 'f4', title: 'Strobe', artist: 'Deadmau5', albumArt: getRandomAlbumArt(28), duration: 603, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', youtubeId: 'tKi9Z-f6qX4' },
      { id: 'f5', title: 'Tujhe Bhulna Toh Chaaha', artist: 'Jubin Nautiyal', albumArt: getRandomAlbumArt(43), duration: 255, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', youtubeId: 'IjyiLHmJzpM' },
      { id: 'f6', title: 'Mi Mandli Naate', artist: 'Ajay-Atul', albumArt: getRandomAlbumArt(44), duration: 293, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', youtubeId: 'K5FHrAX1Xeo' },
      // Additional focus songs
      { id: 'f7', title: 'Alpha Waves', artist: 'Binaural Beats', albumArt: getRandomAlbumArt(74), duration: 600, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', youtubeId: 'WPni755-Krg' },
      { id: 'f8', title: 'The Theory of Everything', artist: 'Jóhann Jóhannsson', albumArt: getRandomAlbumArt(75), duration: 195, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', youtubeId: 'Q_E0tfoCHYw' },
      { id: 'f9', title: 'Porcelain', artist: 'Moby', albumArt: getRandomAlbumArt(76), duration: 241, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', youtubeId: 'IJWlBfo5f-Y' },
      { id: 'f10', title: 'Divenire', artist: 'Ludovico Einaudi', albumArt: getRandomAlbumArt(77), duration: 406, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', youtubeId: 'b8SkX9CSJQo' },
      { id: 'f11', title: 'Soch Na Sake', artist: 'Arijit Singh', albumArt: getRandomAlbumArt(78), duration: 282, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', youtubeId: 'Y3CRGEGrKzs' },
      { id: 'f12', title: 'Study Music Alpha Waves', artist: 'RelaxingRecords', albumArt: getRandomAlbumArt(79), duration: 540, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', youtubeId: 'IrSF5qWMQkc' },
    ],
    // New mood categories
    romantic: [
      { id: 'r1', title: 'Perfect', artist: 'Ed Sheeran', albumArt: getRandomAlbumArt(80), duration: 263, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', youtubeId: '2Vv-BfVoq4g' },
      { id: 'r2', title: 'All of Me', artist: 'John Legend', albumArt: getRandomAlbumArt(81), duration: 270, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', youtubeId: '450p7goxZqg' },
      { id: 'r3', title: 'Tum Se Hi', artist: 'Mohit Chauhan', albumArt: getRandomAlbumArt(82), duration: 310, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', youtubeId: 'xRb8hxwN5zc' },
      { id: 'r4', title: 'Thinking Out Loud', artist: 'Ed Sheeran', albumArt: getRandomAlbumArt(83), duration: 281, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', youtubeId: 'lp-EO5I60KA' },
      { id: 'r5', title: 'Pehla Nasha', artist: 'Udit Narayan & Sadhana Sargam', albumArt: getRandomAlbumArt(84), duration: 294, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', youtubeId: 'Ia_nyMAe9tQ' },
      { id: 'r6', title: 'Can\'t Help Falling in Love', artist: 'Elvis Presley', albumArt: getRandomAlbumArt(85), duration: 182, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', youtubeId: 'vGJTaP6anOU' },
    ],
    nostalgic: [
      { id: 'n1', title: 'Bohemian Rhapsody', artist: 'Queen', albumArt: getRandomAlbumArt(86), duration: 354, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', youtubeId: 'fJ9rUzIMcZQ' },
      { id: 'n2', title: 'Hotel California', artist: 'Eagles', albumArt: getRandomAlbumArt(87), duration: 390, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', youtubeId: 'EqPtz5qN7HM' },
      { id: 'n3', title: 'Kuch Kuch Hota Hai', artist: 'Udit Narayan & Alka Yagnik', albumArt: getRandomAlbumArt(88), duration: 307, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', youtubeId: 'S_FhGWVJUlE' },
      { id: 'n4', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', albumArt: getRandomAlbumArt(89), duration: 356, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', youtubeId: '1w7OgIMMRc4' },
      { id: 'n5', title: 'Lag Jaa Gale', artist: 'Lata Mangeshkar', albumArt: getRandomAlbumArt(90), duration: 240, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', youtubeId: 'TFr6G5zveS8' },
      { id: 'n6', title: 'Yesterday', artist: 'The Beatles', albumArt: getRandomAlbumArt(91), duration: 165, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', youtubeId: 'NrgmdOz227I' },
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

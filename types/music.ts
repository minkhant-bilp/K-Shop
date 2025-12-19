// types/music.ts
export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  artwork: any; // require() image
  url: string;
  lyrics?: string;
  credits?: {
    lyricsBy?: string[];
    musicBy?: string[];
    mixedBy?: string;
    masteredBy?: string;
  };
}
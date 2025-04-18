export interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string;
  statusCode?: number;
}

export interface Song {
  id: string;
  name: string;
  artist: string;
  img: { id: string; url: string };
  song: { id: string; url: string };
  plays: number;
  duration: number;
}

export interface Artist {
  id: string;
  name: string;
  img: string;
  role: string;
  followersCount: number;
  songs: Song[];
}

export interface InitialState {
  data: Artist | null;
  api: {
    getArtist: ApiStatus;
    uploadSong: ApiStatus;
    updateSong: ApiStatus;
    deleteSong: ApiStatus;
  };
}

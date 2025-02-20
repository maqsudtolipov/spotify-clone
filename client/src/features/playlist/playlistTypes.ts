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

export interface Playlist {
  id: string;
  name: string;
  img: {
    id: string;
    url: string;
  };
  user: {
    id: string;
    name: string;
    img: {
      id: string;
      url: string;
    };
    role: 'user' | 'artist';
  };
  songs: Song[];
  description?: string;
  color: string;
  length: number;
  duration: number;
}

export interface LibraryState {
  data: Playlist | null;
  api: {
    getPlaylist: ApiStatus;
    createPlaylist: ApiStatus;
    editPlaylist: ApiStatus;
    removeSong: ApiStatus;
  };
}

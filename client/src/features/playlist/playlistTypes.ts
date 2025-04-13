export interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string;
  statusCode?: number;
}

export interface Song {
  id: string;
  name: string;
  artist: {
    id: string;
    name: string;
  };
  img: { id: string; url: string };
  song: { id: string; url: string };
  plays: number;
  duration: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  img: {
    id: string;
    url: string;
  };
  user: {
    id: string;
    name: string;
    role: 'user' | 'artist';
    img: {
      id: string;
      url: string;
    };
  };
  songs: Song[];
  length: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlaylistState {
  data: Playlist | null;
  api: {
    getPlaylist: ApiStatus;
    createPlaylist: ApiStatus;
    editPlaylist: ApiStatus;
    removeSong: ApiStatus;
  };
}

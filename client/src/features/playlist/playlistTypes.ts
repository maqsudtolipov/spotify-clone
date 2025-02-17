export interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string;
  statusCode?: number;
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
  description?: string;
  color: string;
  length: number;
  duration: number;
}

export interface LibraryState {
  data: Playlist | null;
  api: {
    getPlaylist: ApiStatus;
  };
}

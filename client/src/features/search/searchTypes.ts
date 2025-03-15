import { Artist, Song } from '../artist/artistTypes.ts';
import { Playlist } from '../playlist/playlistTypes.ts';
import { User } from '../user/userTypes.ts';

interface Pagination {
  limit: number;
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

interface SearchTab<T> {
  items: T[];
  pagination: Pagination;
  lastQuery: string;
  apiStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

export interface SearchState {
  tab: 'all' | 'artists' | 'playlists' | 'songs' | 'profiles';
  query: string;
  mainSearch: {
    songs: Song[];
    artists: Artist[];
    playlists: Playlist[];
    users: User[];
    lastQuery: string;
  };
  songs: SearchTab<Song>;
  playlists: SearchTab<Playlist>;
  artists: SearchTab<Artist>;
  users: SearchTab<User>;
}

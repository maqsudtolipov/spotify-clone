import { Artist, Song } from '../artist/artistTypes.ts';
import { Playlist } from '../playlist/playlistTypes.ts';
import { User } from '../user/userTypes.ts';

export interface SearchState {
  query: string;
  mainSearch: {
    songs: Song[];
  };
  songs: { songs: Song[]; lastQuery: string };
  playlists: { playlists: Playlist[]; lastQuery: string };
  artists: { artists: Artist[]; lastQuery: string };
  users: { users: User[]; lastQuery: string };
}

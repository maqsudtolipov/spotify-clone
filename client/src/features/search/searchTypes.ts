import { Song } from '../artist/artistTypes.ts';

export interface SearchState {
  query: string;
  mainSearch: {
    songs: Song[];
  };
}

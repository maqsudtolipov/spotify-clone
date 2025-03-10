import { Song } from '../artist/artistTypes.ts';

export interface SearchState {
  query: string;
  results: {
    songs: Song[];
  };
}

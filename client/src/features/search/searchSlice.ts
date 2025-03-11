import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from './searchTypes.ts';
import { searchMain, searchSongs } from './searchThunks.ts';

const initialState: SearchState = {
  tab: 'all',
  query: '',
  mainSearch: {
    songs: [],
  },
  songs: {
    songs: [],
    lastQuery: '',
  },
  playlists: {
    playlists: [],
    lastQuery: '',
  },
  artists: {
    artists: [],
    lastQuery: '',
  },
  users: {
    users: [],
    lastQuery: '',
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeTab: (
      state,
      action: PayloadAction<
        'all' | 'artists' | 'playlists' | 'songs' | 'profiles'
      >,
    ) => {
      state.tab = action.payload;
    },
    changeQuery: (state: SearchState, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(searchMain.fulfilled, (state, action) => {
        state.mainSearch = action.payload.results;
      })
      .addCase(searchSongs.fulfilled, (state, action) => {
        state.songs.songs = action.payload.songs;
        state.songs.lastQuery = state.query;
      }),
});

export const { changeTab, changeQuery } = searchSlice.actions;
export default searchSlice.reducer;

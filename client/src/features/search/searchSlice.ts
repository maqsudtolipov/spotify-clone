import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from './searchTypes.ts';
import { searchMain, searchPlaylists, searchSongs, searchUsers } from './searchThunks.ts';

const initialState: SearchState = {
  tab: 'all',
  query: '',
  mainSearch: {
    songs: [],
    lastQuery: '',
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
        state.mainSearch.lastQuery = state.query;
      })
      .addCase(searchSongs.fulfilled, (state, action) => {
        state.songs.songs = action.payload.songs;
        state.songs.lastQuery = state.query;
      })
      .addCase(searchPlaylists.fulfilled, (state, action) => {
        state.playlists.playlists = action.payload.playlists;
        state.playlists.lastQuery = state.query;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users.users = action.payload.users;
        state.users.lastQuery = state.query;
      }),
});

export const { changeTab, changeQuery } = searchSlice.actions;
export default searchSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from './searchTypes.ts';
import { searchArtists, searchMain, searchPlaylists, searchSongs, searchUsers } from './searchThunks.ts';
import { initialState } from './searchInitialState.ts';

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<'all' | 'artists' | 'playlists' | 'songs' | 'profiles'>) => {
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
      // Songs tab
      .addCase(searchSongs.pending, (state) => {
        state.songs.apiStatus = 'pending';
      })
      .addCase(searchSongs.fulfilled, (state, action) => {
        state.songs.items = state.songs.lastQuery === state.query
          ? [...state.songs.items, ...action.payload.songs]
          : action.payload.songs;

        state.songs.lastQuery = state.query;
        state.songs.pagination = action.payload.pagination;
      })
      .addCase(searchSongs.rejected, (state) => {
        state.songs.apiStatus = 'rejected';
      })
      // Playlists tab
      .addCase(searchPlaylists.pending, (state) => {
        state.playlists.apiStatus = 'pending';
      })
      .addCase(searchPlaylists.fulfilled, (state, action) => {
        state.playlists.items = state.playlists.lastQuery === state.query
          ? [...state.playlists.items, ...action.payload.playlists]
          : action.payload.playlists;

        state.playlists.lastQuery = state.query;
        state.playlists.pagination = action.payload.pagination;
      })
      .addCase(searchPlaylists.rejected, (state) => {
        state.playlists.apiStatus = 'rejected';
      })
      // Users tab
      .addCase(searchUsers.pending, (state) => {
        state.users.apiStatus = 'pending';
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users.items = state.users.lastQuery === state.query
          ? [...state.users.items, ...action.payload.users]
          : action.payload.users;

        state.users.lastQuery = state.query;
        state.users.pagination = action.payload.pagination;
      })
      .addCase(searchUsers.rejected, (state) => {
        state.users.apiStatus = 'rejected';
      })
      // Artists tab
      .addCase(searchArtists.pending, (state) => {
        state.artists.apiStatus = 'pending';
      })
      .addCase(searchArtists.fulfilled, (state, action) => {
        state.artists.items = state.artists.lastQuery === state.query
          ? [...state.artists.items, ...action.payload.artists]
          : action.payload.artists;

        state.artists.lastQuery = state.query;
        state.artists.pagination = action.payload.pagination;
      })
      .addCase(searchArtists.rejected, (state) => {
        state.artists.apiStatus = 'rejected';
      }),
});

export const { changeTab, changeQuery } = searchSlice.actions;
export default searchSlice.reducer;

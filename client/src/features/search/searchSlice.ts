import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from './searchTypes.ts';
import { searchArtists, searchMain, searchPlaylists, searchSongs, searchUsers } from './searchThunks.ts';
import { initialState } from './searchInitialState.ts';

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
      // Songs tab
      .addCase(searchSongs.pending, (state) => {
        state.songs.apiStatus = 'pending';
      })
      .addCase(searchSongs.fulfilled, (state, action) => {
        if (state.songs.lastQuery === state.query) {
          state.songs.items = [...state.songs.items, ...action.payload.songs];
        } else {
          state.songs.items = action.payload.songs;
        }

        state.songs.lastQuery = state.query;
        state.songs.pagination = action.payload.pagination;
      })
      .addCase(searchSongs.rejected, (state) => {
        state.songs.apiStatus = 'rejected';
      })
      // Playlists tab
      .addCase(searchPlaylists.pending, (state) => {
        state.songs.apiStatus = 'pending';
      })
      .addCase(searchPlaylists.fulfilled, (state, action) => {
        if (state.playlists.lastQuery === state.query) {
          state.playlists.items = [
            ...state.playlists.items,
            ...action.payload.playlists,
          ];
        } else {
          state.playlists.items = action.payload.playlists;
        }

        state.playlists.lastQuery = state.query;
        state.playlists.pagination = action.payload.pagination;
      })
      .addCase(searchPlaylists.rejected, (state) => {
        state.songs.apiStatus = 'rejected';
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users.items = action.payload.users;
        state.users.lastQuery = state.query;
      })
      .addCase(searchArtists.fulfilled, (state, action) => {
        state.artists.items = action.payload.artists;
        state.artists.lastQuery = state.query;
      }),
});

export const { changeTab, changeQuery } = searchSlice.actions;
export default searchSlice.reducer;

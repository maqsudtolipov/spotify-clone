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
      .addCase(searchSongs.fulfilled, (state, action) => {
        console.log(action.payload);
        state.songs.lastQuery = state.query;
        state.songs.list.push(...action.payload.songs);
      })
      .addCase(searchPlaylists.fulfilled, (state, action) => {
        state.playlists.list = action.payload.playlists;
        state.playlists.lastQuery = state.query;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users.list = action.payload.users;
        state.users.lastQuery = state.query;
      })
      .addCase(searchArtists.fulfilled, (state, action) => {
        state.artists.list = action.payload.artists;
        state.artists.lastQuery = state.query;
      }),
});

export const { changeTab, changeQuery } = searchSlice.actions;
export default searchSlice.reducer;

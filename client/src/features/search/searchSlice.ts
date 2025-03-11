import { createSlice } from '@reduxjs/toolkit';
import { SearchState } from './searchTypes.ts';
import { searchMain } from './searchThunks.ts';

const initialState: SearchState = {
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
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(searchMain.fulfilled, (state, action) => {
      state.mainSearch = action.payload.results;
    }),
});

export default searchSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { SearchState } from './searchTypes.ts';
import { searchMain } from './searchThunks.ts';

const initialState: SearchState = {
  query: '',
  results: {
    songs: [],
  },
};

/*
  * Process:
  - On fetch: set query and items
 */

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(searchMain.fulfilled, (state, action) => {
      state.results = action.payload.results;
    }),
});

export default searchSlice.reducer;

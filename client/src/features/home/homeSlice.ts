import { InitialState } from './homeTypes.ts';
import { createSlice } from '@reduxjs/toolkit';

const initialState: InitialState = {
  data: {
    topSongs: [],
    newestSongs: [],
    recommendedArtists: [],
  },
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
});

export const {} = homeSlice.actions;
export default homeSlice.reducer;

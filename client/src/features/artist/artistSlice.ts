import { createSlice } from '@reduxjs/toolkit';
import { getArtist } from './artistThunks.ts';

interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

interface Artist {
  id: string;
  name: string;
  img: string;
  role: string;
  color: string;
}

interface InitialState {
  data: Artist | null;
  api: {
    getArtist: ApiStatus;
  };
}

const initialState: InitialState = {
  data: null,
  api: {
    getArtist: {
      status: 'idle',
      error: null,
    },
  },
};

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder // Check authenticated
      .addCase(getArtist.pending, (state) => {
        state.api.getArtist.status = 'pending';
      })
      .addCase(getArtist.fulfilled, (state, action) => {
        state.api.getArtist.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(getArtist.rejected, (state) => {
        state.api.getArtist.status = 'rejected';
        state.data = null;
      }),
});

export const {} = artistSlice.actions;
export default artistSlice.reducer;

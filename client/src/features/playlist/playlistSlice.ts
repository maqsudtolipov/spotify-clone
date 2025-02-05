import { createSlice } from '@reduxjs/toolkit';
import { getPlaylist } from './playlistThunks.ts';

interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

interface LibraryState {
  api: {
    getPlaylist: ApiStatus;
  };
}

const initialState: LibraryState = {
  api: {
    getPlaylist: { status: 'idle', error: null }
  }
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPlaylist.pending, (state) => {
        state.api.getPlaylist.status = 'pending';
      })
      .addCase(getPlaylist.fulfilled, (state) => {
        state.api.getPlaylist.status = 'fulfilled';
      })
      .addCase(getPlaylist.rejected, (state) => {
        state.api.getPlaylist.status = 'rejected';
      })
});

export default playlistSlice.reducer;

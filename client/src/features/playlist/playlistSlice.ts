import { createSlice } from '@reduxjs/toolkit';
import { getPlaylist } from './playlistThunks.ts';
import toast from 'react-hot-toast';

interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string;
  statusCode?: number;
}

export interface Playlist {
  id: string;
  name: string;
  img: {
    id: string;
    url: string;
  };
  user: {
    name: string;
    img: {
      id: string;
      url: string;
    };
  };
  description?: string;
  color: string;
}

interface LibraryState {
  data: Playlist | null;
  api: {
    getPlaylist: ApiStatus;
  };
}

const initialState: LibraryState = {
  data: null,
  api: {
    getPlaylist: { status: 'idle', error: '' }
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
      .addCase(getPlaylist.fulfilled, (state, { payload }) => {
        state.api.getPlaylist.status = 'fulfilled';
        state.data = payload;
      })
      .addCase(getPlaylist.rejected, (state, { payload }) => {
        state.api.getPlaylist.status = 'rejected';
        state.api.getPlaylist.statusCode = payload.statusCode;
        state.api.getPlaylist.error = payload.message;
        state.data = null;

        if (payload.statusCode !== 404 && payload.statusCode !== 500) {
          toast.error(`Error: ${payload.status} - ${payload.message}`);
        }
      })
});

export default playlistSlice.reducer;

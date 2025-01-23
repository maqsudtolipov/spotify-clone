import { createSlice } from '@reduxjs/toolkit';
import { getArtist, updateSong, uploadSong } from './artistThunks.ts';

interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

interface Song {
  id: string;
  name: string;
  artist: string;
  img: string;
  song: string;
  plays: number;
  duration: number;
}

interface Artist {
  id: string;
  name: string;
  img: string;
  role: string;
  color: string;
  followersCount: number;
  songs: Song[];
}

interface InitialState {
  data: Artist | null;
  api: {
    getArtist: ApiStatus;
    uploadSong: ApiStatus;
  };
}

const initialState: InitialState = {
  data: null,
  api: {
    getArtist: {
      status: 'idle',
      error: null,
    },
    uploadSong: {
      status: 'idle',
      error: null,
    },
    updateSong: {
      status: 'idle',
      error: null,
    },
  },
};

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    listenersCountUpdated: (state, action) => {
      if (state.data) state.data.followersCount = action.payload;
    },
  },
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
      })
      .addCase(uploadSong.pending, (state) => {
        state.api.uploadSong.status = 'pending';
      })
      .addCase(uploadSong.fulfilled, (state, action) => {
        state.api.uploadSong.status = 'fulfilled';
        if (state.data) state.data.songs = action.payload;
      })
      .addCase(uploadSong.rejected, (state) => {
        state.api.uploadSong.status = 'rejected';
      })
      .addCase(updateSong.pending, (state) => {
        state.api.updateSong.status = 'pending';
      })
      .addCase(updateSong.fulfilled, (state, action) => {
        state.api.updateSong.status = 'fulfilled';
        if (state.data) state.data.songs = action.payload;
      })
      .addCase(updateSong.rejected, (state) => {
        state.api.updateSong.status = 'rejected';
      }),
});

export const { listenersCountUpdated } = artistSlice.actions;
export default artistSlice.reducer;

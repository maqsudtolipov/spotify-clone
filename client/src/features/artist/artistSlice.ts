import { createSlice } from '@reduxjs/toolkit';
import { deleteSong, getArtist, updateSong, uploadSong } from './artistThunks.ts';
import toast from 'react-hot-toast';

interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string;
  statusCode?: number;
}

interface Song {
  id: string;
  name: string;
  artist: string;
  img: { id: string; url: string };
  song: { id: string; url: string };
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
    updateSong: ApiStatus;
  };
}

const initialState: InitialState = {
  data: null,
  api: {
    getArtist: {
      status: 'idle',
      error: ''
    },
    uploadSong: {
      status: 'idle',
      error: ''
    },
    updateSong: {
      status: 'idle',
      error: ''
    }
  }
};

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    listenersCountUpdated: (state, action) => {
      if (state.data) state.data.followersCount = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      // GET artist
      .addCase(getArtist.pending, (state) => {
        state.api.getArtist.status = 'pending';
      })
      .addCase(getArtist.fulfilled, (state, action) => {
        state.api.getArtist.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(getArtist.rejected, (state, { payload }) => {
        state.api.getArtist.status = 'rejected';
        state.api.getArtist.statusCode = payload.statusCode;
        state.api.getArtist.error = payload.message;
        state.data = null;

        if (payload.statusCode !== 404 && payload.statusCode !== 500) {
          toast.error(`Error: ${payload.status} - ${payload.message}`);
        }
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
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.api.updateSong.status = 'fulfilled';
        if (state.data) state.data.songs = action.payload;
      })
});

export const { listenersCountUpdated } = artistSlice.actions;
export default artistSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { getArtist, uploadSong } from './artistThunks.ts';

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
      })
      .addCase(uploadSong.pending, (state) => {
        state.api.uploadSong.status = 'pending';
      })
      .addCase(uploadSong.fulfilled, (state) => {
        state.api.uploadSong.status = 'fulfilled';
      })
      .addCase(uploadSong.rejected, (state) => {
        state.api.uploadSong.status = 'rejected';
      }),
});

export const {} = artistSlice.actions;
export default artistSlice.reducer;

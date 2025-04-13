import { createSlice } from '@reduxjs/toolkit';
import { deleteSong, getArtist, updateSong, uploadSong } from './artistThunks.ts';
import handleRejectedThunk from '../../axios/handleRejectedThunk.ts';
import { InitialState } from './artistTypes.ts';
import { RootState } from '../../redux/store.ts';

const initialState: InitialState = {
  data: null,
  api: {
    getArtist: { status: 'idle', error: '' },
    uploadSong: { status: 'idle', error: '' },
    updateSong: { status: 'idle', error: '' },
    deleteSong: { status: 'idle', error: '' },
  },
};

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    increaseListenersCount: (state) => {
      if (state.data) state.data.followersCount += 1;
    },
    decreaseListenersCount: (state) => {
      if (state.data) state.data.followersCount -= 1;
    },
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
      .addCase(getArtist.rejected, (state, action) => {
        handleRejectedThunk(state, action, 'getArtist');
        state.data = null;
      })

      // POST songs
      .addCase(uploadSong.pending, (state) => {
        state.api.uploadSong.status = 'pending';
      })
      .addCase(uploadSong.fulfilled, (state, action) => {
        state.api.uploadSong.status = 'fulfilled';
        if (state.data) state.data.songs = action.payload;
      })
      .addCase(uploadSong.rejected, (state, action) => {
        handleRejectedThunk(state, action, 'uploadSong');
      })

      // PATCH songs/:id
      .addCase(updateSong.pending, (state) => {
        state.api.updateSong.status = 'pending';
      })
      .addCase(updateSong.fulfilled, (state, action) => {
        state.api.updateSong.status = 'fulfilled';
        if (state.data) state.data.songs = action.payload;
      })
      .addCase(updateSong.rejected, (state, action) => {
        handleRejectedThunk(state, action, 'updateSong');
      })

      // DELETE songs/:id
      .addCase(deleteSong.pending, (state) => {
        state.api.deleteSong.status = 'pending';
      })

      .addCase(deleteSong.fulfilled, (state, action) => {
        state.api.updateSong.status = 'fulfilled';
        if (state.data) state.data.songs = action.payload;
      })
      .addCase(deleteSong.rejected, (state, action) => {
        handleRejectedThunk(state, action, 'deleteSong');
      }),
});

export const selectArtist = (state: RootState) => state.artist.data;
export const selectArtistSongs = (state: RootState) => state.artist.data?.songs;

export const { increaseListenersCount, decreaseListenersCount } = artistSlice.actions;
export default artistSlice.reducer;

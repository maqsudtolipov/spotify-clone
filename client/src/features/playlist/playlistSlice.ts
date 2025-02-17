import { createSlice } from '@reduxjs/toolkit';
import { getPlaylist, removeSongFromPlaylist } from './playlistThunks.ts';
import toast from 'react-hot-toast';
import { LibraryState } from './playlistTypes.ts';
import handleRejectedThunk from '../../axios/handleRejectedThunk.ts';

const initialState: LibraryState = {
  data: null,
  api: {
    getPlaylist: { status: 'idle', error: '' },
    removeSong: { status: 'idle', error: '' },
  },
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

      // Remove
      .addCase(removeSongFromPlaylist.pending, (state) => {
        state.api.removeSong.status = 'pending';
      })
      .addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
        state.api.removeSong.status = 'fulfilled';

        if (state.data?.songs) {
          state.data.songs = [...state.data.songs].filter(
            (song) => song.id !== action.payload,
          );
        }
      })
      .addCase(removeSongFromPlaylist.rejected, (state, action) => {
        handleRejectedThunk(state, action, 'removeSong');
      }),
});

export default playlistSlice.reducer;

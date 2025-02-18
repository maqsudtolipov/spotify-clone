import { createSlice } from '@reduxjs/toolkit';
import { createPlaylist, getPlaylist, removeSongFromPlaylist } from './playlistThunks.ts';
import { LibraryState } from './playlistTypes.ts';
import handleRejectedThunk from '../../axios/handleRejectedThunk.ts';

const initialState: LibraryState = {
  data: null,
  api: {
    getPlaylist: { status: 'idle', error: '' },
    createPlaylist: { status: 'idle', error: '' },
    editPlaylist: { status: 'idle', error: '' },
    removeSong: { status: 'idle', error: '' },
  },
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // GET playlist
      .addCase(getPlaylist.pending, (state) => {
        state.api.getPlaylist.status = 'pending';
      })
      .addCase(getPlaylist.fulfilled, (state, { payload }) => {
        state.api.getPlaylist.status = 'fulfilled';
        state.data = payload;
      })
      .addCase(getPlaylist.rejected, (state, action) => {
        handleRejectedThunk(state, action, 'getPlaylist');
        state.data = null;
      })

      // CREATE playlist
      .addCase(createPlaylist.pending, (state) => {
        state.api.createPlaylist.status = 'pending';
      })
      .addCase(createPlaylist.fulfilled, (state) => {
        state.api.createPlaylist.status = 'fulfilled';
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        handleRejectedThunk(state, action, 'createPlaylist');
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

import { createSlice } from '@reduxjs/toolkit';
import { createPlaylist, editPlaylist, getPlaylist, removeSongFromPlaylistThunk } from './playlistThunks.ts';
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
  reducers: {
    removeSongFromPlaylist: (state, action) => {
      if (state.data) {
        // Subtract song duration from playlist duration
        state.data.duration -= action.payload.duration;
        state.data.length -= 1;

        // Remove song from songs array
        state.data.songs = [...state.data.songs].filter(
          (song) => song.id !== action.payload.id,
        );
      }
    },
  },
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

      // UPDATE playlist
      .addCase(editPlaylist.pending, (state) => {
        state.api.editPlaylist.status = 'pending';
      })
      .addCase(editPlaylist.fulfilled, (state, action) => {
        state.api.editPlaylist.status = 'fulfilled';

        state.data.name = action.payload.name;
        state.data.img.url = action.payload.img.url;
        state.data.description = action.payload.description;
        state.data.isPublic = action.payload.isPublic;
      })
      .addCase(editPlaylist.rejected, (state, action) => {
        handleRejectedThunk(state, action, 'editPlaylist');
      })

      // Remove
      .addCase(removeSongFromPlaylistThunk.pending, (state) => {
        state.api.removeSong.status = 'pending';
      })
      .addCase(removeSongFromPlaylistThunk.fulfilled, (state) => {
        state.api.removeSong.status = 'fulfilled';
      })
      .addCase(removeSongFromPlaylistThunk.rejected, (state, action) => {
        handleRejectedThunk(state, action, 'removeSong');
      }),
});

export const { removeSongFromPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { dislikeSong, getCurrent, likeSong, login, logout, signUp } from './userThunks.ts';
import { InitialState } from './userTypes.ts';
import handleRejectedThunk from '../../axios/handleRejectedThunk.ts';

const initialState: InitialState = {
  data: null,
  isAuth: false,
  status: 'idle',
  error: null,
  api: {
    getCurrent: { status: 'idle', error: '' },
    signUp: { status: 'idle', error: '' },
    login: { status: 'idle', error: '' },
    logout: { status: 'idle', error: '' },
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    followingsUpdated: (state, action) => {
      if (state.data) state.data.followings = action.payload;
    },

    // Legacy
    playlistsUpdated: (state, action) => {
      if (state.data) state.data.playlists = action.payload;
    },
    // new
    addItemToPlaylists: (state, action) => {
      if (state.data) state.data.playlists.push(action.payload);
    },
    updateItemUserPlaylists: (state, action) => {
      if (state.data) {
        state.data.playlists = state.data.playlists.map((playlist) =>
          playlist._id === action.payload._id ? action.payload : playlist,
        );
      }
    },
    removeItemFromPlaylists: (state, action) => {
      if (state.data)
        state.data.playlists = state.data.playlists.map(
          (item) => item._id !== action.payload,
        );
    },

    // Save/remove
    addToLikedPlaylists: (state, action) => {
      if (state.data) {
        state.data.likedPlaylists.push(action.payload);
      }
    },
    removeFromLikedPlaylists: (state, action) => {
      if (state.data) {
        state.data.likedPlaylists = state.data.likedPlaylists.filter(
          (item) => item !== action.payload,
        );
      }
    },

    likedPlaylistsUpdated: (state, action) => {
      if (state.data) state.data.likedPlaylists = action.payload;
    },
    manualLogout: (state) => {
      if (state.data) {
        state.data = null;
        state.isAuth = false;
      }
    },
  },
  extraReducers: (builder) =>
    builder
      // Check authenticated
      .addCase(getCurrent.pending, (state) => {
        state.api.getCurrent.status = 'pending';
      })
      .addCase(getCurrent.fulfilled, (state, action) => {
        state.api.getCurrent.status = 'fulfilled';
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(getCurrent.rejected, (state) => {
        state.api.getCurrent.status = 'rejected';
        state.data = null;
        state.isAuth = false;
      })

      // Sign up
      .addCase(signUp.pending, (state) => {
        state.api.signUp.status = 'pending';
      })
      .addCase(signUp.fulfilled, (state) => {
        state.api.signUp.status = 'fulfilled';
      })
      .addCase(signUp.rejected, (state, action) => {
        handleRejectedThunk(state, action, 'signUp');
      })

      // Login
      .addCase(login.pending, (state) => {
        state.api.login.status = 'pending';
      })
      .addCase(login.fulfilled, (state) => {
        state.api.login.status = 'fulfilled';
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        handleRejectedThunk(state, action, 'login');
        state.data = null;
        state.isAuth = false;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.api.logout.status = 'pending';
      })
      .addCase(logout.fulfilled, (state) => {
        state.api.logout.status = 'fulfilled';
        state.data = null;
        state.isAuth = false;
      })
      .addCase(logout.rejected, (state) => {
        state.api.logout.status = 'rejected';
      })
      // Like
      .addCase(likeSong.fulfilled, (state, action) => {
        if (state.data) state.data.likedSongs.songs = action.payload;
      })
      .addCase(dislikeSong.fulfilled, (state, action) => {
        if (state.data) state.data.likedSongs.songs = action.payload;
      }),
});

export const {
  followingsUpdated,
  playlistsUpdated,
  likedPlaylistsUpdated,
  manualLogout,
  addItemToPlaylists,
  updateItemUserPlaylists,
  removeItemFromPlaylists,
  addToLikedPlaylists,
  removeFromLikedPlaylists
} = userSlice.actions;
export default userSlice.reducer;

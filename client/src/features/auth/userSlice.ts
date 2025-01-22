import { createSlice } from '@reduxjs/toolkit';
import {
  dislikeSong,
  getCurrent,
  likeSong,
  login,
  logout,
  signUp,
} from './userThunks.ts';

interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

interface User {
  id: string;
  email: string;
  name: string;
  img: string;
  followers: string[];
  followersCount: number;
  followings: string[];
  followingsCount: number;
  likedSongs: {
    id: string;
    songs: string[];
  };
}

interface InitialState {
  data: User | null;
  isAuth: boolean;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
  api: {
    getCurrent: ApiStatus;
    signUp: ApiStatus;
    login: ApiStatus;
    logout: ApiStatus;
  };
}

const initialState: InitialState = {
  data: null,
  isAuth: false,
  status: 'idle',
  error: null,
  api: {
    getCurrent: { status: 'idle', error: null },
    signUp: {
      status: 'idle',
      error: null,
    },
    login: {
      status: 'idle',
      error: null,
    },
    logout: { status: 'idle', error: null },
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    followingsUpdated: (state, action) => {
      if (state.data) state.data.followings = action.payload;
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
      .addCase(signUp.rejected, (state) => {
        state.api.signUp.status = 'rejected';
      })
      // Login
      .addCase(login.pending, (state) => {
        state.api.login.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.api.login.status = 'fulfilled';
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state) => {
        state.api.login.status = 'rejected';
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
        state.data = null;
        state.isAuth = false;
      })
      // Like
      .addCase(likeSong.fulfilled, (state, action) => {
        if (state.data) state.data.likedSongs.songs = action.payload;
      })
      .addCase(dislikeSong.fulfilled, (state, action) => {
        if (state.data) state.data.likedSongs.songs = action.payload;
      }),
});

export const { followingsUpdated } = userSlice.actions;
export default userSlice.reducer;

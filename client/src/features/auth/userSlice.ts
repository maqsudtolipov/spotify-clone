import { createSlice } from '@reduxjs/toolkit';
import { getCurrent, login, logout, signUp } from './userThunks.ts';

interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

interface User {
  id: string;
  email: string;
  name: string;
}

interface InitialState {
  data: User | null;
  isAuth: boolean;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
  api: {
    signUp: ApiStatus;
  }
}

const initialState: InitialState = {
  data: null,
  isAuth: false,
  status: 'idle',
  error: null,
  api: {
    signUp: {
      status: 'idle',
      error: null,
    },
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Check authenticated
      .addCase(getCurrent.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getCurrent.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(getCurrent.rejected, (state) => {
        state.status = 'rejected';
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
      .addCase(signUp.rejected, state => {
        state.api.signUp.status  = 'rejected'
      })
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state) => {
        state.status = 'rejected';
        state.data = null;
        state.isAuth = false;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.data = null;
        state.isAuth = false;
      })
      .addCase(logout.rejected, (state) => {
        state.status = 'rejected';
        state.data = null;
        state.isAuth = false;
      }),
});

export const {} = userSlice.actions;
export default userSlice.reducer;

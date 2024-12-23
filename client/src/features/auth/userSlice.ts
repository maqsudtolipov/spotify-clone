import { createSlice } from '@reduxjs/toolkit';
import { getCurrent, login } from './userThunks.ts';

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
}

const initialState: InitialState = {
  data: null,
  isAuth: false,
  status: 'idle',
  error: null,
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
      }),
});

export const {} = userSlice.actions;
export default userSlice.reducer;

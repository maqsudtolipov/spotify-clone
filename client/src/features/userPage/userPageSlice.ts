import { createSlice } from '@reduxjs/toolkit';
import { getArtist } from '../artist/artistThunks.ts';
import { getUser } from './userPageThunks.ts';

interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

interface UserPage {
  name: string;
  color: string;
}

interface InitialState {
  data: UserPage | null;
  api: {
    getUser: ApiStatus;
  };
}

const initialState: InitialState = {
  data: null,
  api: {
    getUser: {
      status: 'idle',
      error: null,
    },
  },
};

const userPageSlice = createSlice({
  name: 'userPage',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUser.pending, (state) => {
        state.api.getUser.status = 'pending';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.api.getUser.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.api.getUser.status = 'rejected';
        state.data = null;
      }),
});

export const {} = userPageSlice.actions;
export default userPageSlice.reducer;

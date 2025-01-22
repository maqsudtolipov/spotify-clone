import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser } from './userPageThunks.ts';

interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

interface UserPage {
  img: string;
  name: string;
  color: string;
  followersCount: number;
  followingsCount: number;
}

interface InitialState {
  data: null | UserPage;
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
  reducers: {
    followersCountUpdated: (state, action) => {
      state.data.followersCount = action.payload;
    },
  },
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

export const { followersCountUpdated } = userPageSlice.actions;
export default userPageSlice.reducer;

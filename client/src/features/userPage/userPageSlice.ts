import { createSlice } from '@reduxjs/toolkit';
import { getUser } from './userPageThunks.ts';
import toast from 'react-hot-toast';

interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string;
  statusCode?: number;
}

interface UserPage {
  id: string;
  img: {
    id: string;
    url: string;
  };
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
      error: ''
    }
  }
};

const userPageSlice = createSlice({
  name: 'userPage',
  initialState,
  reducers: {
    followersCountUpdated: (state, action) => {
      state.data.followersCount = action.payload;
    }
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
      .addCase(getUser.rejected, (state, { payload }) => {
        state.api.getUser.status = 'rejected';
        state.api.getUser.statusCode = payload.statusCode;
        state.api.getUser.error = payload.message;
        state.data = null;

        if (payload.statusCode !== 404 && payload.statusCode !== 500) {
          toast.error(`Error: ${payload.status} - ${payload.message}`);
        }
      })
});

export const { followersCountUpdated } = userPageSlice.actions;
export default userPageSlice.reducer;

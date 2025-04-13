import { createSlice } from '@reduxjs/toolkit';
import { getUser } from './userPageThunks.ts';
import { InitialState } from './userPageTypes.ts';
import handleRejectedThunk from '../../axios/handleRejectedThunk.ts';

const initialState: InitialState = {
  data: null,
  api: {
    getUser: {
      status: 'idle',
      error: '',
    },
  },
};

const userPageSlice = createSlice({
  name: 'userPage',
  initialState,
  reducers: {
    increaseFollowersCount: (state) => {
      if (state.data) state.data.followersCount += 1;
    },
    decreaseFollowersCount: (state) => {
      if (state.data) state.data.followersCount -= 1;
    },
    userPageUpdateData: (state, action) => {
      if (state.data) {
        state.data.name = action.payload.name;
        state.data.img.url = action.payload.img.url;
      }
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
      .addCase(getUser.rejected, (state, action) => {
        handleRejectedThunk(state, action, 'getUser');
      }),
});

export const {
  increaseFollowersCount,
  decreaseFollowersCount,
  userPageUpdateData,
} = userPageSlice.actions;
export default userPageSlice.reducer;

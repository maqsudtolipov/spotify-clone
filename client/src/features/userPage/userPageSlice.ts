import { createSlice } from '@reduxjs/toolkit';

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
});

export const {} = userPageSlice.actions;
export default userPageSlice.reducer;

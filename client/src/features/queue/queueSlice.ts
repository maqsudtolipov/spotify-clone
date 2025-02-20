import { Queue } from './queueTypes.ts';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Queue = {
  items: [],
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = queueSlice.actions;
export default queueSlice.reducer;

import { Queue } from './queueTypes.ts';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Queue = {
  current: 0,
  items: [],
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    playNext: (state) => {
      const nextItem = state.items.shift();
      if (nextItem) {
        state.items.push(nextItem);
      }
    },
    playPrev: (state) => {
      const last = state.items.pop();
      if (last) {
        state.items.unshift(last);
      }
    }
  },
});

export const { setItems, playNext, playPrev } = queueSlice.actions;
export default queueSlice.reducer;

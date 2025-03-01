import { Queue } from './queueTypes.ts';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Queue = {
  current: 0,
  isShuffled: true,
  items: [],
  originalItems: [],
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.originalItems = action.payload;
      // Shuffles items
      if (state.isShuffled) {
        state.items = action.payload
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
      } else {
        state.items = action.payload;
      }
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
    },
  },
});

export const { setItems, playNext, playPrev } = queueSlice.actions;
export default queueSlice.reducer;

import { Queue } from './queueTypes.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Queue = {
  current: 0,
  isShuffled: false,
  isOpen: false,
  items: [],
  originalItems: [],
  isPlaying: false,
  currentListId: '',
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    playerTogglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    playerSetList: (state, action: PayloadAction<string>) => {
      state.currentListId = action.payload;
    },
    setItems: (state, action) => {
      state.originalItems = action.payload;
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
    },
    toggleIsShuffled: (state) => {
      state.isShuffled = !state.isShuffled;

      // Shuffles items
      if (state.isShuffled) {
        state.items = [...state.originalItems]
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
      } else {
        state.items = state.originalItems;
      }
    },
    openQueue: (state) => {
      state.isOpen = true;
    },
    closeQueue: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  setItems,
  playNext,
  playPrev,
  toggleIsShuffled,
  openQueue,
  closeQueue,
  playerTogglePlay,
  playerSetList,
} = queueSlice.actions;
export default queueSlice.reducer;

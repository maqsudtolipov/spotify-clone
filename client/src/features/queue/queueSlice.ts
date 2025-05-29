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
  currentListName: '',
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    moveSongToTop: (state, action: PayloadAction<string>) => {
      if (state.items.length > 1) {
        const songIndex = state.items.findIndex(
          (item) => item.id === action.payload,
        );

        if (state.isShuffled) {
          // Shuffle: Move the song to the top, keeping the shuffle intact
          state.items = [
            state.items[songIndex],
            ...state.items.slice(0, songIndex),
            ...state.items.slice(songIndex + 1),
          ];
        } else {
          // Normal: Reorder the list with the clicked song at the top
          state.items = [
            ...state.items.slice(songIndex),
            ...state.items.slice(0, songIndex),
          ];
        }
      }
    },
    playerTogglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    playerSetList: (
      state,
      action: PayloadAction<{ id: string; name: string }>,
    ) => {
      state.currentListId = action.payload.id;
      state.currentListName = action.payload.name;
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
  moveSongToTop,
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

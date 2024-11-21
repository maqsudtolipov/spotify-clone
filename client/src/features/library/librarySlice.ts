import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  img: string;
  name: string;
  type: string;
  isPinned: boolean;
  createdAt: string;
}

interface LibraryState {
  items: Item[];
  sortBy: 'alphabetical' | 'recentlyAdded';
}

const initialState: LibraryState = {
  items: [],
  sortBy: 'alphabetical',
};

const sortItems = (
  items: Item[],
  sortBy: 'alphabetical' | 'recentlyAdded',
): Item[] =>
  [...items].sort((a, b) => {
    const pinComparison = +b.isPinned - +a.isPinned;
    if (pinComparison !== 0) return pinComparison;

    if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'recentlyAdded') {
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    }

    return 0;
  });

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setLibraryItems: (state, action: PayloadAction<[]>) => {
      state.items = sortItems(action.payload, 'alphabetical');
    },
    sortLibraryItems: (
      state,
      action: PayloadAction<'alphabetical' | 'recentlyAdded'>,
    ) => {
      state.sortBy = action.payload;
      state.items = sortItems(state.items, state.sortBy);
    },
  },
});

export const { setLibraryItems, sortLibraryItems } = librarySlice.actions;
export default librarySlice.reducer;

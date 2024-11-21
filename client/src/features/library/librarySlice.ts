import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  img: string;
  name: string;
  type: string;
  isPinned: boolean;
  createdAt: string;
}

interface LibraryState {
  originalItems: Item[];
  items: Item[];
  sortBy: 'alphabetical' | 'recentlyAdded';
  filter: 'artist' | 'playlist' | 'none';
  searchQuery: string;
}

const initialState: LibraryState = {
  originalItems: [],
  items: [],
  sortBy: 'alphabetical',
  filter: 'none',
  searchQuery: '',
};

const processItems = (
  items: Item[],
  sortBy: 'alphabetical' | 'recentlyAdded',
  filter: 'artist' | 'playlist' | 'none',
  searchQuery: string,
): Item[] => {
  let arr = [...items];

  // 1. Sort items
  arr = arr.sort((a, b) => {
    const pinComparison = +b.isPinned - +a.isPinned;
    if (pinComparison !== 0) return pinComparison;

    if (sortBy === 'recentlyAdded') {
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    } else {
      // sort alphabetically by default
      return a.name.localeCompare(b.name);
    }
  });

  // 2. Filter items
  arr = filter !== 'none' ? arr.filter((item) => item.type === filter) : arr;

  return arr;
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    sortLibraryItems: (
      state,
      action: PayloadAction<'alphabetical' | 'recentlyAdded'>,
    ) => {
      state.sortBy = action.payload;
      state.items = processItems(
        state.originalItems,
        state.sortBy,
        state.filter,
        '',
      );
    },
    filterLibraryItems: (
      state,
      action: PayloadAction<'artist' | 'playlist' | 'none'>,
    ) => {
      state.filter = action.payload;
      state.items = processItems(
        state.originalItems,
        state.sortBy,
        state.filter,
        '',
      );
    },
    setLibraryItems: (state, action: PayloadAction<[]>) => {
      state.originalItems = action.payload;
      state.items = processItems(
        state.originalItems,
        state.sortBy,
        state.filter,
        '',
      );
    },
  },
});

export const { setLibraryItems, sortLibraryItems, filterLibraryItems } =
  librarySlice.actions;
export default librarySlice.reducer;

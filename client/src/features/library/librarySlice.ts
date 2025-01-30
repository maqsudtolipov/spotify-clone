import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  img: string;
  name: string;
  itemType: string;
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
  searchQuery: ''
};

const processItems = (
  items: Item[],
  sortBy: 'alphabetical' | 'recentlyAdded',
  filter: 'artist' | 'playlist' | 'none',
  searchQuery: string
): Item[] => {
  let arr = [...items];

  console.log(items);

  // 1. Sort items
  // arr = [...arr].sort((a, b) => {
  //   const pinComparison = +b.isPinned - +a.isPinned;
  //   if (pinComparison !== 0) return pinComparison;
  //
  //   if (sortBy === 'recentlyAdded') {
  //     return +new Date(b.createdAt) - +new Date(a.createdAt);
  //   } else {
  //     // sort alphabetically by default
  //     return a.name.localeCompare(b.name);
  //   }
  // });

  // 2. Filter items
  // arr =
  //   filter !== 'none' ? arr.filter((item) => item.itemType === filter) : arr;

  // 3. SearchPage items
  // arr =
  //   searchQuery.length >= 3
  //     ? arr.filter((item) =>
  //       item.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //     : arr;

  return arr;
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    sortLibraryItems: (
      state,
      action: PayloadAction<'alphabetical' | 'recentlyAdded'>
    ) => {
      state.sortBy = action.payload;
      state.items = processItems(
        state.originalItems,
        state.sortBy,
        state.filter,
        state.searchQuery
      );
    },
    filterLibraryItems: (
      state,
      action: PayloadAction<'artist' | 'playlist' | 'none'>
    ) => {
      state.filter = action.payload;
      state.items = processItems(
        state.originalItems,
        state.sortBy,
        state.filter,
        state.searchQuery
      );
    },
    searchLibraryItems: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.items = processItems(
        state.originalItems,
        state.sortBy,
        state.filter,
        state.searchQuery
      );
    },
    setLibraryItems: (state, action) => {
      state.originalItems = state.originalItems = structuredClone(
        action.payload
      );

      // console.log(state.originalItems);
      state.items = processItems(
        state.originalItems,
        state.sortBy,
        state.filter,
        state.searchQuery
      );
    }
  }
});

export const {
  setLibraryItems,
  sortLibraryItems,
  filterLibraryItems,
  searchLibraryItems
} = librarySlice.actions;
export default librarySlice.reducer;

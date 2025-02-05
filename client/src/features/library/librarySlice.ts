import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import processItems from './helpers/processItems.ts';

interface Item {
  id: string;
  name: string;
  user: string;
  img: string;
  isPinned: boolean;
  itemType: string;
  createdAt: Date;
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

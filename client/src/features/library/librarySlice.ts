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
  searchQuery: '',
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
        state.searchQuery,
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
        state.searchQuery,
      );
    },
    searchLibraryItems: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.items = processItems(
        state.originalItems,
        state.sortBy,
        state.filter,
        state.searchQuery,
      );
    },
    // needs to go in future
    setLibraryItems: (state, action) => {
      state.originalItems = state.originalItems = structuredClone(
        action.payload,
      );

      state.items = processItems(
        state.originalItems,
        state.sortBy,
        state.filter,
        state.searchQuery,
      );
    },
    // new library updates
    addItemToLibrary(state, action) {
      state.originalItems.push({ ...action.payload, isPinned: false });

      state.items = processItems(
        state.originalItems,
        state.sortBy,
        state.filter,
        state.searchQuery,
      );
    },
    updateLibraryPlaylist(state, action) {
      state.originalItems = state.originalItems.map((playlist) =>
        playlist.id === action.payload.id ? { ...action.payload } : playlist,
      );

      state.items = processItems(
        state.originalItems,
        state.sortBy,
        state.filter,
        state.searchQuery,
      );
    },
    removePlaylistFromLibrary(state, action) {
      state.originalItems = state.originalItems.filter(
        (item) => item.id !== action.payload,
      );

      state.items = processItems(
        state.originalItems,
        state.sortBy,
        state.filter,
        state.searchQuery,
      );
    },
  },
});

export const {
  setLibraryItems,
  sortLibraryItems,
  filterLibraryItems,
  searchLibraryItems,
  addItemToLibrary,
  updateLibraryPlaylist,
  removePlaylistFromLibrary,
} = librarySlice.actions;
export default librarySlice.reducer;

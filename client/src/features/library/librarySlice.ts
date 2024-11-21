import { createSlice } from '@reduxjs/toolkit';

interface Item {
  img: string;
  name: string;
  type: string;
  isPinned: boolean;
  createdAt: string;
}

interface LibraryState {
  items: Item[];
}

const initialState: LibraryState = {
  items: [],
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {},
});

export const {} = librarySlice.actions;
export default librarySlice.reducer;

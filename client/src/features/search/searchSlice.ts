import { createSlice } from '@reduxjs/toolkit';
import { SearchState } from './searchTypes.ts';

const initialState: SearchState = {
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
});

export default searchSlice.reducer;

import { Queue } from './queueTypes.ts';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Queue = {
  items: [],
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {},
});

export default queueSlice.reducer;

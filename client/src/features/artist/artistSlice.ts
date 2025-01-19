import { createSlice } from '@reduxjs/toolkit';

interface Artist {
  id: string;
  name: string;
  img: string;
}

interface InitialState {
  data: Artist | null;
}

const initialState: InitialState = {
  data: null,
};

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
  extraReducers,
});

export const {} = artistSlice.actions;
export default artistSlice.reducer;

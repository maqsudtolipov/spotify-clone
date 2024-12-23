import {createSlice}from '@reduxjs/toolkit'

interface UserState {
  data?: {
    name: string;
    email: string;
    role: 'user' | 'admin';
  }

  isLoggedIn: boolean;
}

const initialState: UserState = {
  isLoggedIn: false,
}

const librarySlice = createSlice({
  name:'user',
  initialState,
  reducers: {}
})

export const {} = librarySlice.actions;
export default librarySlice.reducer;
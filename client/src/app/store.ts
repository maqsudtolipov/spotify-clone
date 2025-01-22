import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from '../features/library/librarySlice.ts';
import userReducer from '../features/auth/userSlice.ts';
import artistReducer from '../features/artist/artistSlice.ts';
import userPageReducer from '../features/userPage/userPageSlice.ts';

export const store = configureStore({
  reducer: {
    library: libraryReducer,
    user: userReducer,
    artist: artistReducer,
    userPage: userPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

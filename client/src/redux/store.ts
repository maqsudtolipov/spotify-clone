import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from '../features/library/librarySlice.ts';
import userReducer from '../features/auth/userSlice.ts';
import artistReducer from '../features/artist/artistSlice.ts';
import userPageReducer from '../features/userPage/userPageSlice.ts';
import playlistReducer from '../features/playlist/playlistSlice.ts';

export const store = configureStore({
  reducer: {
    library: libraryReducer,
    user: userReducer,
    artist: artistReducer,
    userPage: userPageReducer,
    playlist: playlistReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

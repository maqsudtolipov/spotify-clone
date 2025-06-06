import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from '../features/library/librarySlice.ts';
import userReducer from '../features/user/userSlice.ts';
import artistReducer from '../features/artist/artistSlice.ts';
import userPageReducer from '../features/userPage/userPageSlice.ts';
import playlistReducer from '../features/playlist/playlistSlice.ts';
import queueReducer from '../features/queue/queueSlice.ts';
import searchReducer from '../features/search/searchSlice.ts';

export const store = configureStore({
  reducer: {
    library: libraryReducer,
    user: userReducer,
    artist: artistReducer,
    userPage: userPageReducer,
    playlist: playlistReducer,
    queue: queueReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

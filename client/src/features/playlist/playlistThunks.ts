import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { setLibraryItems } from '../library/librarySlice.ts';
import { playlistsUpdated } from '../auth/userSlice.ts';

export const getPlaylist = createAsyncThunk(
  'playlist/getPlaylist',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/playlists/${id}`);
      return res.data.playlist;
    } catch (err) {
      err.response.data.statusCode = err.response.status;
      return rejectWithValue(err.response.data);
    }
  },
);

export const createPlaylist = createAsyncThunk(
  'playlist/createPlaylist',
  async (_, { dispatch }) => {
    const res = await axios.post(`/playlists/`);
    dispatch(setLibraryItems(res.data.library.items));
    dispatch(playlistsUpdated(res.data.playlists));
  },
);

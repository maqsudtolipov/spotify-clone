import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getPlaylist = createAsyncThunk(
  'playlist/getPlaylist',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/playlists/${id}`);
      return res.data.artist;
    } catch (err) {
      err.response.data.statusCode = err.response.status;
      return rejectWithValue(err.response.data);
    }
  }
);

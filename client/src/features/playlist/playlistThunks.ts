import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getPlaylist = createAsyncThunk(
  'playlist/getPlaylist',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/artists/${id}`);
      return res.data.artist;
    } catch (err) {
      console.log(err.response);
      return rejectWithValue(err.response.data);
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getPlaylist = createAsyncThunk(
  'playlist/getPlaylist',
  async ({ id }: { id: string }) => {
    const res = await axios.get(`/artists/${id}`);
    return res.data.artist;
  }
);

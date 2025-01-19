import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getArtist = createAsyncThunk(
  'artist/getArtist',
  async (id: string) => {
    const res = await axios.get(`/artists/${id}`, id);
    return res.data.artist;
  },
);

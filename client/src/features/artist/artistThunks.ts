import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getArtist = createAsyncThunk(
  'artist/getArtist',
  async (id: string) => {
    const res = await axios.get(`/artists/${id}`, id);
    return res.data.artist;
  },
);

export const uploadSong = createAsyncThunk(
  'artist/uploadSong',
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const res = await axios.post(`/songs/${id}`, formData);
    return res.data.songs;
  },
);

export const updateSong = createAsyncThunk(
  'artist/updateSong',
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const res = await axios.patch(`/songs/${id}`, formData);
    return res.data.songs;
  },
);

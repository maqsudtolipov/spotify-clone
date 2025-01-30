import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getArtist = createAsyncThunk(
  'artist/getArtist',
  async (id: string) => {
    const res = await axios.get(`/artists/${id}`);
    return res.data.artist;
  }
);

export const uploadSong = createAsyncThunk(
  'artist/uploadSong',
  async ({ formData }: { formData: FormData }) => {
    const res = await axios.post(`/songs`, formData);
    return res.data.songs;
  }
);

export const updateSong = createAsyncThunk(
  'artist/updateSong',
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const res = await axios.patch(`/songs/${id}`, formData);
    return res.data.songs;
  }
);

export const deleteSong = createAsyncThunk(
  'artist/deleteSong',
  async ({ id }: { id: string }) => {
    const res = await axios.delete(`/songs/${id}`);
    return res.data.songs;
  }
);

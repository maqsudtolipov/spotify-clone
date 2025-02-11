import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios';
import handleAxiosError from '../../axios/handleAxiosError.ts';
import { RejectValue } from '../../axios/axiosTypes.ts';
import { Artist, Song } from './artistTypes.ts';

export const getArtist = createAsyncThunk<
  Artist,
  string,
  { rejectValue: RejectValue }
>('artist/getArtist', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/artists/${id}`);
    return res.data.artist;
  } catch (e) {
    rejectWithValue(handleAxiosError(e));
  }
});

export const uploadSong = createAsyncThunk<
  Song[],
  FormData,
  { rejectValue: RejectValue }
>('artist/uploadSong', async (formData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`/songs`, formData);
    return res.data.songs;
  } catch (e) {
    rejectWithValue(handleAxiosError(e));
  }
});

export const updateSong = createAsyncThunk<
  Song[],
  { id: string; formData: FormData },
  { rejectValue: RejectValue }
>('artist/updateSong', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const res = await axios.patch(`/songs/${id}`, formData);
    return res.data.songs;
  } catch (e) {
    rejectWithValue(handleAxiosError(e));
  }
});

export const deleteSong = createAsyncThunk<
  Song[],
  string,
  { rejectValue: RejectValue }
>('artist/deleteSong', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`/songs/${id}`);
    return res.data.songs;
  } catch (e) {
    rejectWithValue(handleAxiosError(e));
  }
});

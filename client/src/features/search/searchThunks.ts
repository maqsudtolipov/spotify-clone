import { createAsyncThunk } from '@reduxjs/toolkit';
import { RejectValue } from '../../axios/axiosTypes.ts';
import axios from '../../axios/axios';
import handleAxiosError from '../../axios/handleAxiosError.ts';

export const searchMain = createAsyncThunk<
  unknown,
  string,
  { rejectValue: RejectValue }
>('search/searchMain', async (name, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/search?name=${name}`);
    return res.data;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

export const searchSongs = createAsyncThunk<
  unknown,
  string,
  { rejectValue: RejectValue }
>('search/songs', async (name, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/search/songs?name=${name}`);
    return res.data;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

export const searchPlaylists = createAsyncThunk<
  unknown,
  string,
  { rejectValue: RejectValue }
>('search/playlists', async (name, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/search/playlists?name=${name}`);
    return res.data;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

export const searchUsers = createAsyncThunk<
  unknown,
  string,
  { rejectValue: RejectValue }
>('search/users', async (name, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/search/users?name=${name}`);
    return res.data;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

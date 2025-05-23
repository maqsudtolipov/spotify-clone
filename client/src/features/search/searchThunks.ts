import { createAsyncThunk } from '@reduxjs/toolkit';
import { RejectValue } from '../../axios/axiosTypes.ts';
import axios from '../../axios/axios';
import handleAxiosError from '../../axios/handleAxiosError.ts';

// NOTE: this seems to be based on client width
const PAGE_LIMIT = 20;

export const searchMain = createAsyncThunk<
  unknown,
  string,
  { rejectValue: RejectValue }
>('search/searchMain', async (name, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/search?name=${name}&limit=${PAGE_LIMIT}`);
    return res.data;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

export const searchSongs = createAsyncThunk<
  unknown,
  { query: string; page?: number },
  { rejectValue: RejectValue }
>('search/songs', async ({ query, page }, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `/search/songs?name=${query}&limit=${PAGE_LIMIT}&page=${page || 1}`,
    );
    return res.data;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

export const searchPlaylists = createAsyncThunk<
  unknown,
  { query: string; page?: number },
  { rejectValue: RejectValue }
>('search/playlists', async ({ query, page }, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `/search/playlists?name=${query}&limit=${PAGE_LIMIT}&page=${page || 1}`,
    );
    return res.data;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

export const searchUsers = createAsyncThunk<
  unknown,
  { query: string; page?: number },
  { rejectValue: RejectValue }
>('search/users', async ({ query, page }, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `/search/users?name=${query}&limit=${PAGE_LIMIT}&page=${page || 1}`,
    );
    return res.data;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

export const searchArtists = createAsyncThunk<
  unknown,
  { query: string; page?: number },
  { rejectValue: RejectValue }
>('search/artists', async ({ query, page }, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `/search/artists?name=${query}&limit=${PAGE_LIMIT}&page=${page || 1}`,
    );
    return res.data;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

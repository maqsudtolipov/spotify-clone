import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios.js';
import { RejectValue } from '../../axios/axiosTypes.ts';
import handleAxiosError from '../../axios/handleAxiosError.ts';
import { UserPage } from './userPageTypes.ts';

export const getUser = createAsyncThunk<
  UserPage,
  { id: string },
  { rejectValue: RejectValue }
>('userPage/getUser', async ({ id }: { id: string }, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/users/${id}`);
    return res.data.user;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { RejectValue } from '../../axios/axiosTypes.ts';
import axios from '../../axios/axios';
import handleAxiosError from '../../axios/handleAxiosError.ts';

export const searchMain = createAsyncThunk<
  unknown,
  string,
  { rejectValue: RejectValue }
>('search/searchMain', async (query, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/search?query=${query}`);
    console.log(res);
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

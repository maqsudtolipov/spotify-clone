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
    console.log(res.data);
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

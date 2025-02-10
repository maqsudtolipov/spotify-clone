import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios.js';

export const getUser = createAsyncThunk(
  'userPage/getUser',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/users/${id}`);
      console.log(res);
      return res.data.user;
    } catch (e) {
      e.response.data.statusCode = e.response.status;
      return rejectWithValue(e.response.data);
    }
  }
);

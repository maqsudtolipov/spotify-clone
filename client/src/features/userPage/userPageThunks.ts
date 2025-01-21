import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios.js';

export const getUser = createAsyncThunk(
  'userPage/getUser',
  async ({ id }: { id: string }) => {
    const res = await axios.get(`/users/${id}`);
    return res.data.user;
  },
);

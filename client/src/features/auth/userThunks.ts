import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// Checks whether the user is authenticated using cookies
export const getCurrent = createAsyncThunk('user/getCurrent', async () => {
  const res = await axios.get('/users/current');
  console.log(res.data.user);
  return res.data.user;
});

interface LoginInput {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'user/login',
  async (input: LoginInput) => {
    console.log(input);
    const res = await axios.post('/auth/login', input);
    console.log(res);
    return res.data;
  },
);

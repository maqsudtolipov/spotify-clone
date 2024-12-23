import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// Checks whether the user is authenticated using cookies
export const getCurrent = createAsyncThunk('user/getCurrent', async () => {
  const res = await axios.get('/users/current');
  return res.data.user;
});

interface SigUpInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const signUp = createAsyncThunk('user/signup', async (input: SigUpInput) => {
  const res = await axios.post('/auth/signup', input);
  console.log(res);
  return res.data;
})

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

export const logout = createAsyncThunk('user/logout', async () => {
  const res = await axios.get('/auth/logout');
  return res.data;
});

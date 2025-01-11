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

export const signUp = createAsyncThunk(
  'user/signup',
  async (input: SigUpInput) => {
    const res = await axios.post('/auth/signup', input);
    return res.data;
  },
);

interface LoginInput {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'user/login',
  async (input: LoginInput) => {
    const res = await axios.post('/auth/login', input);
    console.log(res);
    return res.data.user;
  },
);

export const logout = createAsyncThunk('user/logout', async () => {
  const res = await axios.get('/auth/logout');
  return res.data;
});

// Follow
export const followUser = createAsyncThunk(
  'user/followUser',
  async (id: string) => {
    const res = await axios.post(`/users/follow/${id}`, id);
    return res.data.user;
  },
);

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async (id: string) => {
    const res = await axios.post(`/users/unfollow/${id}`, id);
    return res.data.user;
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { followingsUpdated } from './userSlice.ts';
import { followersCountUpdated } from '../userPage/userPageSlice.ts';

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
  async (id: string, { dispatch }) => {
    const res = await axios.post(`/users/follow/${id}`, id);
    console.log(res.data.data);
    dispatch(followingsUpdated(res.data.data.followings));
    dispatch(followersCountUpdated(res.data.data.candidateFollowersCount));
  },
);

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async (id: string, { dispatch }) => {
    const res = await axios.post(`/users/unfollow/${id}`, id);
    console.log(res.data.data);
    dispatch(followingsUpdated(res.data.data.followings));
    dispatch(followersCountUpdated(res.data.data.candidateFollowersCount));
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios';
import { followingsUpdated } from './userSlice.ts';
import { followersCountUpdated } from '../userPage/userPageSlice.ts';
import { listenersCountUpdated } from '../artist/artistSlice.ts';
import { setLibraryItems } from '../library/librarySlice.ts';
import { User } from './userTypes.ts';
import { RejectValue } from '../../axios/axiosTypes.ts';
import handleAxiosError from '../../axios/handleAxiosError.ts';
import toast from 'react-hot-toast';

// Checks whether the user is authenticated using cookies
export const getCurrent = createAsyncThunk(
  'user/getCurrent',
  async (_, { dispatch }) => {
    const res = await axios.get('/users/current');
    dispatch(setLibraryItems(res.data.user.library.items));
    return res.data.user;
  },
);

interface SigUpInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const signUp = createAsyncThunk<
  User,
  SigUpInput,
  { rejectValue: RejectValue }
>('user/signUp', async (input, { rejectWithValue }) => {
  try {
    const res = await axios.post('/auth/signup', input);
    toast.success('Your account is created!');
    return res.data;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: RejectValue }
>('user/login', async (input, { dispatch, rejectWithValue }) => {
  try {
    const res = await axios.post('/auth/login', input);
    dispatch(setLibraryItems(res.data.user.library.items));
    toast.success('Welcome back!');

    return res.data.user;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  const res = await axios.get('/auth/logout');
  return res.data;
});

// Follow
export const followUser = createAsyncThunk(
  'user/followUser',
  async ({ id, type }: { id: string; type: string }, { dispatch }) => {
    const res = await axios.post(`/users/follow/${id}`, id);

    dispatch(followingsUpdated(res.data.data.followings));

    if (type === 'user')
      dispatch(followersCountUpdated(res.data.data.candidateFollowersCount));
    if (type === 'artist') {
      dispatch(listenersCountUpdated(res.data.data.candidateFollowersCount));
      dispatch(setLibraryItems(res.data.data.library.items));
    }
  },
);

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async ({ id, type }: { id: string; type: string }, { dispatch }) => {
    const res = await axios.post(`/users/unfollow/${id}`, id);

    dispatch(followingsUpdated(res.data.data.followings));
    if (type === 'user')
      dispatch(followersCountUpdated(res.data.data.candidateFollowersCount));
    if (type === 'artist') {
      dispatch(listenersCountUpdated(res.data.data.candidateFollowersCount));
      dispatch(setLibraryItems(res.data.data.library.items));
    }
  },
);

// Like
export const likeSong = createAsyncThunk(
  'user/likeSong',
  async ({ id }: { id: string }) => {
    const res = await axios.post(`/songs/${id}/like`);
    return res.data.likedSongs;
  },
);

export const dislikeSong = createAsyncThunk(
  'user/dislikeSong',
  async ({ id }: { id: string }) => {
    const res = await axios.post(`/songs/${id}/dislike`);
    return res.data.likedSongs;
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { followingsUpdated } from './userSlice.ts';
import { followersCountUpdated } from '../userPage/userPageSlice.ts';
import { listenersCountUpdated } from '../artist/artistSlice.ts';
import { setLibraryItems } from '../library/librarySlice.ts';

// Checks whether the user is authenticated using cookies
export const getCurrent = createAsyncThunk(
  'user/getCurrent',
  async (_, { dispatch }) => {
    const res = await axios.get('/users/current');

    dispatch(setLibraryItems(res.data.user.library.items));
    return res.data.user;
  }
);

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
  }
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
  }
);

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
    if (type === 'artist')
      dispatch(listenersCountUpdated(res.data.data.candidateFollowersCount));
  }
);

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async ({ id, type }: { id: string; type: string }, { dispatch }) => {
    const res = await axios.post(`/users/unfollow/${id}`, id);

    dispatch(followingsUpdated(res.data.data.followings));
    if (type === 'user')
      dispatch(followersCountUpdated(res.data.data.candidateFollowersCount));
    if (type === 'artist')
      dispatch(listenersCountUpdated(res.data.data.candidateFollowersCount));
  }
);

// Like
export const likeSong = createAsyncThunk(
  'user/likeSong',
  async ({ id }: { id: string }) => {
    const res = await axios.post(`/songs/${id}/like`);
    return res.data.likedSongs;
  }
);

export const dislikeSong = createAsyncThunk(
  'user/dislikeSong',
  async ({ id }: { id: string }) => {
    const res = await axios.post(`/songs/${id}/dislike`);
    return res.data.likedSongs;
  }
);

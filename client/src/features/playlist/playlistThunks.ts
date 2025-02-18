import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios';
import { setLibraryItems } from '../library/librarySlice.ts';
import { likedPlaylistsUpdated, playlistsUpdated } from '../user/userSlice.ts';
import toast from 'react-hot-toast';
import { RejectValue } from '../../axios/axiosTypes.ts';
import handleAxiosError from '../../axios/handleAxiosError.ts';
import { Playlist } from './playlistTypes.ts';

export const getPlaylist = createAsyncThunk<
  Playlist,
  string,
  { rejectValue: RejectValue }
>('playlist/getPlaylist', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/playlists/${id}`);
    return res.data.playlist;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

export const createPlaylist = createAsyncThunk<
  any,
  any,
  { rejectValue: RejectValue }
>('playlist/createPlaylist', async (_, { dispatch, rejectWithValue }) => {
  try {
    const res = await axios.post(`/playlists/`);
    dispatch(setLibraryItems(res.data.library.items));
    dispatch(playlistsUpdated(res.data.playlists));
    toast.success('New playlist is created');
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

export const editPlaylist = createAsyncThunk<
  Playlist,
  { id: string; formData: FormData },
  { rejectValue: RejectValue }
>('playlist/editPlaylist', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const res = await axios.patch(`/playlists/${id}`, formData);
    console.log(res);
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

export const deletePlaylist = createAsyncThunk(
  'playlist/deletePlaylist',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      const res = await axios.delete(`/playlists/${id}`);

      dispatch(setLibraryItems(res.data.library.items));
      dispatch(playlistsUpdated(res.data.playlists));

      toast.success('Playlist deleted successfully');
    } catch (e) {
      console.log(e);
    }
  },
);

// Additional
export const savePlaylist = createAsyncThunk(
  'playlist/savePlaylist',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      const res = await axios.post(`/playlists/save/${id}`);
      dispatch(setLibraryItems(res.data.library.items));
      dispatch(likedPlaylistsUpdated(res.data.likedPlaylists));
      toast.success('Playlist saved to your library');
    } catch (e) {
      console.log('savePlaylist thunk', e);
    }
  },
);

export const removePlaylist = createAsyncThunk(
  'playlist/removePlaylist',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      const res = await axios.delete(`/playlists/remove/${id}`);
      dispatch(setLibraryItems(res.data.library.items));
      dispatch(likedPlaylistsUpdated(res.data.likedPlaylists));
      toast.success('Playlist removed from your library');
    } catch (e) {
      console.log('removePlaylist thunk', e);
    }
  },
);

export const saveSongToPlaylist = createAsyncThunk(
  'playlist/saveSong',
  async ({
    songId,
    playlistId,
    playlistName,
  }: {
    songId: string;
    playlistId: string;
    playlistName: string;
  }) => {
    try {
      await axios.post(`/songs/${songId}/save/${playlistId}`);
      toast.success(`Song saved to playlist: ${playlistName}`);
    } catch (err) {
      // Do nothing if error
    }
  },
);

export const removeSongFromPlaylist = createAsyncThunk<
  string,
  { songId: string; playlistId: string },
  { rejectValue: RejectValue }
>(
  'playlist/removeSong',
  async ({ songId, playlistId }, { rejectWithValue }) => {
    try {
      await axios.delete(`/songs/${songId}/remove/${playlistId}`);
      toast.success(`Song removed from your playlist`);
      return songId;
    } catch (e) {
      return rejectWithValue(handleAxiosError(e));
    }
  },
);

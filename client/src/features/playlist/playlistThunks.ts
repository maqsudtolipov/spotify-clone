import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { setLibraryItems } from '../library/librarySlice.ts';
import { likedPlaylistsUpdated, playlistsUpdated } from '../auth/userSlice.ts';
import toast from 'react-hot-toast';

// Main
export const getPlaylist = createAsyncThunk(
  'playlist/getPlaylist',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/playlists/${id}`);
      return res.data.playlist;
    } catch (err) {
      err.response.data.statusCode = err.response.status;
      return rejectWithValue(err.response.data);
    }
  },
);

export const createPlaylist = createAsyncThunk(
  'playlist/createPlaylist',
  async (_, { dispatch }) => {
    const res = await axios.post(`/playlists/`);

    dispatch(setLibraryItems(res.data.library.items));
    dispatch(playlistsUpdated(res.data.playlists));

    toast.success('New playlist is created');
  },
);

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

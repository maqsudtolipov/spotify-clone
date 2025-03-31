import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios';
import { addItemToLibrary, removePlaylistFromLibrary, updateLibraryPlaylist } from '../library/librarySlice.ts';
import {
  addItemToPlaylists,
  addToLikedPlaylists,
  removeFromLikedPlaylists,
  removeItemFromPlaylists,
  updateItemUserPlaylists
} from '../user/userSlice.ts';
import toast from 'react-hot-toast';
import { RejectValue } from '../../axios/axiosTypes.ts';
import handleAxiosError from '../../axios/handleAxiosError.ts';
import { Playlist } from './playlistTypes.ts';
import { removeSongFromPlaylist } from './playlistSlice.ts';

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

    dispatch(addItemToLibrary(res.data.playlist));
    dispatch(
      addItemToPlaylists({
        _id: res.data.playlist.id,
        name: res.data.playlist.name,
      }),
    );

    toast.success('New playlist is created');
  } catch (e) {
    return rejectWithValue(handleAxiosError(e));
  }
});

export const editPlaylist = createAsyncThunk<
  Playlist,
  { id: string; formData: FormData },
  { rejectValue: RejectValue }
>(
  'playlist/editPlaylist',
  async ({ id, formData }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.patch(`/playlists/${id}`, formData);
      const playlist = await res.data.playlist;

      dispatch(
        updateLibraryPlaylist({
          id: playlist.id,
          name: playlist.name,
          user: playlist.user.name,
          img: playlist.img.url,
          isPinned: false,
          itemType: 'playlist',
          createdAt: playlist.createdAt,
        }),
      );
      dispatch(
        updateItemUserPlaylists({
          _id: playlist._id,
          name: playlist.name,
        }),
      );

      toast.success('Playlist is updated');
      return res.data.playlist;
    } catch (e) {
      return rejectWithValue(handleAxiosError(e));
    }
  },
);

export const deletePlaylist = createAsyncThunk(
  'playlist/deletePlaylist',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      await axios.delete(`/playlists/${id}`);

      dispatch(removePlaylistFromLibrary(id));
      dispatch(removeItemFromPlaylists(id));

      toast.success('Playlist deleted successfully');
    } catch (e) {
      console.log(e);
    }
  },
);

export const savePlaylist = createAsyncThunk(
  'playlist/savePlaylist',
  async ({ playlist }: { playlist: any }, { dispatch }) => {
    try {
      dispatch(addItemToLibrary(playlist));
      dispatch(addToLikedPlaylists(playlist.id));
      toast.success('Playlist saved to your library');

      await axios.post(`/playlists/save/${playlist.id}`);
    } catch (e) {
      console.log('savePlaylist thunk', e);
    }
  },
);

export const removePlaylist = createAsyncThunk(
  'playlist/removePlaylist',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      dispatch(removePlaylistFromLibrary(id));
      dispatch(removeFromLikedPlaylists(id));
      toast.success('Playlist removed from your library');

      await axios.delete(`/playlists/remove/${id}`);
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

export const removeSongFromPlaylistThunk = createAsyncThunk<
  void,
  {
    song: {
      id: string;
      duration: number;
    };
    playlistId: string;
  },
  { rejectValue: RejectValue }
>(
  'playlist/removeSong',
  async ({ song, playlistId }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(removeSongFromPlaylist(song));
      toast.success(`Song removed from your playlist`);

      await axios.delete(`/songs/${song.id}/remove/${playlistId}`);
    } catch (e) {
      return rejectWithValue(handleAxiosError(e));
    }
  },
);

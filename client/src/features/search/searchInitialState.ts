import { SearchState } from './searchTypes';

export const initialState: SearchState = {
  tab: 'all',
  query: '',
  mainSearch: {
    songs: [],
    playlists: [],
    artists: [],
    users: [],
    lastQuery: '',
  },
  songs: {
    items: [],
    lastQuery: '',
    pagination: {
      currentPage: 1,
      totalPages: 0,
      limit: 0,
      totalCount: 0,
    },
    apiStatus: 'idle',
  },
  playlists: {
    items: [],
    lastQuery: '',
    pagination: {
      currentPage: 1,
      totalPages: 0,
      limit: 0,
      totalCount: 0,
    },
  },
  artists: {
    items: [],
    lastQuery: '',
    pagination: {
      currentPage: 1,
      totalPages: 0,
      limit: 0,
      totalCount: 0,
    },
  },
  users: {
    items: [],
    lastQuery: '',
    pagination: {
      currentPage: 1,
      totalPages: 0,
      limit: 0,
      totalCount: 0,
    },
  },
};

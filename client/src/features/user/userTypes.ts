export interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  img: string;
  followers: string[];
  followersCount: number;
  followings: string[];
  followingsCount: number;
  likedSongs: {
    id: string;
    songs: string[];
  };
}

export interface InitialState {
  data: User | null;
  isAuth: boolean;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
  api: {
    getCurrent: ApiStatus;
    signUp: ApiStatus;
    login: ApiStatus;
    logout: ApiStatus;
  };
}

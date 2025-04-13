export interface ApiStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string;
  statusCode?: number;
}

export interface UserPage {
  id: string;
  img: {
    id: string;
    url: string;
  };
  name: string;
  followersCount: number;
  followingsCount: number;
  followers: string[];
  followings: string[];
}

export interface InitialState {
  data: null | UserPage;
  api: {
    getUser: ApiStatus;
  };
}

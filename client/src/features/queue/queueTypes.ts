export interface Song {
  _id: string;
  id: string;
  img: string;
  name: string;
  artist: string;
  song: {
    url: string;
  };
}

export interface Queue {
  current: number;
  isShuffled: boolean;
  items: Song[];
  originalItems: Song[];
}

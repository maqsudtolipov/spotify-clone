export interface Song {
  id: string;
  img: string;
  name: string;
  artist: string;
}

export interface Queue {
  current: number;
  items: Song[];
}

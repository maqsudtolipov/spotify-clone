import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Heading2 from '../../../ui/Typography/Heading2.tsx';
import SortedTable from '../../../ui/Table/custom/SortedTable/SortedTable.tsx';
import CardsList from '../../../ui/CardsList/CardsList.tsx';

interface CardItem {
  img: string;
  name: string;
  description: string;
  type: string;
}

interface Item {
  img: string;
  name: string;
  artist: string;
  plays: number;
  isLiked: boolean;
}

const SearchAll = () => {
  const [songs, setSongs] = useState<Item[]>();
  const [artists, setArtists] = useState<CardItem[]>();
  const [playlists, setPlaylists] = useState<CardItem[]>([]);
  const [profiles, setProfiles] = useState<CardItem[]>();

  // Songs
  useEffect(() => {
    const fetchedItems = Array.from({ length: 4 }, () => ({
      img: faker.image.url({ height: 160, width: 160 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      artist: faker.person.fullName(),
      plays: faker.number.int(999),
      isLiked: faker.datatype.boolean(),
    }));

    setSongs(fetchedItems);
  }, []);

  // Artists
  useEffect(() => {
    const fetchedItems = Array.from({ length: 6 }, () => ({
      img: faker.image.url({ height: 160, width: 160 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      description: `${faker.word.adjective()} ${faker.word.noun()}`,
      type: 'artist',
    }));

    setArtists(fetchedItems);
  }, []);

  // Playlist
  useEffect(() => {
    const fetchedItems = Array.from({ length: 6 }, () => ({
      img: faker.image.url({ height: 160, width: 160 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      description: `${faker.word.adjective()} ${faker.word.noun()}`,
      type: 'playlist',
    }));

    setPlaylists(fetchedItems);
  }, []);

  // Profiles
  useEffect(() => {
    const fetchedItems = Array.from({ length: 6 }, () => ({
      img: faker.image.url({ height: 160, width: 160 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      description: `${faker.word.adjective()} ${faker.word.noun()}`,
      type: 'artist',
    }));

    setProfiles(fetchedItems);
  }, []);

  return (
    <div>
      {songs && (
        <div className="mb-10">
          <Heading2>Songs</Heading2>
          <SortedTable items={songs} />
        </div>
      )}

      {artists && (
        <div className="mb-10">
          <CardsList title="Artists" shrink={true} items={artists} />
        </div>
      )}

      {playlists && (
        <div className="mb-10">
          <CardsList title="Playlists" shrink={true} items={playlists} />
        </div>
      )}

      {profiles && (
        <div className="mb-10">
          <CardsList title="Profiles" shrink={true} items={profiles} />
        </div>
      )}
    </div>
  );
};

export default SearchAll;

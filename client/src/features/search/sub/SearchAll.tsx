import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Heading2 from '../../../ui-library/Typography/Heading2.tsx';
import SortedTable from '../../../ui-library/Table/SortedTable.tsx';
import Card from '../../../ui-library/Card/Card.tsx';

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
          <Heading2>Artists</Heading2>
          <ul className="grid grid-cols-6">
            {artists.map((el) => (
              <Card key={el.name} data={el} />
            ))}
          </ul>
        </div>
      )}

      {playlists && (
        <div className="mb-10">
          <Heading2>Playlists</Heading2>
          <ul className="grid grid-cols-6">
            {playlists.map((el) => (
              <Card key={el.name} data={el} />
            ))}
          </ul>
        </div>
      )}

      {profiles && (
        <div className="mb-10">
          <Heading2>Profiles</Heading2>
          <ul className="grid grid-cols-6">
            {profiles.map((el) => (
              <Card key={el.name} data={el} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchAll;

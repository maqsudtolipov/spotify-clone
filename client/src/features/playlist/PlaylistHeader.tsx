import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import ImageHeader from '../../components/ImageHeader/ImageHeader.tsx';

interface Data {
  type: 'playlist' | 'userPage';
  img: string;
  name: string;
  description?: string;
  user?: {
    img: string;
    name: string;
  };
  statistics?: { name: string; value: number }[];
}

interface ArtistHeaderProps {
  color: string;
}

const PlaylistHeader = ({ color }: ArtistHeaderProps) => {
  const [playlist, setPlaylist] = useState<Data>();

  useEffect(() => {
    let data: Data = {
      type: 'playlist',
      img: faker.image.urlLoremFlickr({
        height: 240,
        width: 240,
        category: 'nature',
      }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      description: faker.lorem.lines(2),
      user: {
        name: faker.lorem.words(2),
        img: faker.image.urlLoremFlickr({
          height: 24,
          width: 24,
          category: 'cat',
        }),
      },
      statistics: [
        { name: 'saves', value: faker.number.int({ min: 20, max: 100 }) },
        { name: 'songs', value: faker.number.int({ min: 20, max: 100 }) },
      ],
    };

    setPlaylist(data);
  }, []);

  return playlist && <ImageHeader color={color} data={playlist} />;
};

export default PlaylistHeader;

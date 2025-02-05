import { useEffect } from 'react';
import { faker } from '@faker-js/faker';
import ImageHeader from '../../../components/ImageHeader/ImageHeader.tsx';
import { Playlist } from '../playlistSlice.ts';

const PlaylistHeader = ({ data }: Playlist) => {
  useEffect(() => {
    let data: Data = {
      type: 'playlist',
      img: faker.image.urlLoremFlickr({
        height: 240,
        width: 240,
        category: 'nature'
      }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      description: faker.lorem.lines(2),
      user: {
        name: faker.lorem.words(2),
        img: faker.image.urlLoremFlickr({
          height: 24,
          width: 24,
          category: 'cat'
        })
      },
      statistics: [
        { name: 'saves', value: faker.number.int({ min: 20, max: 100 }) },
        { name: 'songs', value: faker.number.int({ min: 20, max: 100 }) }
      ]
    };
  }, []);

  return data && <ImageHeader data={data} type="playlist" />;
};

export default PlaylistHeader;

import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import ImageHeader from '../../components/ImageHeader/ImageHeader.tsx';

interface Data {
  type: 'playlist' | 'user';
  img: string;
  name: string;
  statistics?: { name: string; value: number }[];
}

const UserHeader = () => {
  const [data, setData] = useState<Data>();

  const color =
    '#' +
    ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0') +
    '4d';

  useEffect(() => {
    const data: Data = {
      type: 'user',
      img: faker.image.urlLoremFlickr({
        height: 240,
        width: 240,
        category: 'nature',
      }),
      name: faker.person.fullName(),
      statistics: [
        { name: 'followers', value: faker.number.int(30) },
        { name: 'followings', value: faker.number.int(30) },
      ],
    };

    setData(data);
  }, []);

  return data && <ImageHeader color={color} data={data} />;
};

export default UserHeader;

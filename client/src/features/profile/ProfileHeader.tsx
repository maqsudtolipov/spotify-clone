import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import ImageHeader from '../../components/ImageHeader/ImageHeader.tsx';
import { useAppSelector } from '../../app/hooks.ts';

interface Data {
  type: 'playlist' | 'profile';
  img: string;
  name: string;
  statistics?: { name: string; value: number }[];
}

interface ProfileHeaderProps {
  color: string;
}

const ProfileHeader = ({ color }: ProfileHeaderProps) => {
  const [data, setData] = useState<Data>();
  const {img, name} = useAppSelector(state => state.user.data);

  useEffect(() => {
    const data: Data = {
      img,
      name,
      type: 'profile',
      statistics: [
        { name: 'followers', value: faker.number.int(30) },
        { name: 'followings', value: faker.number.int(30) },
      ],
    };
    setData(data);
  }, []);

  return data && <ImageHeader color={color} data={data} />;
};

export default ProfileHeader;

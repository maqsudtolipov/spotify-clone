import ProfileHeader from './ProfileHeader.tsx';
import GradientBackground from '../../components/GradientBackground/GradientBackground.tsx';
import PlayHeader from '../../components/PlayHeader/PlayHeader.tsx';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import CardsList from '../../components/CardsList/CardsList.tsx';

interface CardItem {
  img: string;
  name: string;
  description: string;
  type: string;
}

const ProfilePage = () => {
  const [items, setItems] = useState<CardItem[]>([]);

  const color =
    '#' +
    ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0') +
    '4d';

  useEffect(() => {
    const fetchedItems = Array.from({ length: 18 }, () => ({
      img: faker.image.url({ height: 160, width: 160 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      description: `${faker.word.adjective()} ${faker.word.noun()}`,
      type: faker.datatype.boolean() ? 'artist' : 'playlist',
    }));

    setItems(fetchedItems);
  }, []);

  return (
    <div>
      <ProfileHeader color={color} />
      <GradientBackground color={color}>
        <PlayHeader />

        <div className="p-5 pt-0">
          <CardsList
            title="Public Playlists"
            shrink={true}
            items={items.slice(0, 6)}
          />
          <CardsList
            title="Followers"
            shrink={true}
            items={items.slice(6, 12)}
          />
          <CardsList
            title="Followings"
            shrink={true}
            items={items.slice(12, 18)}
          />
        </div>
      </GradientBackground>
    </div>
  );
};

export default ProfilePage;

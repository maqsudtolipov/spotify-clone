import ProfileHeader from '../features/profile/ProfileHeader.tsx';
import GradientBackground from '../components/GradientBackground/GradientBackground.tsx';
import PlayHeader from '../components/PlayHeader/PlayHeader.tsx';
import styles from './HomePage.module.scss';
import Card from '../ui-library/Card/Card.tsx';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

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
          <h2 className={styles.heading2}>Public Playlists</h2>
          <ul className="grid grid-cols-6">
            {items &&
              items.slice(6, 12).map((el) => <Card key={el.name} data={el} />)}
          </ul>

          <h2 className={styles.heading2}>Followers</h2>
          <ul className="grid grid-cols-6">
            {items &&
              items.slice(6, 12).map((el) => <Card key={el.name} data={el} />)}
          </ul>

          <h2 className={styles.heading2}>Followings</h2>
          <ul className="grid grid-cols-6">
            {items &&
              items.slice(6, 12).map((el) => <Card key={el.name} data={el} />)}
          </ul>
        </div>
      </GradientBackground>
    </div>
  );
};

export default ProfilePage;

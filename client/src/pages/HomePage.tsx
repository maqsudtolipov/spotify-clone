import styles from './HomePage.module.scss';
import History from '../features/history/History.tsx';
import { useEffect, useState } from 'react';
import Card from '../ui-library/Card/Card.tsx';
import { faker } from '@faker-js/faker';
import GradientBackground from '../components/GradientBackground/GradientBackground.tsx';

interface CardItem {
  img: string;
  name: string;
  description: string;
  type: string;
}

const HomePage = () => {
  const [gradientColor, setGradientColor] = useState<string>(
    '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
  );
  const [items, setItems] = useState<CardItem[]>([]);

  const handleNewColor = () => {
    const randomHexColor =
      '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
    setGradientColor(randomHexColor);
  };

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
    <GradientBackground className={styles.home} color={gradientColor}>
      <History handleNewColor={handleNewColor} />

      <h2 className={styles.heading2}>Most Popular</h2>
      <ul className="grid grid-cols-6">
        {items &&
          items.slice(0, 6).map((el) => <Card key={el.name} data={el} />)}
      </ul>

      <h2 className={styles.heading2}>New Releases</h2>
      <ul className="grid grid-cols-6">
        {items &&
          items.slice(6, 12).map((el) => <Card key={el.name} data={el} />)}
      </ul>

      <h2 className={styles.heading2}>Your Favourite Artists</h2>
      <ul className="grid grid-cols-6">
        {items &&
          items.slice(12, 18).map((el) => <Card key={el.name} data={el} />)}
      </ul>
    </GradientBackground>
  );
};

export default HomePage;
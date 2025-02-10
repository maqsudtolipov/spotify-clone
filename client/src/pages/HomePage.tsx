import styles from './HomePage.module.scss';
import History from '../features/history/History.tsx';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import GradientBackground from '../ui/GradientBackground/GradientBackground.tsx';
import CardsList from '../ui/CardsList/CardsList.tsx';

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

      <CardsList title="Most Popular" shrink={true} items={items.slice(0, 6)} />
      <CardsList title="New Releases" shrink={true} items={items.slice(0, 6)} />
      <CardsList
        title="Your Favourite Artists"
        shrink={true}
        items={items.slice(12, 18)}
      />
    </GradientBackground>
  );
};

export default HomePage;

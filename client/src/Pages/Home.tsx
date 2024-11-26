import styles from './Home.module.scss';
import History from '../features/history/History.tsx';
import { useEffect, useState } from 'react';
import Card from '../ui-library/Card/Card.tsx';
import { faker } from '@faker-js/faker';

interface CardItem {
  img: string;
  name: string;
  description: string;
  type: string;
}

const Home = () => {
  const [gradientColor, setGradientColor] = useState<string>();
  const [newReleases, setNewReleases] = useState<CardItem[]>([]);

  const handleNewColor = () => {
    const randomHexColor =
      '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
    setGradientColor(randomHexColor);
  };

  useEffect(() => {
    const fetchedItems = Array.from({ length: 6 }, () => ({
      img: faker.image.url({ height: 160, width: 160 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      description: `${faker.word.adjective()} ${faker.word.noun()}`,
      type: faker.datatype.boolean() ? 'artist' : 'playlist',
    }));

    setNewReleases(fetchedItems);
  }, []);

  return (
    <div
      className={styles.home}
      style={{
        backgroundImage: `linear-gradient(rgba(23, 23, 23, 0.6), rgb(23, 23, 23) 40vh),
        linear-gradient(
        ${gradientColor},
        ${gradientColor} 40vh,
        transparent 40vh,
        transparent 100%
    )`,
      }}
    >
      <History handleNewColor={handleNewColor} />

      <h2 className={styles.heading2}>New Releases</h2>
      <ul className="grid grid-cols-6">
        {newReleases &&
          newReleases.map((el) => <Card key={el.name} data={el} />)}
      </ul>
    </div>
  );
};

export default Home;

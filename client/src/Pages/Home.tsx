import styles from './Home.module.scss';
import History from '../features/history/History.tsx';
import { useState } from 'react';

const Home = () => {
  const [gradientColor, setGradientColor] = useState<string>();

  const handleNewColor = () => {
    const randomHexColor =
      '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
    setGradientColor(randomHexColor);
  };

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
    </div>
  );
};

export default Home;

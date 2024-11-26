import styles from './HistoryList.module.scss';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import HistoryCard from './HistoryCard/HistoryCard.tsx';

interface HistoryItem {
  img: string;
  name: string;
  type: ('artist' | 'playlist' | 'song')[];
}

interface HistoryListProps {
  handleNewColor: () => void;
}

const HistoryList = ({ handleNewColor }: HistoryListProps) => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>();

  // Fetch history cards
  useEffect(() => {
    const fetchedItems = Array.from({ length: 8 }, () => ({
      img: faker.image.url({ height: 120, width: 120 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      type: faker.helpers.arrayElements(['artist', 'playlist', 'song']),
    }));

    setHistoryItems(fetchedItems);
  }, []);

  return (
    <div className={styles.historyList} onMouseEnter={handleNewColor}>
      {historyItems &&
        historyItems.map((el) => (
          <HistoryCard data={el} handleNewColor={handleNewColor} />
        ))}
    </div>
  );
};

export default HistoryList;

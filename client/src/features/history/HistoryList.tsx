import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import HistoryCard from './HistoryCard.tsx';

interface HistoryItem {
  img: string;
  name: string;
  type: ('artist' | 'playlist' | 'song')[];
}

const HistoryList = () => {
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
    <div>
      {historyItems && historyItems.map((el) => <HistoryCard data={el} />)}
    </div>
  );
};

export default HistoryList;

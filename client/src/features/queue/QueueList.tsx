import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import QueueCard from './QueueCard.tsx';

interface LibraryCardData {
  img: string;
  name: string;
  artist: string;
}

const QueueList = () => {
  const [items, setItems] = useState<LibraryCardData[]>();

  useEffect(() => {
    const fetchedItems = Array.from({ length: 200 }, () => ({
      img: faker.image.url({ height: 120, width: 120 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      artist: faker.person.fullName(),
    }));

    setItems(fetchedItems);
  }, []);

  return (
    <ul className="p-4 pr-5">
      {items && items.map((item) => <QueueCard key={item.name} data={item} />)}
    </ul>
  );
};

export default QueueList;

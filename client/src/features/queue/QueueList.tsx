import { useEffect, useRef, useState } from 'react';
import { faker } from '@faker-js/faker';
import QueueCard from './QueueCard.tsx';

interface LibraryCardData {
  id: string;
  img: string;
  name: string;
  artist: string;
}

const QueueList = () => {
  const [items, setItems] = useState<LibraryCardData[]>();
  const [dragOverId, setDragOverId] = useState<string>('');

  useEffect(() => {
    const fetchedItems = Array.from({ length: 200 }, () => ({
      id: faker.database.mongodbObjectId(),
      img: faker.image.url({ height: 120, width: 120 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      artist: faker.person.fullName(),
    }));

    setItems(fetchedItems);
  }, []);

  const handleSort = (id: string) => {
    if (items) {
      const selectedItem = items.find((item) => item.id === id);
      const newPlace = items.findIndex((item) => item.id === dragOverId);
      const itemsClone = items.filter((item) => item.id !== id);

      if (selectedItem) itemsClone.splice(newPlace, 0, selectedItem);

      setItems(itemsClone);
      setDragOverId('');
    }
  };

  return (
    <ul className="p-4 pr-5">
      {items &&
        items.map((item) => (
          <QueueCard
            key={item.name}
            data={item}
            isActive={dragOverId === item.id}
            draggable
            onDragEnter={() => setDragOverId(item.id)}
            onDragEnd={() => handleSort(item.id)}
            onDragOver={(e: DragEvent) => {
              e.preventDefault();
              return false;
            }}
          />
        ))}
    </ul>
  );
};

export default QueueList;

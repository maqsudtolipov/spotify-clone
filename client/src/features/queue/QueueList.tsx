import styles from './Queue.module.scss';
import React, { useEffect, useRef, useState } from 'react';
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

  const [showShadow, setShowShadow] = useState(false);
  const ref = useRef(null);

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

  useEffect(() => {
    const listEl = ref.current;

    const eventListener = () => {
      if (listEl.scrollTop >= 5) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };

    listEl.addEventListener('scroll', eventListener);
    return () => {
      listEl.removeEventListener('scroll', eventListener);
    };
  }, []);

  return (
    <div className="h-full relative">
      <div className={showShadow ? styles.shadow : ''}></div>
      <ul ref={ref} className={styles.queueList}>
        {items &&
          items.map((item) => (
            <QueueCard
              key={item.name}
              data={item}
              isActive={dragOverId === item.id}
              draggable={true}
              onDragEnter={() => setDragOverId(item.id)}
              onDragOver={(e: React.DragEvent) => {
                e.preventDefault();
                return false;
              }}
              onDragEnd={() => handleSort(item.id)}
            />
          ))}
      </ul>
    </div>
  );
};

export default QueueList;

import styles from './QueueList.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import QueueCard from '../card/QueueCard.tsx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { setItems } from '../../queueSlice.ts';

interface LibraryCardData {
  id: string;
  img: string;
  name: string;
  artist: string;
}

const QueueList = () => {
  const items = useAppSelector((state) => state.queue.items);
  const dispatch = useAppDispatch();

  const [dragOverId, setDragOverId] = useState<string>('');
  const [showShadow, setShowShadow] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  const handleSort = (id: string) => {
    if (items) {
      const selectedItem = items.find((item) => item.id === id);
      const newPlace = items.findIndex((item) => item.id === dragOverId);
      const itemsClone = items.filter((item) => item.id !== id);

      if (selectedItem) itemsClone.splice(newPlace, 0, selectedItem);

      dispatch(setItems(itemsClone));
      setDragOverId('');
    }
  };

  useEffect(() => {
    const listEl = ref.current;

    if (listEl) {
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
    }
  }, []);

  return (
    <div className="h-full overflow-y-scroll">
      <div className={showShadow ? styles.shadow : ''}></div>
      <ul ref={ref} className={styles.queueList}>
        {items.length ? (
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
          ))
        ) : (
          <p className='py-2 text-neutral-400 text-center'>There are no songs in the queue.</p>
        )}
      </ul>
    </div>
  );
};

export default QueueList;

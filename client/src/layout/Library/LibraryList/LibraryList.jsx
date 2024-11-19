import styles from './LibraryList.module.scss';
import { useEffect, useRef, useState } from 'react';
import LibraryCard from './LibraryCard/LibraryCard.tsx';
import useLibrarySort from '../../../hooks/useLibrarySort.tsx';

const LibraryList = () => {
  const { items } = useLibrarySort();
  const [showShadow, setShowShadow] = useState(false);
  const ref = useRef(null);

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
    <div className={styles.list}>
      <div className={showShadow ? styles.shadow : ''}></div>
      <div ref={ref} className="h-full p-2 overflow-y-scroll">
        {items?.map((el) => (
          <LibraryCard key={el.name} data={el} />
        ))}
      </div>
    </div>
  );
};

export default LibraryList;

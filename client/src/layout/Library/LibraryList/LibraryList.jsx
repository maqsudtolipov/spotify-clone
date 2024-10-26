import styles from './LibraryList.module.scss';
import { useEffect, useRef, useState } from 'react';

const Placeholder = () => {
  return <div className="size-16 bg-green-600 rounded mb-2"></div>;
};

const LibraryList = () => {
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
      <div ref={ref} className="h-full overflow-y-scroll">
        {[
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2,
          3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        ].map((el) => (
          <Placeholder key={el}>test</Placeholder>
        ))}
      </div>
    </div>
  );
};

export default LibraryList;

import styles from './LibraryList.module.scss';
import LibraryCard from './LibraryCard/LibraryCard.tsx';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks.ts';

const LibraryList = ({ isCollapsed }) => {
  const { items } = useAppSelector((state) => state.library);
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
    <div
      className={`${styles.listContainer} ${isCollapsed ? styles.listContainerCollapsed : ''}`}
    >
      <div
        ref={ref}
        className={`${styles.list} ${isCollapsed ? styles.listCollapsed : ''}`}
      >
        <div className={showShadow ? styles.shadow : ''}></div>
        {items?.map((el) => (
          <LibraryCard data={el} isCollapsed={isCollapsed} />
        ))}
      </div>
    </div>
  );
};

export default LibraryList;

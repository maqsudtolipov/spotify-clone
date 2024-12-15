import styles from './LibraryList.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { setLibraryItems } from '../librarySlice.ts';
import { faker } from '@faker-js/faker';
import LibraryCard from './LibraryCard/LibraryCard.tsx';

const LibraryList = ({ isCollapsed }) => {
  const { items } = useAppSelector((state) => state.library);
  const dispatch = useAppDispatch();

  const [showShadow, setShowShadow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fetchedItems = Array.from({ length: 200 }, () => ({
      img: faker.image.url({ height: 120, width: 120 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      type: faker.datatype.boolean() ? 'artist' : 'playlist',
      isPinned: faker.number.int(20) <= 1,
      createdAt: faker.date
        .between({ from: '2020-01-01', to: Date.now() })
        .toUTCString(),
    }));

    dispatch(setLibraryItems(fetchedItems));
  }, [dispatch]);

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
          <LibraryCard key={el.name} data={el} isCollapsed={isCollapsed} />
        ))}
      </div>
    </div>
  );
};

export default LibraryList;

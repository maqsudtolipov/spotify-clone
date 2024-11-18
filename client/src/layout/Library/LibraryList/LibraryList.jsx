import styles from './LibraryList.module.scss';
import { faker } from '@faker-js/faker';
import { useEffect, useRef, useState } from 'react';
import LibraryCard from './LibraryCard/LibraryCard.tsx';

const LibraryList = () => {
  const [fakeList, setFakeList] = useState([]);
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

  useEffect(() => {
    const arr = [];

    for (let i = 0; i < 20; i++) {
      const img = faker.image.url({
        category: 'nature',
        height: 120,
        width: 120,
      });
      const name = `${faker.word.adjective()} ${faker.word.noun()}`;
      const type = faker.datatype.boolean() ? 'artist' : 'playlist';
      const isPinned = faker.number.int(20) <= 1;

      arr.push({ img, name, isPinned, type });
    }

    arr.sort((a, b) => b.isPinned - a.isPinned);

    setFakeList(arr);
  }, []);

  return (
    <div className={styles.list}>
      <div className={showShadow ? styles.shadow : ''}></div>
      <div ref={ref} className="h-full p-2 overflow-y-scroll">
        {fakeList.map((el) => (
          <LibraryCard key={el.name} data={el} />
        ))}
      </div>
    </div>
  );
};

export default LibraryList;

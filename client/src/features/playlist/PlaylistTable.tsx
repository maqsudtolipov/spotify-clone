import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import SortedTable from '../../ui-library/Table/SortedTable.tsx';

interface Item {
  img: string;
  name: string;
  artist: string;
  plays: number;
  isLiked: boolean;
}

const PlaylistTable = () => {
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    const fetchedItems = Array.from({ length: 18 }, () => ({
      img: faker.image.url({ height: 160, width: 160 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      artist: faker.person.fullName(),
      plays: faker.number.int(999),
      isLiked: faker.datatype.boolean(),
    }));

    setItems(fetchedItems);
  }, []);

  return <>{items && <SortedTable items={items} />}</>;
};

export default PlaylistTable;

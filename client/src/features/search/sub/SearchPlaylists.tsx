import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Card from '../../../ui-library/Card/Card.tsx';

interface CardItem {
  img: string;
  name: string;
  description: string;
  type: string;
}

const SearchPlaylists = () => {
  const [items, setItems] = useState<CardItem[]>([]);

  useEffect(() => {
    const fetchedItems = Array.from({ length: 23 }, () => ({
      img: faker.image.url({ height: 160, width: 160 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      description: `${faker.word.adjective()} ${faker.word.noun()}`,
      type: 'playlist',
    }));

    setItems(fetchedItems);
  }, []);

  return (
    <ul className="grid grid-cols-6">
      {items && items.map((el) => <Card key={el.name} data={el} />)}
    </ul>
  );
};

export default SearchPlaylists;

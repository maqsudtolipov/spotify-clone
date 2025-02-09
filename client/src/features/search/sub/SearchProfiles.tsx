import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import CardsList from '../../../ui/CardsList/CardsList.tsx';

interface CardItem {
  img: string;
  name: string;
  description: string;
  type: string;
}

const SearchProfiles = () => {
  const [items, setItems] = useState<CardItem[]>([]);

  useEffect(() => {
    const fetchedItems = Array.from({ length: 23 }, () => ({
      img: faker.image.url({ height: 160, width: 160 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      description: `${faker.word.adjective()} ${faker.word.noun()}`,
      type: 'artist',
    }));

    setItems(fetchedItems);
  }, []);

  return <CardsList items={items} />;
};

export default SearchProfiles;

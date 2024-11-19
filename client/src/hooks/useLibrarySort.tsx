import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { faker } from '@faker-js/faker';

interface LibrarySortOptions {
  items: object[];
  sortBy: string;
  handleSortItems: (sortBy: string) => void;
}

export const LibrarySortContext = createContext({} as LibrarySortOptions);

interface LibrarySortProviderProps {
  children: ReactNode;
}

export const LibrarySortProvider = ({ children }: LibrarySortProviderProps) => {
  const [sortBy, setSortBy] = useState<string>('alphabetical'); // alphabetical | date added
  const [items, setItems] = useState<object[]>([]);

  // Fake data fetch
  useEffect(() => {
    const arr = [];

    for (let i = 0; i < 20; i++) {
      const img = faker.image.url({
        height: 120,
        width: 120,
      });
      const name = `${faker.word.adjective()} ${faker.word.noun()}`;
      const type = faker.datatype.boolean() ? 'artist' : 'playlist';
      const isPinned = faker.number.int(20) <= 1;

      const createdAt = faker.date
        .between({
          from: '2020-01-01',
          to: Date.now(),
        })
        .toUTCString()
        .toLocaleString();

      arr.push({ img, name, isPinned, type, createdAt });
    }

    arr.sort(
      (a, b) => +b.isPinned - +a.isPinned || a.name.localeCompare(b.name),
    );
    setItems(arr);
  }, []);

  const handleSortItems = (sortBy: 'alphabetical' | 'recentlyAdded'): void => {
    const arr = [...items];

    if (sortBy === 'alphabetical') {
      arr.sort(
        (a, b) => +b.isPinned - +a.isPinned || a.name.localeCompare(b.name),
      );
    } else if (sortBy === 'recentlyAdded') {
      arr.sort(
        (a, b) =>
          +b.isPinned - +a.isPinned ||
          +new Date(b.createdAt) - +new Date(a.createdAt),
      );
    } else {
      console.error('cannot sort items');
    }

    setSortBy(sortBy);
    setItems(arr);
  };

  return (
    <LibrarySortContext.Provider value={{ items, sortBy, handleSortItems }}>
      {children}
    </LibrarySortContext.Provider>
  );
};

const useLibrarySort = () => {
  return useContext(LibrarySortContext);
};

export default useLibrarySort;

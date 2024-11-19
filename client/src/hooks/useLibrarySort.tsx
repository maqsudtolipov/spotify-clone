import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { faker } from '@faker-js/faker';

interface Item {
  img: string;
  name: string;
  type: string;
  isPinned: boolean;
  createdAt: string;
}

type SortBy = 'alphabetical' | 'recentlyAdded';

const sortItems = (items: Item[], sortBy: SortBy): Item[] =>
  [...items].sort((a, b) => {
    const pinComparison = +b.isPinned - +a.isPinned;
    if (pinComparison !== 0) return pinComparison;

    if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'recentlyAdded') {
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    }

    return 0;
  });

interface LibrarySortContextTypes {
  items: Item[];
  sortBy: SortBy;
  handleSortItems: (sortBy: SortBy) => void;
}

export const LibrarySortContext = createContext<LibrarySortContextTypes | null>(
  null,
);

interface LibrarySortProviderProps {
  children: ReactNode;
}

export const LibrarySortProvider = ({ children }: LibrarySortProviderProps) => {
  const [sortBy, setSortBy] = useState<SortBy>('alphabetical');
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchedItems = Array.from({ length: 20 }, () => ({
      img: faker.image.url({ height: 120, width: 120 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      type: faker.datatype.boolean() ? 'artist' : 'playlist',
      isPinned: faker.number.int(20) <= 1,
      createdAt: faker.date
        .between({ from: '2020-01-01', to: Date.now() })
        .toUTCString(),
    }));

    setItems(sortItems(fetchedItems, 'alphabetical'));
  }, []);

  const handleSortItems = (sortBy: SortBy) => {
    setItems(sortItems(items, sortBy));
    setSortBy(sortBy);
  };

  return (
    <LibrarySortContext.Provider value={{ items, sortBy, handleSortItems }}>
      {children}
    </LibrarySortContext.Provider>
  );
};

const useLibrarySort = () => {
  const context = useContext(LibrarySortContext);
  if (!context)
    return new Error('useLibrarySort must be used inside LibrarySortProvider');

  return useContext(LibrarySortContext);
};

export default useLibrarySort;

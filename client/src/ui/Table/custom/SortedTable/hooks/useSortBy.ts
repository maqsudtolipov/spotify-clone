import { useEffect, useState } from 'react';
import { Song } from '../../../../../features/playlist/playlistTypes.ts';

// TODO: sort by likes and duration
const useSortBy = (items: Song[]) => {
  const [sortedItems, setSortedItems] = useState<Song[]>([]);
  const [isAscending, setIsAscending] = useState(true);
  const [sortBy, setSortBy] = useState<'alphabetically' | 'plays' | 'default'>(
    'default',
  );

  useEffect(() => {
    changeSortBy(sortBy);
  }, [items]);

  const changeSortBy = (sortOption: 'alphabetically' | 'plays' | 'default') => {
    switch (sortOption) {
      case 'alphabetically':
        setSortedItems((prev) =>
          [...prev].sort((a, b) =>
            isAscending
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name),
          ),
        );
        break;
      case 'plays':
        setSortedItems((prev) =>
          [...prev].sort((a, b) =>
            isAscending ? a.plays - b.plays : b.plays - a.plays,
          ),
        );
        break;
      default:
        setSortedItems([...items]);
    }
    setSortBy(sortOption);
    setIsAscending((prev) => !prev);
  };

  const sortByDefault = () => changeSortBy('default');
  const sortByAlphabetically = () => changeSortBy('alphabetically');
  const sortByPlays = () => changeSortBy('plays');

  return {
    sortedItems,
    sortBy,
    isAscending,
    sortByDefault,
    sortByAlphabetically,
    sortByPlays,
  };
};

export default useSortBy;

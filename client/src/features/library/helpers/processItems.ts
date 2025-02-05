interface Item {
  id: string;
  name: string;
  user: string;
  img: string;
  isPinned: boolean;
  itemType: string;
  createdAt: Date;
}

const processItems = (
  items: Item[],
  sortBy: 'alphabetical' | 'recentlyAdded',
  filter: 'artist' | 'playlist' | 'none',
  searchQuery: string
): Item[] => {
  let arr = [...items];

  // 1. Sort items
  arr = [...arr].sort((a, b) => {
    const pinComparison = +b.isPinned - +a.isPinned;
    if (pinComparison !== 0) return pinComparison;

    if (sortBy === 'recentlyAdded') {
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    } else {
      // sort alphabetically by default
      return a.name.localeCompare(b.name);
    }
  });

  // 2. Filter items
  arr =
    filter !== 'none' ? arr.filter((item) => item.itemType === filter) : arr;

  // 3. SearchPage items
  arr =
    searchQuery.length >= 3
      ? arr.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : arr;

  return arr;
};

export default processItems;

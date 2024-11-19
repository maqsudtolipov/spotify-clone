import styles from './LibrarySearch.module.scss';
import Dropdown from '../../../ui-library/Dropdown/Dropdown';
import { RiCheckFill, RiListUnordered } from 'react-icons/ri';
import DropdownTrigger from '../../../ui-library/Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../../ui-library/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../ui-library/Dropdown/DropdownItem.tsx';
import useLibrarySort from '../../../hooks/useLibrarySort.tsx';

const LibrarySearchFilter = () => {
  const { sortBy, handleSortItems } = useLibrarySort();

  const renderDropdownItem = (
    label: string,
    sortType: 'alphabetical' | 'recentlyAdded',
  ) => {
    return (
      <DropdownItem
        isHighlighted={sortBy === sortType}
        onClick={() => handleSortItems(sortType)}
        PostIcon={sortBy === sortType ? RiCheckFill : null}
      >
        {label}
      </DropdownItem>
    );
  };

  return (
    <div className={styles.librarySearchFilter}>
      <Dropdown>
        <DropdownTrigger className={styles.librarySearchButton}>
          <span>Sort</span>
          <RiListUnordered />
        </DropdownTrigger>
        <DropdownList>
          {renderDropdownItem('Alphabetical', 'alphabetical')}
          {renderDropdownItem('Recently Added', 'recentlyAdded')}
        </DropdownList>
      </Dropdown>
    </div>
  );
};

export default LibrarySearchFilter;

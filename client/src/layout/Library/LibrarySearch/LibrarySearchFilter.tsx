import styles from './LibrarySearch.module.scss';
import Dropdown from '../../../ui-library/Dropdown/Dropdown';
import { RiCheckFill, RiListUnordered } from 'react-icons/ri';
import DropdownTrigger from '../../../ui-library/Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../../ui-library/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../ui-library/Dropdown/DropdownItem.tsx';
import useLibrarySort from '../../../hooks/useLibrarySort.tsx';

const LibrarySearchFilter = () => {
  const { sortBy, handleSortItems } = useLibrarySort();

  return (
    <div className={styles.librarySearchFilter}>
      <Dropdown>
        <DropdownTrigger className={styles.librarySearchButton}>
          <span>Sort</span>
          <RiListUnordered />
        </DropdownTrigger>
        <DropdownList>
          <DropdownItem
            isHighlighted={sortBy === 'alphabetical'}
            onClick={() => handleSortItems('alphabetical')}
            PostIcon={sortBy === 'alphabetical' ? RiCheckFill : null}
          >
            Alphabetical
          </DropdownItem>
          <DropdownItem
            isHighlighted={sortBy === 'recentlyAdded'}
            onClick={() => handleSortItems('recentlyAdded')}
            PostIcon={sortBy === 'recentlyAdded' ? RiCheckFill : null}
          >
            Recently Added
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    </div>
  );
};

export default LibrarySearchFilter;

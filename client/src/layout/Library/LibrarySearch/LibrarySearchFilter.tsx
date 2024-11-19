import styles from './LibrarySearch.module.scss';
import Dropdown from '../../../ui-library/Dropdown/Dropdown';
import { RiListUnordered } from 'react-icons/ri';
import DropdownTrigger from '../../../ui-library/Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../../ui-library/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../ui-library/Dropdown/DropdownItem.tsx';
import useLibrarySort from '../../../hooks/useLibrarySort.tsx';

const LibrarySearchFilter = () => {
  const { handleSortItems } = useLibrarySort();

  return (
    <div className={styles.librarySearchFilter}>
      <Dropdown>
        <DropdownTrigger className={styles.librarySearchButton}>
          <span>Sort</span>
          <RiListUnordered />
        </DropdownTrigger>
        <DropdownList>
          <DropdownItem onClick={() => handleSortItems('alphabetical')}>
            Alphabetical
          </DropdownItem>
          <DropdownItem onClick={() => handleSortItems('recentlyAdded')}>
            Recently Added
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    </div>
  );
};

export default LibrarySearchFilter;

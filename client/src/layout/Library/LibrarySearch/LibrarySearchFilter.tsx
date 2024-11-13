import styles from './LibrarySearch.module.scss';
import Dropdown from '../../../ui-library/Dropdown/Dropdown';
import { RiListUnordered } from 'react-icons/ri';
import DropdownTrigger from '../../../ui-library/Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../../ui-library/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../ui-library/Dropdown/DropdownItem.tsx';

const LibrarySearchFilter = () => {
  return (
    <div className={styles.librarySearch}>
      <Dropdown>
        <DropdownTrigger className={styles.librarySearchButton}>
          <span>Sort</span>
          <RiListUnordered />
        </DropdownTrigger>
        <DropdownList>
          <DropdownItem>Alphabetical</DropdownItem>
          <DropdownItem>Recently Added</DropdownItem>
        </DropdownList>
      </Dropdown>
    </div>
  );
};

export default LibrarySearchFilter;

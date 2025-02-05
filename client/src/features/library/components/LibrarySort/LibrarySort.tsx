import styles from './LibrarySort.module.scss';
import Dropdown from '../../../../ui-library/Dropdown/Dropdown.tsx';
import { RiCheckFill, RiListUnordered } from 'react-icons/ri';
import DropdownTrigger from '../../../../ui-library/Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../../../ui-library/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../../ui-library/Dropdown/DropdownItem.tsx';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { sortLibraryItems } from '../../librarySlice.ts';

const LibrarySort = () => {
  const sortBy = useAppSelector((state) => state.library.sortBy);
  const dispatch = useAppDispatch();

  const renderDropdownItem = (
    label: string,
    sortType: 'alphabetical' | 'recentlyAdded'
  ) => {
    return (
      <DropdownItem
        isHighlighted={sortBy === sortType}
        onClick={() => dispatch(sortLibraryItems(sortType))}
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

export default LibrarySort;

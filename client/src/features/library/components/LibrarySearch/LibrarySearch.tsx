import styles from './LibrarySearch.module.scss';
import { RiCloseLargeLine, RiSearchLine } from 'react-icons/ri';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { searchLibraryItems } from '../../librarySlice.ts';

const LibrarySearch = () => {
  const { searchQuery } = useAppSelector((state) => state.library);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchLibraryItems(e.target.value));
  };

  const handleToggleForm = () => {
    if (isOpen) {
      dispatch(searchLibraryItems(''));
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <form className={styles.librarySearch}>
      <button
        className={styles.button}
        disabled={isOpen}
        onClick={handleToggleForm}
      >
        <RiSearchLine />
      </button>
      <input
        className={`${styles.input} ${isOpen ? styles.inputOpen : ''}`}
        type="text"
        placeholder="SearchPage in Your Library"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <RiCloseLargeLine
        className={`${styles.closeIcon} ${isOpen && searchQuery.length >= 3 ? styles.closeIconOpen : ''}`}
        role="button"
        onClick={handleToggleForm}
      />
    </form>
  );
};

export default LibrarySearch;

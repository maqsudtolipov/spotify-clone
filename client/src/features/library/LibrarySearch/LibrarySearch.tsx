import styles from './LibrarySearch.module.scss';
import { RiSearchLine } from 'react-icons/ri';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { searchLibraryItems } from '../librarySlice.ts';

const LibrarySearch = () => {
  // const { searchQuery } = useAppSelector((state) => state.library);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(searchLibraryItems(e.target.value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handleToggleForm = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <form className={styles.librarySearch} onSubmit={handleSubmit}>
      <button
        className={`${styles.librarySearchButton} ${isOpen ? styles.librarySearchButtonHover : ''}`}
        onClick={handleToggleForm}
      >
        <RiSearchLine />
      </button>
      <input
        className={`${styles.librarySearchInput} ${isOpen ? styles.librarySearchInputOpen : ''}`}
        type="text"
        placeholder="Search in Your Library"
        onChange={handleInputChange}
      />
    </form>
  );
};

export default LibrarySearch;

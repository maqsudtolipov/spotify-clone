import styles from './LibrarySearch.module.scss';
import { RiSearchLine } from 'react-icons/ri';
import { FormEvent, useState } from 'react';

const LibrarySearchForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handleToggleForm = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <form className={styles.librarySearchForm} onSubmit={handleSubmit}>
      <button
        className={`${styles.librarySearchFormButton} ${isOpen ? styles.librarySearchButtonNoHover : ''}`}
        onClick={handleToggleForm}
      >
        <RiSearchLine />
      </button>
      <input
        className={`${styles.librarySearchFormInput} ${isOpen ? styles.librarySearchFormInputOpen : ''}`}
        type="text"
        placeholder="Search in Your Library"
      />
    </form>
  );
};

export default LibrarySearchForm;

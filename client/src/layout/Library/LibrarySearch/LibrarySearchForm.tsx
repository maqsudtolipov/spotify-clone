import styles from './LibrarySearch.module.scss';
import { RiSearchLine } from 'react-icons/ri';

const LibrarySearchForm = () => {
  return (
    <form className={styles.librarySearchForm}>
      <button className={styles.librarySearchFormButton}>
        <RiSearchLine />
      </button>
      <input
        className={styles.librarySearchFormInput}
        type="text"
        placeholder="Search in Your Library"
      />
    </form>
  );
};

export default LibrarySearchForm;

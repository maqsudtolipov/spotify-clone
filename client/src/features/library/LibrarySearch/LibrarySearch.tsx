import styles from './LibrarySearch.module.scss';
import LibrarySort from '../LibrarySort/LibrarySort.tsx';
import LibrarySearchForm from './LibrarySearchForm.tsx';

const LibrarySearch = () => {
  return (
    <div className={styles.librarySearch}>
      <LibrarySearchForm />
      <LibrarySort />
    </div>
  );
};

export default LibrarySearch;

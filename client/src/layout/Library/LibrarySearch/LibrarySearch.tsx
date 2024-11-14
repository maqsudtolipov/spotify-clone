import styles from './LibrarySearch.module.scss';
import LibrarySearchFilter from './LibrarySearchFilter.tsx';
import LibrarySearchForm from './LibrarySearchForm.tsx';

const LibrarySearch = () => {
  return (
    <div className={styles.librarySearch}>
      <LibrarySearchForm />
      <LibrarySearchFilter />
    </div>
  );
};

export default LibrarySearch;

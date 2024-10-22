import styles from './Library.module.scss';
import LibraryHeader from './LibraryHeader/LibraryHeader.jsx';
import LibraryList from './LibraryList/LibraryList.jsx';

const Library = () => {
  return (
    <div className={styles.library}>
      <LibraryHeader />
      <LibraryList />
    </div>
  );
};

export default Library;

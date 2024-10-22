import styles from './Library.module.scss';
import LibraryHeader from './components/LibraryHeader.jsx';
import LibraryList from './components/LibraryList.jsx';

const Library = () => {
  return (
    <div className={styles.library}>
      <LibraryHeader />
      <LibraryList />
    </div>
  );
};

export default Library;

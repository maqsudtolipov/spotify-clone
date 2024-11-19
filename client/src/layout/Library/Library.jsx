import styles from './Library.module.scss';
import LibraryHeader from './LibraryHeader/LibraryHeader.jsx';
import LibraryList from './LibraryList/LibraryList.jsx';
import { useState } from 'react';
import LibrarySearch from './LibrarySearch/LibrarySearch.tsx';
import { LibrarySortProvider } from '../../hooks/useLibrarySort.tsx';

const Library = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <LibrarySortProvider>
      <div
        className={`${styles.library} ${isCollapsed ? styles.libraryCollapsed : ''}`}
      >
        <LibraryHeader isCollapsed={isCollapsed} onCollapse={handleCollapse} />
        {!isCollapsed && <LibrarySearch />}
        <LibraryList />
      </div>
    </LibrarySortProvider>
  );
};

export default Library;

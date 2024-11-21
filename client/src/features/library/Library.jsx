import styles from './Library.module.scss';
import LibraryHeader from './LibraryHeader/LibraryHeader.jsx';
import LibraryList from './LibraryList/LibraryList.jsx';
import { useState } from 'react';
import LibrarySearch from './LibrarySearch/LibrarySearch.tsx';
import LibraryFilter from './LibraryFilter/LibraryFilter.tsx';

const Library = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`${styles.library} ${isCollapsed ? styles.libraryCollapsed : ''}`}
    >
      <LibraryHeader isCollapsed={isCollapsed} onCollapse={handleCollapse}>
        {!isCollapsed && <LibraryFilter />}
      </LibraryHeader>
      {!isCollapsed && <LibrarySearch />}
      <LibraryList />
    </div>
  );
};

export default Library;

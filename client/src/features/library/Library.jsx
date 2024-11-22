import styles from './Library.module.scss';
import LibraryHeader from './LibraryHeader/LibraryHeader.jsx';
import LibraryList from './LibraryList/LibraryList.jsx';
import { useState } from 'react';
import LibraryFilter from './LibraryFilter/LibraryFilter.tsx';
import LibrarySort from './LibrarySort/LibrarySort.tsx';
import LibrarySearch from './LibrarySearch/LibrarySearch.tsx';

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

      {!isCollapsed && (
        <div className="px-6 py-2.5 pl-4 flex items-center gap-8">
          <LibrarySearch />
          <LibrarySort />
        </div>
      )}

      <LibraryList />
    </div>
  );
};

export default Library;

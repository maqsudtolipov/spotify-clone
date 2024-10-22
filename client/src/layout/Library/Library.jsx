import styles from './Library.module.scss';
import LibraryHeader from './LibraryHeader/LibraryHeader.jsx';
import LibraryList from './LibraryList/LibraryList.jsx';
import { useState } from 'react';

const Library = () => {
  // TODO: Probably need context here
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  // INFO: Collapse sets width to 72
  return (
    <div
      className={`${styles.library} ${isCollapsed ? styles.libraryCollapsed : ''}`}
    >
      <LibraryHeader isCollapsed={isCollapsed} onCollapse={handleCollapse} />
      <LibraryList />
    </div>
  );
};

export default Library;

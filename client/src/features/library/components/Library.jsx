import styles from './Library.module.scss';
import LibraryHeader from './LibraryHeader/LibraryHeader.jsx';
import LibraryList from './LibraryList/LibraryList.jsx';
import LibraryFilter from './LibraryFilter/LibraryFilter.tsx';
import LibrarySort from './LibrarySort/LibrarySort.tsx';
import LibrarySearch from './LibrarySearch/LibrarySearch.tsx';
import { useLibraryResize } from '../../../hooks/useLibraryResize.tsx';

const Library = () => {
  const { drag, resizeEl, libraryEl, isCollapsed, handleCollapse } =
    useLibraryResize();

  return (
    <div
      ref={libraryEl}
      className={`${styles.libraryWrapper} ${isCollapsed ? styles.libraryCollapsed : ''}`}
    >
      <div
        ref={resizeEl}
        className={`${styles.resize} ${drag ? styles.resizeActive : ''}`}
      ></div>

      <div className={styles.library}>
        <LibraryHeader isCollapsed={isCollapsed} onCollapse={handleCollapse}>
          {!isCollapsed && <LibraryFilter />}
        </LibraryHeader>

        {!isCollapsed && (
          <div className="px-6 py-2.5 pl-4 flex items-center gap-8">
            <LibrarySearch />
            <LibrarySort />
          </div>
        )}

        <LibraryList isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default Library;

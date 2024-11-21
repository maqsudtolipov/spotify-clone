import styles from './LibraryHeader.module.scss';
import HeaderTitle from './HeaderTitle.jsx';
import LibraryFilter from './LibraryFilter/LibraryFilter.tsx';

const LibraryHeader = ({ isCollapsed, onCollapse }) => {
  return (
    <div className={styles.header}>
      <HeaderTitle isCollapsed={isCollapsed} onCollapse={onCollapse} />
      {!isCollapsed && <LibraryFilter />}
    </div>
  );
};

export default LibraryHeader;

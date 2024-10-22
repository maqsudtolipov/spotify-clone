import styles from './LibraryHeader.module.scss';
import HeaderTitle from './HeaderTitle.jsx';

const LibraryHeader = ({ isCollapsed, onCollapse }) => {
  return (
    <div className={styles.header}>
      <HeaderTitle isCollapsed={isCollapsed} onCollapse={onCollapse} />
    </div>
  );
};

export default LibraryHeader;

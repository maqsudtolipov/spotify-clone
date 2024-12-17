import styles from './LibraryHeader.module.scss';
import HeaderTitle from './HeaderTitle.jsx';

const LibraryHeader = ({ isCollapsed, onCollapse, children }) => {
  return (
    <div className={styles.header}>
      <HeaderTitle isCollapsed={isCollapsed} onCollapse={onCollapse} />
      {children}
    </div>
  );
};

export default LibraryHeader;

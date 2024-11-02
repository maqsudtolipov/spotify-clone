import styles from './LibraryHeader.module.scss';
import HeaderTitle from './HeaderTitle.jsx';
import HeaderTabs from './HeaderTabs.jsx';

const LibraryHeader = ({ isCollapsed, onCollapse }) => {
  return (
    <div className={styles.header}>
      <HeaderTitle isCollapsed={isCollapsed} onCollapse={onCollapse} />

      {!isCollapsed && <HeaderTabs />}
    </div>
  );
};

export default LibraryHeader;

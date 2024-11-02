import styles from './LibraryHeader.module.scss';
import HeaderTitle from './HeaderTitle.jsx';
import FilterOption from './FilterOption.jsx';
import FilterOptions from './FilterOptions.jsx';

const LibraryHeader = ({ isCollapsed, onCollapse }) => {
  return (
    <div className={styles.header}>
      <HeaderTitle isCollapsed={isCollapsed} onCollapse={onCollapse} />
      <FilterOptions />
    </div>
  );
};

export default LibraryHeader;

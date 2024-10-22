import styles from './LibraryHeader.module.scss';
import HeaderTitle from "./HeaderTitle.jsx";

const LibraryHeader = () => {
  return <div className={styles.header}>
    <HeaderTitle />
  </div>;
};

export default LibraryHeader;

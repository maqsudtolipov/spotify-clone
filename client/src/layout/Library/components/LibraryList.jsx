import styles from './LibraryList.module.scss';

const LibraryList = () => {
  return (
    <div className={styles.list}>
      {[
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3,
        4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      ].map((el) => (
        <div key={el}>test</div>
      ))}
    </div>
  );
};

export default LibraryList;

import styles from './PlayHeader.module.scss';
import HeaderActions from './HeaderActions.tsx';
import TransparentButton from './TransparentButton.tsx';
import PlayButton from './PlayButton.tsx';

const PlayHeader = () => {
  return (
    <div className={styles.playerHeader}>
      <PlayButton />
      <TransparentButton />
      <HeaderActions />
    </div>
  );
};

export default PlayHeader;

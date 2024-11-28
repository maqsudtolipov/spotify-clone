import styles from './PlayHeader.module.scss';
import HeaderActions from './HeaderActions.tsx';
import FollowButton from './FollowButton.tsx';
import PlayButton from './PlayButton.tsx';

const PlayHeader = () => {
  return (
    <div className={styles.playerHeader}>
      <PlayButton />
      <FollowButton />
      <HeaderActions />
    </div>
  );
};

export default PlayHeader;

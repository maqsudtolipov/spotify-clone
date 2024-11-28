import styles from './Artist.module.scss';
import { RiMoreFill, RiPlayLargeFill } from 'react-icons/ri';

const ArtistActions = () => {
  return (
    <div className={styles.artistActions}>
      <RiPlayLargeFill className={styles.playButton} role="button" />
      <button className={styles.followButton}>Follow</button>
      <RiMoreFill className={styles.actionsButton} role="button" />
    </div>
  );
};

export default ArtistActions;

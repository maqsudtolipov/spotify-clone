import styles from './Artist.module.scss';
import { RiPlayLargeFill } from 'react-icons/ri';

const ArtistActions = () => {
  return (
    <div className={styles.artistActions}>
      <RiPlayLargeFill className={styles.playButton} role="button" />

      <span>follow</span>
      <span>...</span>
    </div>
  );
};

export default ArtistActions;

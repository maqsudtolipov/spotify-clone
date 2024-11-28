import { RiPlayLargeFill } from 'react-icons/ri';
import styles from './PlayHeader.module.scss';

const PlayButton = () => {
  return <RiPlayLargeFill className={styles.playButton} role="button" />;
};

export default PlayButton;

import { RiPlayLargeFill } from 'react-icons/ri';
import styles from './PlayButton.module.scss';

const PlayButton = () => {
  return <RiPlayLargeFill className={styles.playButton} role="button" />;
};

export default PlayButton;

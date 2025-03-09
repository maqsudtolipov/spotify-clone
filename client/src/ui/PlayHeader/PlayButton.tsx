import { RiPlayLargeFill } from 'react-icons/ri';
import styles from './PlayButton.module.scss';

interface PlayButtonProps {
  onClick?: () => void;
}

const PlayButton = ({ onClick }: PlayButtonProps) => {
  return (
    <RiPlayLargeFill
      className={styles.playButton}
      role="button"
      onClick={onClick}
    />
  );
};

export default PlayButton;

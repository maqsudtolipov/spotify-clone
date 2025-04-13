import { RiPauseLargeFill, RiPlayLargeFill } from 'react-icons/ri';
import styles from './PlayButton.module.scss';

interface PlayButtonProps {
  onClick?: () => void;
  isPlaying: boolean;
}

const PlayButton = ({ onClick, isPlaying }: PlayButtonProps) => {
  return (
    <button className={styles.playButton} onClick={onClick}>
      {isPlaying ? <RiPauseLargeFill /> : <RiPlayLargeFill />}
    </button>
  );
};

export default PlayButton;

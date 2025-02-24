import styles from './PlayerActions.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import { playNext, playPrev } from '../queue/queueSlice.ts';
import { IoPlayCircle, IoPlaySkipBack, IoPlaySkipForward, IoRepeat, IoShuffle } from 'react-icons/io5';

const PlayerActions = () => {
  const dispatch = useAppDispatch();

  const handlePlayNext = () => {
    dispatch(playNext());
  };

  const handlePlayPrev = () => {
    dispatch(playPrev());
  };

  return (
    <div className={styles.actions}>
      <div className={styles.buttonsContainer}>
        <IoShuffle className={styles.actionBtn} role="button" />
        <IoPlaySkipBack
          className={styles.actionBtn}
          role="button"
          onClick={handlePlayPrev}
        />

        <IoPlayCircle className={styles.playPauseBtn} role="button" />

        <IoPlaySkipForward className={styles.actionBtn} role="button"       onClick={handlePlayNext}/>
        <IoRepeat
          className={styles.actionBtn}
          role="button"

        />
      </div>
      <div>line</div>
    </div>
  );
};

export default PlayerActions;

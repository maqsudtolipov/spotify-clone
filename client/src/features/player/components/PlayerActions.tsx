import styles from './PlayerActions.module.scss';
import { IoPauseCircle, IoPlayCircle, IoPlaySkipBack, IoPlaySkipForward, IoRepeat, IoShuffle } from 'react-icons/io5';
import useAudioPlayer from '../hooks/useAudioPlayer.ts';

const PlayerActions = () => {
  const {
    audioRef,
    isPlaying,
    duration,
    calcTime,
    handlePlayPause,
    handlePlayNext,
    handlePlayPrev,
    handleMetaLoad,
  } = useAudioPlayer();

  return (
    <div className={styles.actions}>
      <div className={styles.buttonsContainer}>
        <IoShuffle className={styles.actionBtn} role="button" />
        <IoPlaySkipBack
          className={styles.actionBtn}
          role="button"
          onClick={handlePlayPrev}
        />

        {!isPlaying ? (
          <IoPlayCircle
            className={styles.playPauseBtn}
            role="button"
            onClick={handlePlayPause}
          />
        ) : (
          <IoPauseCircle
            className={styles.playPauseBtn}
            role="button"
            onClick={handlePlayPause}
          />
        )}

        <IoPlaySkipForward
          className={styles.actionBtn}
          role="button"
          onClick={handlePlayNext}
        />
        <IoRepeat className={styles.actionBtn} role="button" />
      </div>
      <div>
        <p>{calcTime(duration)}</p>

        <audio ref={audioRef} src="" onLoadedMetadata={handleMetaLoad}></audio>
      </div>
    </div>
  );
};

export default PlayerActions;

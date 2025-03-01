import styles from './PlayerActions.module.scss';
import { IoPauseCircle, IoPlayCircle, IoPlaySkipBack, IoPlaySkipForward, IoRepeat, IoShuffle } from 'react-icons/io5';
import useAudioPlayer from '../hooks/useAudioPlayer.ts';

const PlayerActions = () => {
  const {
    currentTime,
    isPlaying,
    audioElRef,
    progressElRef,
    duration,
    changeRange,
    formatTime,
    togglePlayPause,
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
            onClick={togglePlayPause}
          />
        ) : (
          <IoPauseCircle
            className={styles.playPauseBtn}
            role="button"
            onClick={togglePlayPause}
          />
        )}

        <IoPlaySkipForward
          className={styles.actionBtn}
          role="button"
          onClick={handlePlayNext}
        />
        <IoRepeat className={styles.actionBtn} role="button" />
      </div>
      <div className={styles.rangeContainer}>
        <p className={styles.time}>{formatTime(currentTime)}</p>
        <input
          ref={progressElRef}
          className={styles.range}
          type="range"
          onChange={changeRange}
        />
        <p className={styles.time}>{formatTime(duration)}</p>

        <audio
          ref={audioElRef}
          src=""
          onLoadedMetadata={handleMetaLoad}
          preload="metadata"
          // autoPlay={true}
        ></audio>
      </div>
    </div>
  );
};

export default PlayerActions;

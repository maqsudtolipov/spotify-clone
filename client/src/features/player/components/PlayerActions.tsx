import styles from './PlayerActions.module.scss';
import { IoPauseCircle, IoPlayCircle, IoPlaySkipBack, IoPlaySkipForward, IoRepeat, IoShuffle } from 'react-icons/io5';
import useAudioPlayer from '../hooks/useAudioPlayer.ts';

const PlayerActions = () => {
  const {
    isEmpty,
    currentTime,
    isPlaying,
    isLooping,
    isShuffled,
    audioElementRef,
    progressElementRef,
    duration,
    changeRange,
    formatTime,
    togglePlayPause,
    handlePlayNext,
    handlePlayPrev,
    toggleIsLooping,
    handleMetaLoad,
    handleSongEnded,
    handleToggleIsShuffled,
  } = useAudioPlayer();

  return (
    <div
      className={`${styles.actions} ${isEmpty ? styles.actionsDisabled : ''}`}
    >
      <div className={styles.buttonsContainer}>
        <button
          className={`${styles.actionBtn} ${isShuffled ? styles.actionBtnActive : ''}`}
          onClick={handleToggleIsShuffled}
        >
          <IoShuffle />
        </button>

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

        <button onClick={handlePlayNext} className={styles.actionBtn}>
          <IoPlaySkipForward />
        </button>
        <button
          className={`${styles.actionBtn} ${isLooping ? styles.actionBtnActive : ''}`}
          onClick={toggleIsLooping}
        >
          <IoRepeat />
        </button>
      </div>
      <div className={styles.rangeContainer}>
        <p className={styles.time}>{formatTime(currentTime)}</p>
        <input
          ref={progressElementRef}
          className={styles.range}
          type="range"
          defaultValue={0}
          onChange={changeRange}
        />
        <p className={styles.time}>{formatTime(duration)}</p>

        <audio
          ref={audioElementRef}
          preload="metadata"
          src=""
          onLoadedMetadata={handleMetaLoad}
          onEnded={handleSongEnded}
        ></audio>
      </div>
    </div>
  );
};

export default PlayerActions;

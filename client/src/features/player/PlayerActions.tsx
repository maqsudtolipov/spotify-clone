import styles from './PlayerActions.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { playNext, playPrev } from '../queue/queueSlice.ts';
import { IoPlayCircle, IoPlaySkipBack, IoPlaySkipForward, IoRepeat, IoShuffle } from 'react-icons/io5';
import { useEffect, useRef } from 'react';

const PlayerActions = () => {
  const song = useAppSelector((state) => state.queue.items[0]);
  const dispatch = useAppDispatch();

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef.current.src = song.song.url;
  }, [song._id]);

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

        <IoPlaySkipForward
          className={styles.actionBtn}
          role="button"
          onClick={handlePlayNext}
        />
        <IoRepeat className={styles.actionBtn} role="button" />
      </div>
      <div>
        <audio ref={audioRef} src=""></audio>
      </div>
    </div>
  );
};

export default PlayerActions;

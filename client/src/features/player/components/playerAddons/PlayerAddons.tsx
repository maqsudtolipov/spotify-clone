import styles from '../playerActions/PlayerActions.module.scss';
import { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import { IoList, IoVolumeHigh, IoVolumeLow, IoVolumeMedium, IoVolumeOff } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { closeQueue, openQueue } from '../../../queue/queueSlice.ts';

// TODO: For actions
// 1. Add volume change button - now
// 2. Add mini on screen player - future
// 3. Add full screen player + unsplash API - future

const PlayerAddons = forwardRef((_, ref: Ref<HTMLAudioElement>) => {
  const isOpen = useAppSelector((state) => state.queue.isOpen);
  const dispatch = useAppDispatch();
  const [volume, setVolume] = useState(100);
  const volumeElementRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (volumeElementRef.current) {
      volumeElementRef.current.style.setProperty('--range-width', `100%`);
    }
  }, []);

  const handleVolumeChange = () => {
    if (volumeElementRef.current) {
      setVolume(Number(volumeElementRef.current.value));
      volumeElementRef.current.style.setProperty(
        '--range-width',
        `${volumeElementRef.current.value}%`,
      );
      if (ref?.current) ref.current.volume = volume / 100;
    }
  };

  const toggleIsOpen = () => {
    isOpen ? dispatch(closeQueue()) : dispatch(openQueue());
  };

  return (
    <div className={styles.volumeContainer}>
      <button
        className={`${styles.actionBtn} ${isOpen ? styles.actionBtnActive : ''}`}
        onClick={toggleIsOpen}
      >
        <IoList />
      </button>
      <div className={styles.volumeIcon}>
        {volume === 0 && <IoVolumeOff />}
        {volume > 0 && volume < 34 && <IoVolumeLow />}
        {volume >= 34 && volume < 66 && <IoVolumeMedium />}
        {volume >= 66 && <IoVolumeHigh />}
      </div>
      <input
        ref={volumeElementRef}
        className={styles.range}
        type="range"
        value={volume}
        max={100}
        onChange={handleVolumeChange}
      />
    </div>
  );
});

export default PlayerAddons;

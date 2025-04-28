import styles from '../playerActions/PlayerActions.module.scss';
import { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import {
  IoList,
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
  IoVolumeOff,
} from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { closeQueue, openQueue } from '../../../queue/queueSlice.ts';

// TODO: For actions
// 1. Add volume change button - now
// 2. Add mini on screen player - future
// 3. Add full screen player + unsplash API - future

const PlayerAddons = forwardRef<HTMLAudioElement, {}>((_, ref) => {
  const isOpen = useAppSelector((state) => state.queue.isOpen);
  const dispatch = useAppDispatch();
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const volumeElementRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (volumeElementRef.current) {
      volumeElementRef.current.style.setProperty('--range-width', `100%`);
    }
  }, []);

  const handleVolumeChange = () => {
    if (volumeElementRef.current && ref && 'current' in ref && ref.current) {
      const newVolume = Number(volumeElementRef.current.value);

      // Dom changes
      volumeElementRef.current.style.setProperty(
        '--range-width',
        `${volumeElementRef.current.value}%`,
      );

      ref.current.volume = newVolume / 100;

      // State changes
      setVolume(newVolume);
      // If volume is 0 make it muted
      if (newVolume === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  };

  const toggleMute = () => {
    // if muted and value is zero, unmute and set volume to 50
    if (isMuted && volume === 0) {
      // State changes
      setIsMuted(false);
      setVolume(50);

      // DOM changes
      volumeElementRef.current.style.setProperty('--range-width', `${50}%`);

      ref.current.volume = 0.5;
    } else if (!isMuted && volume >= 1) {
      setIsMuted(true);
      volumeElementRef.current.style.setProperty('--range-width', `${0}%`);
      ref.current.volume = 0;
    } else if (isMuted && volume >= 1) {
      setIsMuted(false);
      volumeElementRef.current.style.setProperty('--range-width', `${volume}%`);
      ref.current.volume = volume / 100;
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
      <div className={styles.volumeIcon} onClick={toggleMute}>
        {isMuted && <IoVolumeMute />}
        {!isMuted && volume > 0 && volume < 34 && <IoVolumeLow />}
        {!isMuted && volume >= 34 && volume < 66 && <IoVolumeMedium />}
        {!isMuted && volume >= 66 && <IoVolumeHigh />}
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

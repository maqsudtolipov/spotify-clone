import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { ReactEventHandler, useEffect, useRef, useState } from 'react';
import { playNext, playPrev } from '../../queue/queueSlice.ts';

const useAudioPlayer = () => {
  const song = useAppSelector((state) => state.queue.items[0]);
  let dispatch = useAppDispatch();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number>();

  // Updates audio source and resets player
  useEffect(() => {
    if (audioRef.current && song) {
      audioRef.current.src = song.song.url;
      resetPlayer();
    }
  }, [song?._id]);

  // Reset player when moving to next or previous song
  const resetPlayer = () => {
    setDuration(0);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    if (progressRef.current) {
      progressRef.current.value = '0';
      progressRef.current.style.setProperty('--range-width', `${0}%`); // Reset
    }

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = undefined;
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    const audioEl = audioRef.current;

    if (!isPlaying) {
      audioEl?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioEl?.pause();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
  };

  const handlePlayNext = () => {
    dispatch(playNext());
    resetPlayer();
  };

  const handlePlayPrev = () => {
    dispatch(playPrev());
    resetPlayer();
  };

  // Updates duration and progress bar max value when audio is loaded
  const handleMetaLoad: ReactEventHandler<HTMLAudioElement> = (e) => {
    const audioEl = e.target as HTMLAudioElement;
    const seconds = Math.floor(audioEl.duration);
    setDuration(seconds);

    if (isPlaying) audioEl.play(); // If isPlaying true auto plays new song
    if (progressRef.current) progressRef.current.max = String(seconds);
  };

  const whilePlaying = () => {
    if (progressRef.current && audioRef.current) {
      progressRef.current.value = String(audioRef.current.currentTime);
      changeCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const changeCurrentTime = () => {
    if (progressRef.current) {
      const current = Number(progressRef.current.value);
      progressRef.current.style.setProperty(
        '--range-width',
        `${(current / duration) * 100}%`,
      );
      setCurrentTime(current);
    }
  };

  const changeRange = () => {
    if (audioRef.current && progressRef.current) {
      audioRef.current.currentTime = Number(progressRef.current.value);
      changeCurrentTime();
    }
  };

  const formatTime = (secs: number) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, '0');
    const seconds = String(Math.floor(secs % 60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return {
    currentTime,
    isPlaying,
    audioRef,
    progressRef,
    duration,
    changeRange,
    formatTime,
    togglePlayPause,
    handlePlayNext,
    handlePlayPrev,
    handleMetaLoad,
  };
};

export default useAudioPlayer;

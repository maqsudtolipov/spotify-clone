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

  // Effect to update audio source and play/pause based on song change
  useEffect(() => {
    if (audioRef.current && song) {
      audioRef.current.src = song.song.url;
      setCurrentTime(0); // Reset current time when the song changes
      if (progressRef.current) progressRef.current.value = '0'; // Reset progress bar
      setDuration(0); // Reset duration on song change
    }
  }, [song?._id]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    if (!isPlaying) {
      audioRef.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioRef.current?.pause();
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

  // Reset player when moving to next or previous song
  const resetPlayer = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    if (progressRef.current)
      progressRef.current.style.setProperty('--range-width', `${0}%`);
    setCurrentTime(0);
    if (progressRef.current) progressRef.current.value = '0'; // Reset progress bar
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = undefined; // Clear any previous animation frame
  };

  const handleMetaLoad: ReactEventHandler<HTMLAudioElement> = (e) => {
    const audioEl = e.target as HTMLAudioElement;
    const seconds = Math.floor(audioEl.duration);
    setDuration(seconds);
    if (isPlaying) audioEl.play();
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
      progressRef.current.style.setProperty(
        '--range-width',
        `${(Number(progressRef.current.value) / duration) * 100}%`,
      );
      setCurrentTime(Number(progressRef.current.value));
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

import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { ReactEventHandler, useEffect, useRef, useState } from 'react';
import { playNext, playPrev } from '../../queue/queueSlice.ts';

// Steps
// 1. Change song src when song changes

const useAudioPlayer = () => {
  const song = useAppSelector((state) => state.queue.items[0]);
  let dispatch = useAppDispatch();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioElRef = useRef<HTMLAudioElement>(null);
  const progressElRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number>();

  // Updates audio source and resets player
  useEffect(() => {
    if (song?.song?.url && audioElRef.current) {
      animationRef.current = undefined;
      audioElRef.current.src = song.song.url;
    }

    // if (audioRef.current && song) {
    //   audioRef.current.src = song.song.url;
    //   resetPlayer();
    // }
  }, [song]);

  useEffect(() => {
    console.log(duration, isPlaying);
    if (duration !== 0 && isPlaying) {
      audioElRef.current.play();
      animationRef.current = requestAnimationFrame(animationWhilePlaying);
    }
  }, [duration, isPlaying]);

  const resetPlayer = () => {
    progressElRef.current.value = 0;
    progressElRef.current.style.setProperty('--range-width', `0%`);
    setCurrentTime(0);
  };

  // Reset player when moving to next or previous song
  // const resetPlayer = () => {
  // setDuration(0);
  // setCurrentTime(0);
  //
  // if (audioRef.current) {
  //   audioRef.current.currentTime = 0;
  // }
  // if (progressRef.current) {
  //   progressRef.current.value = '0';
  //   progressRef.current.style.setProperty('--range-width', `${0}%`); // Reset
  // }
  //
  // if (animationRef.current) cancelAnimationFrame(animationRef.current);
  // animationRef.current = undefined;
  // };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);

    if (!isPlaying) {
      audioElRef.current?.play();
      animationRef.current = requestAnimationFrame(animationWhilePlaying);
    } else {
      audioElRef.current?.pause();
      animationRef.current = null;
      // cancelAnimationFrame(animationRef.current);
    }

    // setIsPlaying((prev) => !prev);
    // const audioEl = audioRef.current;
    // if (!isPlaying) {
    //   audioEl?.play();
    //   animationRef.current = requestAnimationFrame(whilePlaying);
    // } else {
    //   audioEl?.pause();
    //   if (animationRef.current) cancelAnimationFrame(animationRef.current);
    // }
  };

  const handlePlayNext = () => {
    resetPlayer();
    dispatch(playNext());
  };

  const handlePlayPrev = () => {
    resetPlayer();
    dispatch(playPrev());
  };

  // const resetPlayer = () => {
  //   // setCurrentTime(0);
  //   // setDuration(0);
  //   // cancelAnimationFrame(animationRef.current);
  //   // animationRef.current = null;
  //   // animationRef.current = null;
  // };

  // Runs on song meta loaded
  const handleMetaLoad: ReactEventHandler<HTMLAudioElement> = () => {
    if (audioElRef.current && progressElRef.current) {
      const loadedAudioDuration = Math.floor(audioElRef.current.duration);
      progressElRef.current.value = '0';
      progressElRef.current.max = String(loadedAudioDuration);
      setDuration(loadedAudioDuration);

      // if (isPlaying) {
      //   audioElRef.current?.play();
      //   animationRef.current = requestAnimationFrame(animationWhilePlaying);
      // }
    }

    // const audioEl = e.target as HTMLAudioElement;
    // const seconds = Math.floor(audioEl.duration);
    // setDuration(seconds);
    //
    // if (isPlaying) audioEl.play(); // If isPlaying true auto plays new song
    // if (progressRef.current) progressRef.current.max = String(seconds);
  };

  // Changes progress value and updates current time every fps
  const animationWhilePlaying = () => {
    if (progressElRef.current && audioElRef.current) {
      progressElRef.current.value = String(audioElRef.current.currentTime);

      console.log(
        'debug',
        progressElRef.current.value,
        audioElRef.current.currentTime,
        duration,
      );
      console.log('ANIMATION: ', animationRef.current);

      progressElRef.current.style.setProperty(
        '--range-width',
        `${(Number(progressElRef.current.value) / duration) * 100}%`,
      );
      setCurrentTime(audioElRef.current.currentTime);

      if (animationRef.current) {
        requestAnimationFrame(animationWhilePlaying);
      }
    }
  };

  const whilePlaying = () => {
    // if (progressRef.current && audioRef.current) {
    //   progressRef.current.value = String(audioRef.current.currentTime);
    //   changeCurrentTime();
    //   animationRef.current = requestAnimationFrame(whilePlaying);
    // }
  };

  const changeRange = () => {
    if (progressElRef.current && audioElRef.current) {
      audioElRef.current.currentTime = Number(progressElRef.current.value);
      progressElRef.current.style.setProperty(
        '--range-width',
        `${(Number(progressElRef.current.value) / duration) * 100}%`,
      );
      setCurrentTime(audioElRef.current.currentTime);

      // const current = Number(progressElRef.current.value);
      // progressElRef.current.style.setProperty(
      //   '--range-width',
      //   `${(current / duration) * 100}%`,
      // );
      // setCurrentTime(current);
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
    audioElRef,
    progressElRef,
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

import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { ReactEventHandler, useEffect, useRef, useState } from 'react';
import { playNext, playPrev } from '../../queue/queueSlice.ts';

const useAudioPlayer = () => {
  const song = useAppSelector((state) => state.queue.items[0]);
  let dispatch = useAppDispatch();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioElementRef = useRef<HTMLAudioElement>(null);
  const progressElementRef = useRef<HTMLInputElement>(null);
  const animationFrameRef = useRef<number>();

  // Updates audio source and stops animations
  useEffect(() => {
    if (song?.song?.url && audioElementRef.current) {
      animationFrameRef.current = undefined;
      audioElementRef.current.src = song.song.url;
    }
  }, [song]);

  useEffect(() => {
    if (audioElementRef.current && duration !== 0 && isPlaying) {
      audioElementRef.current.play();
      animationFrameRef.current = requestAnimationFrame(animationWhilePlaying);
    }
  }, [duration, isPlaying]);

  const resetPlayer = () => {
    if (progressElementRef.current) {
      progressElementRef.current.value = '0';
      progressElementRef.current.style.setProperty('--range-width', `0%`);
    }
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);

    if (!isPlaying) {
      audioElementRef.current?.play();
      animationFrameRef.current = requestAnimationFrame(animationWhilePlaying);
    } else {
      audioElementRef.current?.pause();
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      // animationFrameRef.current = null;
    }
  };

  const handlePlayNext = () => {
    resetPlayer();
    dispatch(playNext());
  };

  const handlePlayPrev = () => {
    resetPlayer();
    dispatch(playPrev());
  };

  // Sets song durations and resets range
  const handleMetaLoad: ReactEventHandler<HTMLAudioElement> = () => {
    if (audioElementRef.current && progressElementRef.current) {
      const loadedAudioDuration = Math.floor(audioElementRef.current.duration);
      progressElementRef.current.value = '0';
      progressElementRef.current.max = String(loadedAudioDuration);

      setDuration(loadedAudioDuration);
    }
  };

  // If song ended and loop is on repeat current song, else play next one
  const handleSongEnded: ReactEventHandler<HTMLAudioElement> = () => {
    resetPlayer();
    if (isLooping) {
      audioElementRef.current?.play();
      animationFrameRef.current = requestAnimationFrame(animationWhilePlaying);
    } else {
      handlePlayNext();
    }
  };

  // Changes progress value and updates current time on every frame
  const animationWhilePlaying = () => {
    if (progressElementRef.current && audioElementRef.current) {
      progressElementRef.current.value = String(
        audioElementRef.current.currentTime,
      );

      progressElementRef.current.style.setProperty(
        '--range-width',
        `${(Number(progressElementRef.current.value) / duration) * 100}%`,
      );

      setCurrentTime(audioElementRef.current.currentTime);

      if (animationFrameRef.current) {
        requestAnimationFrame(animationWhilePlaying);
      }
    }
  };

  const changeRange = () => {
    if (progressElementRef.current && audioElementRef.current) {
      audioElementRef.current.currentTime = Number(
        progressElementRef.current.value,
      );
      progressElementRef.current.style.setProperty(
        '--range-width',
        `${(Number(progressElementRef.current.value) / duration) * 100}%`,
      );
      setCurrentTime(audioElementRef.current.currentTime);
    }
  };

  const toggleIsLooping = () => {
    setIsLooping((prev) => !prev);
  };

  const formatTime = (secs: number) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, '0');
    const seconds = String(Math.floor(secs % 60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return {
    currentTime,
    isPlaying,
    isLooping,
    audioElementRef,
    progressElementRef,
    duration,
    changeRange,
    formatTime,
    togglePlayPause,
    handlePlayNext,
    handlePlayPrev,
    handleMetaLoad,
    toggleIsLooping,
    handleSongEnded,
  };
};

export default useAudioPlayer;

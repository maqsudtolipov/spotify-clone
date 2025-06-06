import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { ReactEventHandler, useEffect, useRef, useState } from 'react';
import {
  playerTogglePlay,
  playNext,
  playPrev,
  toggleIsShuffled,
} from '../../queue/queueSlice.ts';
import axios from '../../../axios/axios';

const incrementPlayCount = async (songId: string) => {
  try {
    await axios.post(`/songs/${songId}/play`);
  } catch (error) {
    console.error('Failed to increment play count:', error);
  }
};

const useAudioPlayer = () => {
  const songs = useAppSelector((state) => state.queue.items);
  const isShuffled = useAppSelector((state) => state.queue.isShuffled);
  const isPlaying = useAppSelector((state) => state.queue.isPlaying);
  let dispatch = useAppDispatch();

  const isEmpty = songs.length === 0;
  const song = songs[0] || null;

  // const [isPlaying, setIsPlaying] = useState(false);
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

      // Call API to increase play count
      incrementPlayCount(song.id);
    }
  }, [song]);

  useEffect(() => {
    if (audioElementRef.current && duration !== 0 && isPlaying) {
      audioElementRef.current.play();
      animationFrameRef.current = requestAnimationFrame(animationWhilePlaying);
    }
  }, [duration, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audioElementRef.current?.play();
      animationFrameRef.current = requestAnimationFrame(animationWhilePlaying);
    } else {
      audioElementRef.current?.pause();
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      // animationFrameRef.current = null;
    }
  }, [isPlaying]);

  // Keyboard events
  useEffect(() => {
    // dispatch(playerTogglePlay());

    const handleSpace = (e) => {
      const tagName = e.target.tagName.toLowerCase();
      const isEditable = e.target.isContentEditable;
      if (
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'button' ||
        isEditable
      )
        return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  }, []);

  const resetPlayer = () => {
    if (progressElementRef.current) {
      progressElementRef.current.value = '0';
      progressElementRef.current.style.setProperty('--range-width', `0%`);
    }
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    // e.currentTarget.blur();

    dispatch(playerTogglePlay());

    // if (!isPlaying) {
    //   audioElementRef.current?.play();
    //   animationFrameRef.current = requestAnimationFrame(animationWhilePlaying);
    // } else {
    //   audioElementRef.current?.pause();
    //   if (animationFrameRef.current)
    //     cancelAnimationFrame(animationFrameRef.current);
    //   // animationFrameRef.current = null;
    // }
  };

  const handlePlayNext = (e) => {
    e.currentTarget.blur();

    resetPlayer();
    dispatch(playNext());
  };

  const handlePlayPrev = (e) => {
    e.currentTarget.blur();

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

  const toggleIsLooping = (e) => {
    e.currentTarget.blur();
    setIsLooping((prev) => !prev);
  };

  const handleToggleIsShuffled = (e) => {
    e.currentTarget.blur();
    dispatch(toggleIsShuffled());
  };

  const formatTime = (secs: number) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, '0');
    const seconds = String(Math.floor(secs % 60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return {
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
    handleMetaLoad,
    toggleIsLooping,
    handleSongEnded,
    handleToggleIsShuffled,
  };
};

export default useAudioPlayer;

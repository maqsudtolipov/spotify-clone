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

  // Effect to update audio source and play/pause based on song change
  useEffect(() => {
    if (audioRef.current && song) {
      audioRef.current.src = song.song.url;
    }
  }, [song?._id]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    if (!isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };

  const handlePlayNext = () => dispatch(playNext());
  const handlePlayPrev = () => dispatch(playPrev());

  const handleMetaLoad: ReactEventHandler<HTMLAudioElement> = (e) => {
    const audioEl = e.target as HTMLAudioElement;
    const seconds = Math.floor(audioEl.duration);
    setDuration(seconds);
    if (isPlaying) audioEl.play();
    if (progressRef.current) progressRef.current.max = String(seconds);
  };

  const changeRange = () => {
    if (audioRef.current && progressRef.current) {
      audioRef.current.currentTime = Number(progressRef.current.value);
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

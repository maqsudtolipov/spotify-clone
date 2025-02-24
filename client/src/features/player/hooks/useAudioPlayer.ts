import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { ReactEventHandler, useEffect, useRef, useState } from 'react';
import { playNext, playPrev } from '../../queue/queueSlice.ts';

const useAudioPlayer = () => {
  const song = useAppSelector((state) => state.queue.items[0]);
  let dispatch = useAppDispatch();

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Effect to update audio source and play/pause based on song change
  useEffect(() => {
    if (audioRef.current && song) {
      audioRef.current.src = song.song.url;
    }
  }, [song?._id]); // Dependency on song and isPlaying

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
    if (!isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };

  const handlePlayNext = async () => {
    dispatch(playNext());
  };

  const handlePlayPrev = async () => {
    dispatch(playPrev());
  };

  const handleMetaLoad: ReactEventHandler<HTMLAudioElement> = (e) => {
    if (e.target) {
      setDuration(Number(e.target.duration));
      if (isPlaying) e.target.play();
    }
  };

  const calcTime = (secs: number) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, '0');
    const seconds = String(Math.floor(secs % 60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return {
    audioRef,
    isPlaying,
    duration,
    calcTime,
    handlePlayPause,
    handlePlayNext,
    handlePlayPrev,
    handleMetaLoad,
  };
};

export default useAudioPlayer;

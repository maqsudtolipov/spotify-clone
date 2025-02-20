import { useAppDispatch } from '../../redux/hooks';
import { playNext, playPrev } from '../queue/queueSlice.ts';

const PlayerActions = () => {
  const dispatch = useAppDispatch();

  const handlePlayNext = () => {
    dispatch(playNext());
  };

  const handlePlayPrev = () => {
    dispatch(playPrev());
  };

  return (
    <div>
      <div className="flex gap-4 p-2">
        <button onClick={handlePlayPrev}>prev</button>
        <button>play</button>
        <button onClick={handlePlayNext}>next</button>
      </div>
      <div>line</div>
    </div>
  );
};

export default PlayerActions;

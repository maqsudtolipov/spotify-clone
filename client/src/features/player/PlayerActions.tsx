import { useAppDispatch } from '../../redux/hooks';
import { playNext } from '../queue/queueSlice.ts';

const PlayerActions = () => {
  const dispatch = useAppDispatch();

  const handlePlayNext = () => {
    dispatch(playNext());
  };

  return (
    <div>
      <div className="flex gap-4 p-2">
        <button>prev</button>
        <button>play</button>
        <button onClick={handlePlayNext}>next</button>
      </div>
      <div>line</div>
    </div>
  );
};

export default PlayerActions;

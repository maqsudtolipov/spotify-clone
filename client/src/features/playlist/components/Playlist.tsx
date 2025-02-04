import PlayHeader from '../../../components/PlayHeader/PlayHeader.tsx';
import PlaylistTable from './PlaylistTable.tsx';
import PlaylistHeader from './PlaylistHeader.tsx';
import GradientBackground from '../../../components/GradientBackground/GradientBackground.tsx';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks.ts';
import { useEffect } from 'react';
import { getArtist } from '../../artist/artistThunks.ts';

const Playlist = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getArtist(id));
    console.log(id);
  }, [id]);

  const color =
    '#' +
    ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0') +
    '4d';

  return (
    <div>
      <PlaylistHeader color={color} />
      <GradientBackground color={color}>
        <PlayHeader />
        <div className="p-5 pt-0">
          <PlaylistTable />
        </div>
      </GradientBackground>
    </div>
  );
};

export default Playlist;

import PlaylistTable from './PlaylistTable.tsx';
import PlaylistHeader from './PlaylistHeader.tsx';
import GradientBackground from '../../../ui/GradientBackground/GradientBackground.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useEffect } from 'react';
import { getPlaylist } from '../playlistThunks.ts';
import NotFound from '../../../ui/StatusScreens/NotFound.tsx';
import ServerError from '../../../ui/StatusScreens/ServerError.tsx';
import LoadingScreen from '../../../ui/StatusScreens/LoadingScreen.tsx';
import PlaylistActions from './PlaylistActions.tsx';

const Playlist = () => {
  const { status, statusCode, error } = useAppSelector(
    (state) => state.playlist.api.getPlaylist
  );
  const { data } = useAppSelector((state) => state.playlist);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getPlaylist({ id }));
  }, [id]);

  if (status === 'rejected') {
    if (statusCode === 404) return <NotFound message={error} />;
    if (statusCode === 500) return <ServerError />;
    else navigate('/');
  }
  if (status === 'pending' || !data) return <LoadingScreen />;

  return (
    <div>
      <PlaylistHeader data={data} />
      <GradientBackground color={data.color}>
        <PlaylistActions data={data} />

        <div className="p-5 pt-0">
          <PlaylistTable />
        </div>
      </GradientBackground>
    </div>
  );
};

export default Playlist;

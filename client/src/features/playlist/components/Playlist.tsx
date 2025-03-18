import GradientBackground from '../../../ui/GradientBackground/GradientBackground.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { useEffect } from 'react';
import { getPlaylist } from '../playlistThunks.ts';
import NotFound from '../../../ui/statusScreens/NotFound.tsx';
import ServerError from '../../../ui/statusScreens/ServerError.tsx';
import LoadingScreen from '../../../ui/statusScreens/LoadingScreen.tsx';
import PlaylistActions from './PlaylistActions.tsx';
import ImageHeader from '../../../ui/ImageHeader/ImageHeader.tsx';
import styles from './Playlist.module.scss';
import PlaylistTable from './PlaylistTable.tsx';

const Playlist = () => {
  const { status, statusCode, error } = useAppSelector(
    (state) => state.playlist.api.getPlaylist,
  );
  const { data } = useAppSelector((state) => state.playlist);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getPlaylist(id));
  }, [id]);

  if (status === 'rejected') {
    if (statusCode === 404) return <NotFound message={error} />;
    if (statusCode === 500) return <ServerError />;
    else navigate('/');
  }
  if (status === 'pending' || !data) return <LoadingScreen />;

  return (
    <div className={styles.playlist}>
      <ImageHeader data={data} type="playlist" />
      <GradientBackground color={data.color}>
        <PlaylistActions data={data} />
        <PlaylistTable songs={data.songs} />
      </GradientBackground>
    </div>
  );
};

export default Playlist;

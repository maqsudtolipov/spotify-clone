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
import useDominantColor from '../../../hooks/useDominantColor.ts';

const Playlist = () => {
  const { status, statusCode, error } = useAppSelector(
    (state) => state.playlist.api.getPlaylist,
  );
  const { data } = useAppSelector((state) => state.playlist);
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { bg, text } = useDominantColor(data?.img?.url);

  useEffect(() => {
    if (id) dispatch(getPlaylist(id));
  }, [id]);

  if (status === 'pending') return <LoadingScreen />;
  if (status === 'rejected') {
    if (statusCode === 404) return <NotFound message={error} />;
    if (statusCode === 500) return <ServerError />;
    navigate('/');
  }

  if (data)
    return (
      <div className={styles.playlistContainer}>
        <ImageHeader data={data} type="playlist" color={bg} textColor={text} />
        <GradientBackground color={bg}>
          <PlaylistActions data={data} />
          <PlaylistTable songs={data.songs} />
        </GradientBackground>
      </div>
    );

  return <LoadingScreen />;
};

export default Playlist;

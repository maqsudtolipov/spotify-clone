import GradientBackground from '../../../ui/GradientBackground/GradientBackground.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { useEffect } from 'react';
import { getPlaylist } from '../playlistThunks.ts';
import NotFound from '../../../ui/statusScreens/NotFound.tsx';
import ServerError from '../../../ui/statusScreens/ServerError.tsx';
import LoadingScreen from '../../../ui/statusScreens/LoadingScreen.tsx';
import PlaylistActions from './PlaylistActions.tsx';
import styles from './Playlist.module.scss';
import PlaylistTable from './table/PlaylistTable.tsx';
import useDominantColor from '../../../hooks/useDominantColor.ts';
import PlaylistHeader from './header/PlaylistHeader.tsx';

const Playlist = () => {
  const { status, statusCode, error } = useAppSelector(
    (state) => state.playlist.api.getPlaylist,
  );
  const { data } = useAppSelector((state) => state.playlist);
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { bgColor, textColor } = useDominantColor(data?.img?.url);

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
        <PlaylistHeader data={data} bgColor={bgColor} textColor={textColor} />
        <GradientBackground color={bgColor}>
          <PlaylistActions data={data} />
          <PlaylistTable songs={data.songs} />
        </GradientBackground>
      </div>
    );

  return <LoadingScreen />;
};

export default Playlist;

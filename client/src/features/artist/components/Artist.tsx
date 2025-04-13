import ArtistTable from './ArtistTable.tsx';
import ArtistHeader from './ArtistHeader.tsx';
import GradientBackground from '../../../ui/GradientBackground/GradientBackground.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { useEffect } from 'react';
import { getArtist } from '../artistThunks.ts';
import LoadingScreen from '../../../ui/statusScreens/LoadingScreen.tsx';
import styles from '../../../ui/PlayHeader/PlayHeader.module.scss';
import NotFound from '../../../ui/statusScreens/NotFound.tsx';
import ServerError from '../../../ui/statusScreens/ServerError.tsx';
import ArtistActions from './ArtistActions.tsx';

const Artist = () => {
  const { id } = useParams<{ id: string }>();
  const { status, statusCode, error } = useAppSelector(
    (state) => state.artist.api.getArtist,
  );
  const data = useAppSelector((state) => state.artist.data);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getArtist(id));
  }, [id]);

  if (status === 'rejected') {
    if (statusCode === 404) return <NotFound message={error} />;
    if (statusCode === 500) return <ServerError />;
    else navigate('/');
  }
  if (status === 'pending' || !data || !id)
    return <LoadingScreen />;

  return (
    <div className={styles.artistPage}>
      {data && <ArtistHeader />}
      <GradientBackground color={data.color}>
        <ArtistActions data={data} />
        <ArtistTable />
      </GradientBackground>
    </div>
  );
};

export default Artist;

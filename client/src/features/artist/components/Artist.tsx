import ArtistTable from './ArtistTable.tsx';
import ArtistHeader from './ArtistHeader.tsx';
import GradientBackground from '../../../ui/GradientBackground/GradientBackground.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { useEffect } from 'react';
import { getArtist } from '../artistThunks.ts';
import LoadingScreen from '../../../ui/StatusScreens/LoadingScreen.tsx';
import styles from '../../../ui/PlayHeader/PlayHeader.module.scss';
import PlayButton from '../../../ui/PlayHeader/PlayButton.tsx';
import TransparentButton from '../../../ui/Button/TransparentButton.tsx';
import { followUser, unfollowUser } from '../../auth/userThunks.ts';
import UploadSongDialog from './uploadSong/UploadSongDialog.tsx';
import NotFound from '../../../ui/StatusScreens/NotFound.tsx';
import ServerError from '../../../ui/StatusScreens/ServerError.tsx';

const isFollowed = (id: string, followings: string[]) => {
  return followings.includes(id);
};

const Artist = () => {
  const { id } = useParams<{ id: string }>();
  const { status, statusCode, error } = useAppSelector(
    (state) => state.artist.api.getArtist,
  );
  const data = useAppSelector((state) => state.artist.data);
  const { followings, id: userId } = useAppSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getArtist(id));
  }, [id]);

  const handleFollow = () => {
    if (id) {
      dispatch(followUser({ id, type: 'artist' }));
    }
  };

  const handleUnfollow = () => {
    if (id) {
      dispatch(unfollowUser({ id, type: 'artist' }));
    }
  };

  if (status === 'rejected') {
    if (statusCode === 404) return <NotFound message={error} />;
    if (statusCode === 500) return <ServerError />;
    else navigate('/');
  }
  if (status === 'pending' || !data || !id) return <LoadingScreen />;

  return (
    <div className={styles.artistPage}>
      {data && <ArtistHeader />}
      <GradientBackground color={data.color}>
        <div className={styles.playerHeader}>
          <PlayButton />

          {id !== userId && (
            <TransparentButton
              text={isFollowed(id, followings) ? 'Unfollow' : 'Follow'}
              onClick={() =>
                isFollowed(id, followings) ? handleUnfollow() : handleFollow()
              }
            ></TransparentButton>
          )}

          {id === userId && data.role === 'artist' && <UploadSongDialog />}

          {/*<HeaderActions />*/}
        </div>

        <div className="p-5 pt-0">
          <ArtistTable />
        </div>
      </GradientBackground>
    </div>
  );
};

export default Artist;

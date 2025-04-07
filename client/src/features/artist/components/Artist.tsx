import ArtistTable from './ArtistTable.tsx';
import ArtistHeader from './ArtistHeader.tsx';
import GradientBackground from '../../../ui/GradientBackground/GradientBackground.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { useEffect } from 'react';
import { getArtist } from '../artistThunks.ts';
import LoadingScreen from '../../../ui/statusScreens/LoadingScreen.tsx';
import styles from '../../../ui/PlayHeader/PlayHeader.module.scss';
import PlayButton from '../../../ui/PlayHeader/PlayButton.tsx';
import TransparentButton from '../../../ui/Button/TransparentButton.tsx';
import { followUser, unfollowUser } from '../../user/userThunks.ts';
import UploadSongDialog from './forms/uploadSong/UploadSongDialog.tsx';
import NotFound from '../../../ui/statusScreens/NotFound.tsx';
import ServerError from '../../../ui/statusScreens/ServerError.tsx';

const isFollowed = (id: string, followings: string[]) => {
  return followings.includes(id);
};

const Artist = () => {
  const { id } = useParams<{ id: string }>();
  const { status, statusCode, error } = useAppSelector(
    (state) => state.artist.api.getArtist,
  );
  const data = useAppSelector((state) => state.artist.data);
  const userData = useAppSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getArtist(id));
  }, [id]);

  const handleFollow = () => {
    if (id && data) {
      dispatch(
        followUser({
          id,
          type: 'artist',
          artistData: {
            id: data.id,
            name: data.name,
            img: data.img.url,
            createdAt: data.createdAt,
          },
        }),
      );
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
  if (status === 'pending' || !data || !id || !userData)
    return <LoadingScreen />;

  const { followings, id: userId } = userData;

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
        </div>

        <ArtistTable />
      </GradientBackground>
    </div>
  );
};

export default Artist;

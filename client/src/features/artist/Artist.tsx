import ArtistTable from './ArtistTable.tsx';
import ArtistHeader from './ArtistHeader.tsx';
import GradientBackground from '../../components/GradientBackground/GradientBackground.tsx';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { getArtist } from './artistThunks.ts';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen.tsx';
import styles from '../../components/PlayHeader/PlayHeader.module.scss';
import PlayButton from '../../components/PlayHeader/PlayButton.tsx';
import TransparentButton from '../../components/PlayHeader/TransparentButton.tsx';
import HeaderActions from '../../components/PlayHeader/HeaderActions.tsx';
import { followUser, unfollowUser } from '../auth/userThunks.ts';
import UploadSongDialog from './UploadSongDialog.tsx';

const isFollowed = (id: string, followings: string[]) => {
  return followings.includes(id);
};

const Artist = () => {
  const { id } = useParams<{ id: string }>();
  const data = useAppSelector((state) => state.artist.data);
  const { followings, id: userId } = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getArtist(id));
  }, [id]);

  const handleFollow = () => {
    if (id) {
      dispatch(followUser(id));
    }
  };

  const handleUnfollow = () => {
    if (id) {
      dispatch(unfollowUser(id));
    }
  };

  if (!id || !data) return <LoadingScreen />;

  return (
    <>
      <ArtistHeader />
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
    </>
  );
};

export default Artist;

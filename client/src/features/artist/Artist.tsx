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
import FollowButton from '../../components/PlayHeader/FollowButton.tsx';
import HeaderActions from '../../components/PlayHeader/HeaderActions.tsx';
import { followUser, unfollowUser } from '../auth/userThunks.ts';

const isFollowed = (id: string, followings: string[]) => {
  return followings.includes(id);
};

const Artist = () => {
  const { id } = useParams();
  const data = useAppSelector((state) => state.artist.data);
  const { followings } = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getArtist(id));
  }, [id]);

  const handleFollow = () => {
    dispatch(followUser(id));
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(id));
  };

  if (!data) return <LoadingScreen />;

  return (
    <>
      <ArtistHeader />
      <GradientBackground color={data.color}>
        <div className={styles.playerHeader}>
          <PlayButton />
          <FollowButton
            text={isFollowed(id, followings) ? 'Unfollow' : 'Follow'}
            onClick={() =>
              isFollowed(id, followings) ? handleUnfollow() : handleFollow()
            }
          ></FollowButton>
          <HeaderActions />
        </div>

        <div className="p-5 pt-0">
          <ArtistTable />
        </div>
      </GradientBackground>
    </>
  );
};

export default Artist;

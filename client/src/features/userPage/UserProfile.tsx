import GradientBackground from '../../components/GradientBackground/GradientBackground.tsx';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen.tsx';
import styles from '../../components/PlayHeader/PlayHeader.module.scss';
import TransparentButton from '../../components/PlayHeader/TransparentButton.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { followUser, unfollowUser } from '../auth/userThunks.ts';
import ImageHeader from '../../components/ImageHeader/ImageHeader.tsx';
import useFetchUser from './useFetchUser.ts';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getArtist } from '../artist/artistThunks.ts';
import { getUser } from './userPageThunks.ts';

const isFollowed = (id: string, followings: string[]) => {
  return followings.includes(id);
};

const generateRandomColor = () =>
  `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}4d`;

// TODO: - Update followers count when follow button is clicked
//       - Show user colors on user page

const UserProfile = () => {
  const { id } = useParams();
  const data = useAppSelector((state) => state.userPage?.data);
  const { followings, id: userId } = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getUser({ id }));
  }, [id]);

  if (!data) return <LoadingScreen />;

  const statistics = [
    { name: 'Followers', value: data.followersCount },
    { name: 'Following', value: data.followingsCount },
  ];

  return (
    <>
      <ImageHeader data={{ ...data, statistics }} />
      <GradientBackground color={data.color}>
        {/*<div className={styles.playerHeader}>*/}
        {/*  <TransparentButton*/}
        {/*    text={isFollowed(user.id, followings) ? 'Unfollow' : 'Follow'}*/}
        {/*    onClick={handleFollowToggle}*/}
        {/*  />*/}
        {/*</div>*/}

        <div className="p-5 pt-0">
          {/*<CardsList*/}
          {/*  title="Public Playlists"*/}
          {/*  shrink={true}*/}
          {/*  items={items.slice(0, 6)}*/}
          {/*/>*/}
          {/*<CardsList*/}
          {/*  title="Followers"*/}
          {/*  shrink={true}*/}
          {/*  items={items.slice(6, 12)}*/}
          {/*/>*/}
          {/*<CardsList*/}
          {/*  title="Followings"*/}
          {/*  shrink={true}*/}
          {/*  items={items.slice(12, 18)}*/}
          {/*/>*/}
        </div>
      </GradientBackground>
    </>
  );
};

export default UserProfile;

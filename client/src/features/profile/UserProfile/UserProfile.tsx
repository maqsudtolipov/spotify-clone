import GradientBackground from '../../../components/GradientBackground/GradientBackground.tsx';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen.tsx';
import styles from '../../../components/PlayHeader/PlayHeader.module.scss';
import FollowButton from '../../../components/PlayHeader/FollowButton.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { followUser, unfollowUser } from '../../auth/userThunks.ts';
import ImageHeader from '../../../components/ImageHeader/ImageHeader.tsx';
import useFetchUser from './useFetchUser.ts';

const isFollowed = (id: string, followings: string[]) => {
  return followings.includes(id);
};

const generateRandomColor = () =>
  `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}4d`;

const UserProfile = () => {
  const user = useFetchUser();
  const { followings } = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const color = generateRandomColor();

  const handleFollowToggle = () => {
    if (user) {
      isFollowed(user.id, followings)
        ? dispatch(unfollowUser(user.id))
        : dispatch(followUser(user.id));
    }
  };

  if (!user) return <LoadingScreen />;

  return (
    <>
      <ImageHeader data={user} />
      <GradientBackground color={color}>
        <div className={styles.playerHeader}>
          <FollowButton
            text={isFollowed(user.id, followings) ? 'Unfollow' : 'Follow'}
            onClick={handleFollowToggle}
          />
        </div>

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

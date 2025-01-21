import GradientBackground from '../../components/GradientBackground/GradientBackground.tsx';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { followUser, unfollowUser } from '../auth/userThunks.ts';
import ImageHeader from '../../components/ImageHeader/ImageHeader.tsx';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from './userPageThunks.ts';

const isFollowed = (id: string, followings: string[]) => {
  return followings.includes(id);
};

const generateRandomColor = () =>
  `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}4d`;

// TODO: - Update followers count when follow button is clicked
//       - Show user colors on user page

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const data = useAppSelector((state) => state.userPage?.data);
  const { followings, id: userId } = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getUser({ id }));
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

  if (!data) return <LoadingScreen />;

  const statistics = [
    { name: 'Followers', value: data.followersCount },
    { name: 'Following', value: data.followingsCount },
  ];

  return (
    <>
      <ImageHeader data={{ ...data, type: 'userPage', statistics }} />
      <GradientBackground color={data.color}>Body here</GradientBackground>
    </>
  );
};

export default UserProfile;

// <GradientBackground color={data.color}>
//   <div className={styles.playerHeader}>
//     {id !== userId && (
//       <TransparentButton
//         text={isFollowed(id, followings) ? 'Unfollow' : 'Follow'}
//         onClick={() =>
//           isFollowed(id, followings) ? handleUnfollow() : handleFollow()
//         }
//       ></TransparentButton>
//     )}
//
//     {/*<HeaderActions />*/}
//   </div>
//
//   <div className="p-5 pt-0">
//     {/*<CardsList*/}
//     {/*  title="Public Playlists"*/}
//     {/*  shrink={true}*/}
//     {/*  items={items.slice(0, 6)}*/}
//     {/*/>*/}
//     {/*<CardsList*/}
//     {/*  title="Followers"*/}
//     {/*  shrink={true}*/}
//     {/*  items={items.slice(6, 12)}*/}
//     {/*/>*/}
//     {/*<CardsList*/}
//     {/*  title="Followings"*/}
//     {/*  shrink={true}*/}
//     {/*  items={items.slice(12, 18)}*/}
//     {/*/>*/}
//   </div>
// </GradientBackground>

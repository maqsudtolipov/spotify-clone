import GradientBackground from '../../../ui/GradientBackground/GradientBackground.tsx';
import LoadingScreen from '../../../ui/StatusScreens/LoadingScreen.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { followUser, unfollowUser } from '../../auth/userThunks.ts';
import ImageHeader from '../../../ui/ImageHeader/ImageHeader.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from '../userPageThunks.ts';
import styles from '../../../components/PlayHeader/PlayHeader.module.scss';
import TransparentButton from '../../../components/PlayHeader/TransparentButton.tsx';
import NotFound from '../../../ui/StatusScreens/NotFound.tsx';
import ServerError from '../../../ui/StatusScreens/ServerError.tsx';

const isFollowed = (id: string, followings: string[]) => {
  return followings.includes(id);
};

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { status, statusCode, error } = useAppSelector(
    (state) => state.userPage.api.getUser
  );
  const data = useAppSelector((state) => state.userPage?.data);
  const { followings, id: userId } = useAppSelector(
    (state) => state.user?.data
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getUser({ id }));
  }, [id]);

  if (status === 'rejected') {
    if (statusCode === 404) return <NotFound message={error} />;
    if (statusCode === 500) return <ServerError />;
    else navigate('/');
  }
  if (status === 'pending' || !data || !id) return <LoadingScreen />;

  const statistics = [
    { name: 'Followers', value: data.followersCount },
    { name: 'Following', value: data.followingsCount }
  ];

  return (
    <>
      <ImageHeader data={{ ...data, statistics }} type="user" />
      <GradientBackground color={data.color}>
        {' '}
        <div className={styles.playerHeader}>
          {id !== userId && (
            <TransparentButton
              text={isFollowed(id, followings) ? 'Unfollow' : 'Follow'}
              onClick={() =>
                isFollowed(id, followings)
                  ? dispatch(unfollowUser({ id, type: 'user' }))
                  : dispatch(followUser({ id, type: 'user' }))
              }
            ></TransparentButton>
          )}
        </div>
      </GradientBackground>
    </>
  );
};

export default UserProfile;

// <GradientBackground color={data.color}>
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

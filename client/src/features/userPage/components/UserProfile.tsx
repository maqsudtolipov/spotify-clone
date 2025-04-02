import GradientBackground from '../../../ui/GradientBackground/GradientBackground.tsx';
import LoadingScreen from '../../../ui/statusScreens/LoadingScreen.tsx';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from '../userPageThunks.ts';
import NotFound from '../../../ui/statusScreens/NotFound.tsx';
import ServerError from '../../../ui/statusScreens/ServerError.tsx';
import UserHeader from './header/UserHeader.tsx';
import useDominantColor from '../../../hooks/useDominantColor.ts';
import styles from '../../../ui/PlayHeader/PlayHeader.module.scss';
import TransparentButton from '../../../ui/Button/TransparentButton.tsx';
import { followUser, unfollowUser } from '../../user/userThunks.ts';
import UserActions from './actionsDropdown/UserActions.tsx';

const isFollowed = (id: string, followings: string[]) => {
  return followings.includes(id);
};

const UserProfile = () => {
  const { status, statusCode, error } = useAppSelector(
    (state) => state.userPage.api.getUser,
  );
  const data = useAppSelector((state) => state.userPage?.data);
  const user = useAppSelector((state) => state.user?.data);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { bgColor, textColor } = useDominantColor(data?.img?.url);

  useEffect(() => {
    if (id) dispatch(getUser({ id }));
  }, [id]);

  if (!user) return null;

  const { followings, id: userId } = user;

  if (status === 'rejected') {
    if (statusCode === 404) return <NotFound message={error} />;
    if (statusCode === 500) return <ServerError />;
    else navigate('/');
  }
  if (status === 'pending' || !data || !id) return <LoadingScreen />;

  const toggleFollow = () =>
    isFollowed(id, followings)
      ? dispatch(unfollowUser({ id, type: 'user' }))
      : dispatch(followUser({ id, type: 'user' }));

  return (
    <>
      <UserHeader data={data} bgColor={bgColor} textColor={textColor} />
      <GradientBackground color={bgColor}>
        <div className={styles.playerHeader}>
          {id !== userId && (
            <TransparentButton
              text={isFollowed(id, followings) ? 'Unfollow' : 'Follow'}
              onClick={() => toggleFollow()}
            ></TransparentButton>
          )}
          <UserActions />
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

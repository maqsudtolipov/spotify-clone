import { useParams } from 'react-router-dom';
import GradientBackground from '../../../components/GradientBackground/GradientBackground.tsx';
import { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen.tsx';
import styles from '../../../components/PlayHeader/PlayHeader.module.scss';
import FollowButton from '../../../components/PlayHeader/FollowButton.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { followUser } from '../../auth/userThunks.ts';

interface User {
  type: 'profile';
  id: string;
  name: string;
  img: string;
  followers: string[];
  followings: string[];
}

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  // const { followings } = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const color =
    '#' +
    ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0') +
    '4d';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`users/${id}`);
        res.data.user.type = 'profile';
        setUser(res.data.user);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);
  //
  const isFollowed = (id: string, followings: string[]) => {
    return followings.includes(id);
  };
  //
  // const handleFollowUser = (id: string) => {
  //   console.log('request sent');
  // };

  return user?.name ? (
    <>
      {/*<ImageHeader data={user} />*/}
      <GradientBackground color={color}>
        <div className={styles.playerHeader}>
          {/*{isFollowed(user.id) ? (*/}
          {/*  <FollowButton*/}
          {/*    text={'Following'}*/}
          {/*    onClick={(e) => {*/}
          {/*      e.preventDefault();*/}
          {/*      handleFollowUser(user.id);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <FollowButton*/}
          {/*    text={'Follow'}*/}
          {/*    onClick={(e) => {*/}
          {/*      e.preventDefault();*/}
          {/*      handleFollowUser(user.id);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*)}*/}
          {/*{isFollowed(user.id, followings) ? 'yes' : 'no'}*/}

          <FollowButton
            text={'Follow'}
            onClick={(e) => {
              e.preventDefault();
              // handleFollowUser(user.id);
              dispatch(followUser(user.id));
            }}
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
  ) : (
    <LoadingScreen />
  );
};

export default UserProfile;

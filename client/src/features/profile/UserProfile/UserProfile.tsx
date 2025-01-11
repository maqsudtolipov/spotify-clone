import { useParams } from 'react-router-dom';
import ImageHeader from '../../../components/ImageHeader/ImageHeader.tsx';
import PlayHeader from '../../../components/PlayHeader/PlayHeader.tsx';
import GradientBackground from '../../../components/GradientBackground/GradientBackground.tsx';
import { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen.tsx';

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

  return user?.name ? (
    <>
      <ImageHeader data={user} />
      <GradientBackground color={color}>
        <PlayHeader />

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

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../api/axios';

interface User {
  type: 'userPage';
  id: string;
  name: string;
  img: string;
  followers: string[];
  followersCount: number;
  followings: string[];
  followingsCount: number;
}

const useFetchUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`users/${id}`);
        res.data.user.type = 'userPage';
        res.data.user.statistics = [
          { name: 'Followers', value: res.data.user.followersCount },
          { name: 'Following', value: res.data.user.followingsCount },
        ];
        setUser(res.data.user);
      } catch (e) {
        console.error('Error fetching user:', e);
      }
    };

    fetchUser();
  }, [id]);

  return { user, setUser };
};

export default useFetchUser;

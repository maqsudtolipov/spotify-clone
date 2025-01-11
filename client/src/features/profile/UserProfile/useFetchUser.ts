import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../api/axios';

interface User {
  type: 'profile';
  id: string;
  name: string;
  img: string;
  followers: string[];
  followings: string[];
}

const useFetchUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`users/${id}`);
        res.data.user.type = 'profile';
        setUser(res.data.user);
      } catch (e) {
        console.error('Error fetching user:', e);
      }
    };

    fetchUser();
  }, [id]);

  return user;
};

export default useFetchUser;

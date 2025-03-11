import { useEffect } from 'react';
import CardsList from '../../../../ui/CardsList/CardsList.tsx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { searchUsers } from '../../searchThunks.ts';

interface CardItem {
  img: string;
  name: string;
  description: string;
  type: string;
}

const SearchProfiles = () => {
  const { tab, query } = useAppSelector((state) => state.search);
  const { users, lastQuery } = useAppSelector((state) => state.search.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Don't fetch again, if query hadn't changed
    if (query === lastQuery) return;
    dispatch(searchUsers(query));
  }, [tab, query]);

  return <CardsList items={users} />;
};

export default SearchProfiles;

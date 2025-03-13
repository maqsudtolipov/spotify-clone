import CardsList from '../../../../ui/CardsList/CardsList.tsx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { searchPlaylists } from '../../searchThunks.ts';
import { useEffect } from 'react';

const SearchPlaylists = () => {
  const playlists = useAppSelector((state) => state.search.playlists.playlists);
  const playlistsLastQuery = useAppSelector(
    (state) => state.search.playlists.lastQuery,
  );
  const query = useAppSelector((state) => state.search.query);
  const tab = useAppSelector((state) => state.search.tab);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query === playlistsLastQuery) return; // If query not changed, don't fetching again
    dispatch(searchPlaylists(query));
  }, [tab, query]);

  return <CardsList items={playlists} type={'playlist'} />;
};

export default SearchPlaylists;

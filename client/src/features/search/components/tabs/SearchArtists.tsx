import { useEffect } from 'react';
import CardsList from '../../../../ui/CardsList/CardsList.tsx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { searchArtists } from '../../searchThunks.ts';

const SearchArtists = () => {
  const { tab, query } = useAppSelector((state) => state.search);
  const { artists, lastQuery } = useAppSelector(
    (state) => state.search.artists,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Don't fetch again, if query hadn't changed
    if (query === lastQuery) return;
    dispatch(searchArtists(query));
  }, [tab, query]);

  return <CardsList items={artists} />;
};

export default SearchArtists;

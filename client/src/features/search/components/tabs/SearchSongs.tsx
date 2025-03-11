import { useEffect } from 'react';
import SortedTable from '../../../../ui/Table/custom/SortedTable/SortedTable.tsx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { searchSongs } from '../../searchThunks.ts';

const SearchSongs = () => {
  const songs = useAppSelector((state) => state.search.songs.songs);
  const songsQuery = useAppSelector((state) => state.search.songs.lastQuery);
  const query = useAppSelector((state) => state.search.query);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchSongs(query));
  }, [query]);

  return <>{songs && <SortedTable items={songs} />}</>;
};

export default SearchSongs;

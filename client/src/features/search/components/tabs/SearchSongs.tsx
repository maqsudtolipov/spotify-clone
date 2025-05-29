import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { searchSongs } from '../../searchThunks.ts';
import useInfiniteScroll from '../../hooks/useInfiniteScroll.ts';
import SongsTable from '../tables/SongsTable.tsx';

const SearchSongs = () => {
  const {
    items: songs,
    lastQuery: songsLastQuery,
    pagination: { currentPage, totalPages },
    apiStatus,
  } = useAppSelector((state) => state.search.songs);
  const { query } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query === songsLastQuery) return; // If query not changed, don't fetching again
    dispatch(searchSongs({ query }));
  }, [query, songsLastQuery, dispatch]);

  const helperElRef = useInfiniteScroll(
    dispatch,
    query,
    currentPage,
    totalPages,
    songs,
    apiStatus,
    searchSongs,
  );

  return (
    <>
      {songs && (
        <div>
          <SongsTable songs={songs} query={query} />
          {/*<SortedTable items={songs} keyIdentifier={query} />*/}
          <div ref={helperElRef} className="h-px invisible">
            Scroll helper
          </div>
        </div>
      )}
    </>
  );
};

export default SearchSongs;

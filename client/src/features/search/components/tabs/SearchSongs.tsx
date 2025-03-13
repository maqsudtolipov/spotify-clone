import { useEffect } from 'react';
import SortedTable from '../../../../ui/Table/custom/SortedTable/SortedTable.tsx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { searchSongs } from '../../searchThunks.ts';
import useInfiniteScroll from '../../hooks/useInfiniteScroll.ts';

const SearchSongs = () => {
  const {
    items: songs,
    lastQuery: songsLastQuery,
    pagination: { currentPage, totalPages },
  } = useAppSelector((state) => state.search.songs);
  const { query, tab } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query === songsLastQuery) return; // If query not changed, don't fetching again
    dispatch(searchSongs({ query }));
  }, [tab, query, songsLastQuery, dispatch]);

  const helperElRef = useInfiniteScroll(
    dispatch,
    query,
    currentPage,
    totalPages,
    songs,
  );

  return (
    <>
      {songs && (
        <div>
          <SortedTable items={songs} />
          <div ref={helperElRef}>I am scroll helper</div>
        </div>
      )}
    </>
  );
};

export default SearchSongs;

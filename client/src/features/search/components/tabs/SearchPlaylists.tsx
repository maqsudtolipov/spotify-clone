import { useEffect } from 'react';
import CardsList from '../../../../ui/CardsList/CardsList.tsx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { searchPlaylists } from '../../searchThunks.ts';
import useInfiniteScroll from '../../hooks/useInfiniteScroll.ts';

const SearchPlaylists = () => {
  const { tab, query } = useAppSelector((state) => state.search);
  const {
    items,
    lastQuery,
    pagination: { currentPage, totalPages },
    apiStatus,
  } = useAppSelector((state) => state.search.playlists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query !== lastQuery) {
      dispatch(searchPlaylists({ query }));
    }
  }, [tab, query, dispatch]);

  const helperElRef = useInfiniteScroll(
    dispatch,
    query,
    currentPage,
    totalPages,
    items,
    apiStatus,
    searchPlaylists,
  );

  return (
    <div>
      <CardsList items={items} type="playlist" keyIdentifier={query} />
      <div ref={helperElRef} className="h-px invisible">
        Scroll helper
      </div>
    </div>
  );
};

export default SearchPlaylists;

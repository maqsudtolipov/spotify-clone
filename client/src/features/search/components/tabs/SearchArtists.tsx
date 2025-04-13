import { useEffect } from 'react';
import CardsList from '../../../../ui/CardsList/CardsList.tsx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { searchArtists } from '../../searchThunks.ts';
import useInfiniteScroll from '../../hooks/useInfiniteScroll.ts';

const SearchArtists = () => {
  const { tab, query } = useAppSelector((state) => state.search);
  const {
    items,
    lastQuery,
    pagination: { currentPage, totalPages },
    apiStatus,
  } = useAppSelector((state) => state.search.artists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query !== lastQuery) {
      dispatch(searchArtists({ query }));
    }
  }, [tab, query, dispatch]);

  const helperElRef = useInfiniteScroll(
    dispatch,
    query,
    currentPage,
    totalPages,
    items,
    apiStatus,
    searchArtists,
  );

  return (
    <div>
      <CardsList items={items} type={'artist'} />;
      <div ref={helperElRef} className="h-px invisible">
        Scroll helper
      </div>
    </div>
  );
};

export default SearchArtists;

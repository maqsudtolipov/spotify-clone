import { useEffect } from 'react';
import CardsList from '../../../../ui/CardsList/CardsList.tsx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { searchUsers } from '../../searchThunks.ts';
import useInfiniteScroll from '../../hooks/useInfiniteScroll.ts';

const SearchProfiles = () => {
  const { tab, query } = useAppSelector((state) => state.search);
  const {
    items,
    lastQuery,
    pagination: { currentPage, totalPages },
    apiStatus,
  } = useAppSelector((state) => state.search.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query !== lastQuery) {
      dispatch(searchUsers({ query }));
    }
  }, [tab, query]);

  const helperElRef = useInfiniteScroll(
    dispatch,
    query,
    currentPage,
    totalPages,
    items,
    apiStatus,
    searchUsers,
  );

  return (
    <div>
      <CardsList items={items} type={'user'} />
      <div ref={helperElRef} className="h-px invisible">
        Scroll helper
      </div>
    </div>
  );
};

export default SearchProfiles;

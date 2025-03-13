import { useEffect, useRef } from 'react';
import SortedTable from '../../../../ui/Table/custom/SortedTable/SortedTable.tsx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { searchSongs } from '../../searchThunks.ts';

const SearchSongs = () => {
  const songs = useAppSelector((state) => state.search.songs.songs);
  const songsLastQuery = useAppSelector(
    (state) => state.search.songs.lastQuery,
  );
  const query = useAppSelector((state) => state.search.query);
  const tab = useAppSelector((state) => state.search.tab);
  const dispatch = useAppDispatch();

  const helperElRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (query === songsLastQuery) return; // If query not changed, don't fetching again
    dispatch(searchSongs({ query }));
  }, [tab, query]);

  useEffect(() => {
    if (!songs.length || !helperElRef.current) return;

    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver((el) => {
      if (el[0].isIntersecting) {
        console.log('Im here boss');
        dispatch(searchSongs({ query, isPageRequest: true }));
      } else if (!el[0].isIntersecting) {
        console.log('Where am I?');
      }
    });

    if (helperElRef.current) {
      observer.observe(helperElRef.current);
      observerRef.current = observer;
    }

    return () => observer.disconnect();
  }, [songs]);

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

import { RefObject, useEffect, useRef } from 'react';
import { searchSongs } from '../searchThunks.ts';

const useInfiniteScroll = (
  helperElRef: RefObject<HTMLDivElement>,
  dispatch: Function,
  query: string,
  currentPage: number,
  totalPages: number,
  songs: any[],
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!songs.length || !helperElRef.current) return;

    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver((el) => {
      if (el[0].isIntersecting) {
        console.log('Im here boss');

        if (totalPages > currentPage) {
          dispatch(searchSongs({ query, page: currentPage + 1 }));
        }
      } else if (!el[0].isIntersecting) {
        console.log('Where am I?');
      }
    });

    if (helperElRef.current) {
      observer.observe(helperElRef.current);
      observerRef.current = observer;
    }

    return () => observer.disconnect();
  }, [songs, currentPage, totalPages, query, dispatch, helperElRef]);
};

export default useInfiniteScroll;

import { useEffect, useRef } from 'react';

const useInfiniteScroll = (
  dispatch: Function,
  query: string,
  currentPage: number,
  totalPages: number,
  items: any[],
  apiStatus: string,
  thunk: Function,
) => {
  const helperElRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!items.length || !helperElRef.current || apiStatus === 'loading')
      return;

    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver((el) => {
      if (el[0].isIntersecting && totalPages > currentPage) {
        dispatch(thunk({ query, page: currentPage + 1 }));
      }
    });

    observer.observe(helperElRef.current);
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [items, currentPage, totalPages, query, dispatch, helperElRef]);

  return helperElRef;
};

export default useInfiniteScroll;

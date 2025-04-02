import { Ref, useEffect, useRef } from 'react';

/**
 * NOTE: outside close does not work when used with portals
 * @param handler
 * @param ignoreRef
 * @param ignore
 */
const useOutsideClick = (
  handler: () => void,
  ignore?: boolean,
  ignoreRef?: Ref<HTMLDivElement | HTMLUListElement | null>,
) => {
  if (ignore) return { ref: null };

  const ref = useRef<HTMLDivElement | HTMLUListElement | null>(null);
  const exceptionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ignoreRef &&
        ignoreRef.current &&
        ignoreRef.current.contains(event.target as Node)
      )
        return;

      if (
        exceptionRef &&
        exceptionRef.current &&
        exceptionRef.current.contains(event.target as Node)
      ) {
        return;
      }

      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handler]);

  return { ref, exceptionRef };
};

export default useOutsideClick;

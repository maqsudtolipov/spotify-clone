import { useEffect, useRef } from 'react';

const useOutsideClick = (handler: () => void) => {
  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handler]);

  return ref;
};

export default useOutsideClick;
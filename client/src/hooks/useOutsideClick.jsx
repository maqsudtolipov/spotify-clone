import { useEffect, useRef } from 'react';

const useOutsideClick = (handler) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current?.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, handler]);

  return ref;
};

export default useOutsideClick;

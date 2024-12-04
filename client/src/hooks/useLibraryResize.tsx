import { useEffect, useRef } from 'react';

export const useLibraryResize = () => {
  const resizeEl = useRef<HTMLElement>();
  const libraryEl = useRef<HTMLElement>();

  useEffect(() => {
    if (!libraryEl.current || !resizeEl.current) return;
    let drag = false;

    let moveX =
      libraryEl.current.getBoundingClientRect().width +
      resizeEl.current.getBoundingClientRect().width / 2;

    resizeEl.current.addEventListener('mousedown', function (e) {
      drag = true;
      moveX = e.x;
    });

    document.addEventListener('mousemove', function (e) {
      moveX = e.x;
      if (drag) {
        libraryEl.current.style.width =
          -10.5 +
          moveX -
          resizeEl.current.getBoundingClientRect().width / 2 +
          'px';
        e.preventDefault();
      }
    });

    document.addEventListener('mouseup', function (e) {
      drag = false;
    });
  }, []);

  return { libraryEl, resizeEl };
};

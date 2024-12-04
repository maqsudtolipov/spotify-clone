import { useEffect, useRef } from 'react';

export const useLibraryResize = () => {
  const resizeEl = useRef<HTMLElement>();
  const libraryEl = useRef<HTMLElement>();

  useEffect(() => {
    if (libraryEl.current && resizeEl.current) {
      let drag = false;

      let moveX =
        libraryEl.current.getBoundingClientRect().width +
        resizeEl.current.getBoundingClientRect().width / 2;

      const handleMouseDown = (e) => {
        drag = true;
        moveX = e.x;
      };

      const handleMouseMove = (e) => {
        moveX = e.x;
        if (libraryEl.current) {
          const newWidth =
            -10.5 + moveX - resizeEl.current.getBoundingClientRect().width / 2;

          if (drag && newWidth <= 400) {
            libraryEl.current.style.width = newWidth + 'px';
            e.preventDefault();
          }
        }
      };

      const handleMouseUp = (e) => {
        drag = false;
      };

      resizeEl.current.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        resizeEl.current.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, []);

  return { libraryEl, resizeEl };
};

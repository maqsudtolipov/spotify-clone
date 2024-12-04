import { useEffect, useRef, useState } from 'react';

export const useLibraryResize = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [drag, setDrag] = useState<boolean>(false);
  const resizeEl = useRef<HTMLElement>();
  const libraryEl = useRef<HTMLElement>();

  useEffect(() => {
    if (libraryEl.current && resizeEl.current) {
      let moveX =
        libraryEl.current.getBoundingClientRect().width +
        resizeEl.current.getBoundingClientRect().width / 2;

      const handleMouseDown = (e) => {
        setDrag(true);
        moveX = e.x;
      };

      const handleMouseMove = (e) => {
        if (libraryEl.current) {
          moveX = e.x;

          const newWidth =
            -10.5 + moveX - resizeEl.current.getBoundingClientRect().width / 2;

          // console.log(e.clientX, newWidth);

          if (drag && newWidth >= 280 && newWidth <= 400) {
            libraryEl.current.style.width = newWidth + 'px';
            e.preventDefault();
          }

          if (!isCollapsed && newWidth === 230) {
            setIsCollapsed(true);
            setDrag(false);
          }

          if (isCollapsed && newWidth === 120) {
            setIsCollapsed(false);
            setDrag(false);
          }
        }
      };

      const handleMouseUp = (e) => {
        setDrag(false);
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
  }, [drag]);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return { libraryEl, resizeEl, isCollapsed, handleCollapse };
};

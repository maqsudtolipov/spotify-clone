import { useEffect, useRef, useState } from 'react';

export const useLibraryResize = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [drag, setDrag] = useState(false);
  const resizeRef = useRef<HTMLElement>();
  const libraryRef = useRef<HTMLElement>();

  useEffect(() => {
    const resizeEl = resizeRef.current;
    const libraryEl = libraryRef.current;

    if (resizeEl && libraryEl) {
      const handleMouseDown = () => {
        setDrag(true);
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (drag) {
          const newWidth =
            e.clientX - resizeEl.getBoundingClientRect().width / 2 - 10.5;

          if (drag && newWidth >= 280 && newWidth <= 400) {
            libraryEl.style.width = `${newWidth}px`;
            e.preventDefault();
          }

          // If newWidth larger than 215 open library, else close
          if (!isCollapsed && newWidth <= 215) {
            setIsCollapsed(true);
          } else if (isCollapsed && newWidth > 215) {
            setIsCollapsed(false);
          }
        }
      };

      const handleMouseUp = () => {
        setDrag(false);
      };

      resizeEl.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        resizeEl.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [drag, isCollapsed, libraryRef, resizeRef]);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return {
    drag,
    libraryEl: libraryRef,
    resizeEl: resizeRef,
    isCollapsed,
    handleCollapse,
  };
};

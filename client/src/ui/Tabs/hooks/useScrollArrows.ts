import { useEffect, useRef, useState } from 'react';

const useScrollArrows = () => {
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateArrowVisibility = () => {
      const differenceRight =
        el.scrollWidth - el.getBoundingClientRect().width - el.scrollLeft;
      const differenceLeft = el.scrollLeft;

      if (differenceRight >= 10) {
        setShowRightArrow(true);
      } else {
        setShowRightArrow(false);
      }

      if (differenceLeft >= 10) {
        setShowLeftArrow(true);
      } else {
        setShowLeftArrow(false);
      }
    };

    el.addEventListener('scroll', updateArrowVisibility);
    updateArrowVisibility();

    return () => {
      el.removeEventListener('scroll', updateArrowVisibility);
    };
  }, []);

  const handleScrollRight = () => {
    if (!ref.current) return;
    ref.current.scrollLeft =
      ref.current.scrollWidth - ref.current.getBoundingClientRect().width;
  };

  const handleScrollLeft = () => {
    if (!ref.current) return;
    ref.current.scrollLeft = 0;
  };

  return {
    ref,
    showLeftArrow,
    showRightArrow,
    handleScrollRight,
    handleScrollLeft,
  };
};

export default useScrollArrows;

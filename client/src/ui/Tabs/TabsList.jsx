import styles from './Tabs.module.scss';
import ArrowButton from './ArrowButton.jsx';
import { useEffect, useRef, useState } from 'react';

const TabsList = ({ children, ...rest }) => {
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

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
    ref.current.scrollLeft =
      ref.current.scrollWidth - ref.current.getBoundingClientRect().width;
  };

  const handleScrollLeft = () => {
    ref.current.scrollLeft = 0;
  };

  return (
    <div className="relative" {...rest}>
      <div className={styles.tabsList} ref={ref}>
        {children}
      </div>

      {showLeftArrow && (
        <ArrowButton position="left" onClick={handleScrollLeft} />
      )}
      {showRightArrow && (
        <ArrowButton position="right" onClick={handleScrollRight} />
      )}
    </div>
  );
};

export default TabsList;
